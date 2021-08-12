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
  res.render('cview.ejs');
});
app.listen(3000,function(){
  console.log("Listening at port 3000")
});
