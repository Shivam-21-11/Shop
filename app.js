const express = require("express");
const bodyParser = require("body-parser");
const valida = require(__dirname+"/public/script/validater.js");
const mongoose = require('mongoose');
const uuid = require('uuid');
const app = express();

mongoose.connect("mongodb://localhost:27017/shopTestDB",{useNewUrlParser: true, useUnifiedTopology: true});
const userSchema = new mongoose.Schema({
  name : {
    type:String,
    required: true,
  },
  email:{
    type:String,
    required: true,
  },
  password:{
    type:String,
    required: true,
  },
  phone:{
    type:String,
    required: true,
    maxLength: 10,
    minLength:10,
  },
  address:{
    type:String,
    required: true,
  },

  city:{
    type:String,
    required: true,
  },
  country:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true,
  },
  zip:{
    type:String,
    required:true,
    maxLength:6,
    minLength:6,
  },
  custID:{
    type:String,
    required:true,
  }
});

const userModel = mongoose.model("Customer",userSchema);

// const usr = new userModel({
  // name:"shivam singh",
  // email: "shivamsingh2111@gmail.com",
  // password:"shivam2121",
  // phone:"9653037656",
  // address:"asdadwdwadwa",
  // city:"khopoli",
  // country:"india",
  // state:"MAHARASHTRA",
  // zip:"410203",
  // custID:"1ewe5we8qe8wqe5wqe1w5"
// });
// usr.save();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req, res){
  res.render('home');
});

app.get('/home',function(req,res){
  res.render('home');
});

app.post('/home',function(req,res){
  let mail = req.body.email;
  let pass = req.body.password;
    if(valida.getValid(mail,pass)){
      console.log("true");
      res.redirect('/');
    }else{
      console.log("false");
      res.redirect('/');
    }
});



app.get('/whats-new',function(req,res){

  const pn = req.path.split('/');
  const kn = pn[1].split('-');
  let name = kn[0]+" "+kn[1];
  res.render('cview',{pName:name.toUpperCase()});
});

app.get('/shop-all',function(req,res){

  const pn = req.path.split('/');
  const kn = pn[1].split('-');
  let name = kn[0]+" "+kn[1];
  res.render('cview',{pName:name.toUpperCase()});
});


app.get('/shop-younger-than-sun',function(req,res){

  let pn = req.path.split('/');

  pn = pn[1];
  pn = pn.split('-');
  let name = pn[0]+" "+pn[1]+" "+pn[2]+" "+pn[3];
  res.render('cview',{pName:name.toUpperCase()});
});



app.get("/women",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});
app.get("/dresses",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});
app.get("/classic",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});
app.get("/curve",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});
app.get("/campaign",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});
app.get("/casual",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});

app.get("/denim",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});






app.get("/signup",function(req,res){
  res.render("sigup",{ErrorMsg:""});
});

app.post("/signup",function(req,res){
  console.log(req);
  if(req.body.fname === "" ||
  req.body.lname === "" ||
  req.body.email === "" ||
  req.body.pass === "" ||
  req.body.phone === "" ||
  req.body.add1 === "" ||
  req.body.add2 === "" ||
  req.body.city === "" ||
  req.body.country === "" ||
  req.body.state === "" ||
  req.body.zipc === "" ){
    res.redirect('/signup');
  }else{
    userModel.find({email: req.body.email},function(err,docs){
      if(!docs.length){
        /////save data to mongodb
        let uniqueID = uuid.v4();
        console.log(uniqueID);
        ////////////////////////////////////////////////////////////
        function checkValid(uid){
          userModel.find({custID: uid},function(err,docs){
            if(!docs.length){
              ////////////////////put data
              const user = new userModel({
                name: req.body.fname+" "+req.body.lname,
                email: req.body.email,
                password: req.body.pass,
                phone: req.body.phone,
                address: req.body.add1+" "+req.body.add2,
                city: req.body.city,
                country :req.body.country,
                state: req.body.state,
                zip: req.body.zipc,
                custID: uid,
              });

              user.save();
              res.redirect('/login');

              console.log(uniqueID);
            }else if (err) {
              console.log(err);
            }else{
              uniqueID = uuid.v4();
              checkValid(uniqueID);
            }
          });

        }
        //////////////////////////////////////////////////////////
        checkValid(uniqueID);

      }else if (err) {
        cosole.log(err);
      }else{
          res.render("sigup",{ErrorMsg:"true"});


      }

    });





  }


});



app.get("/login",function(req,res){
  res.render('login');
});


app.post('/mail',function(req,res){
  let mail = req.body.mail;
  console.log(mail);
  res.redirect('/home');
});


app.get('/cart',(req,res)=> res.render('cart'));



app.listen(process.env.PORT || 3000,function(){
  console.log("Listening at port 3000")
});
