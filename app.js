const express = require("express");
const bodyParser = require("body-parser");
const valida = require(__dirname+"/public/script/validater.js")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req, res){
  res.sendFile(__dirname+"/index.html")
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

app.get('/home',function(req,res){
  res.render('home');
});


app.get('/whats-new',function(req,res){

  const pn = req.path.split('/');
  const kn = pn[1].split('-');
  let name = kn[0]+" "+kn[1];
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
app.get("/Curve",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});
app.get("/campaign",function(req,res){
  let name = req.path.split("/");
  res.render('cview',{pName:name[1].toUpperCase()});
});

app.get("/signup",function(req,res){
  res.render("sigup");
});

app.post('/mail',function(req,res){
  let mail = req.body.mail;
  console.log(mail);
  res.redirect('/home');
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Listening at port 3000")
});
