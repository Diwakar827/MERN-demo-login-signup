 const express=require('express');
 const app=express();
 const hbs=require('hbs');
  const mongoose =require('mongoose');
 const bcrypt=require('bcrypt');
 const session=require('express-session');
  const User=require("../models/user");

  app.set("view engine","hbs");
 // For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));  // for req.body to show response bydefault undefined
app.use(session({secret:'notagoodsecret'}));
app.use(express.static(__dirname + '/public'));  // for addding css in handlebars

//databse connection part
 mongoose.connect("mongodb://localhost:27017/myexperiment",{ 
    useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("connection with mongo succesfull");
    })
     .catch(()=>{ 
        console.log("no connection");


     })









 
 app.get("/",(req,res)=>{

      res.render("home");

 })


 
 app.get("/signup",(req,res)=>{

    res.render("signup");
 })

 app.get("/login",(req,res)=>{

    res.render("login");
 })
 app.get("/secret",(req,res)=>{

    if(!req.session.user_id)
    res.redirect('/login');
  
   res.render('secret');
 })
 
 // thus is for signup on post request clicking signup butoon
 app.post("/signup",async (req,res)=>{

       const {username,password}=req.body;
     const hash= await bcrypt.hash(password,12);

     // const db=new User({username,password});  we dont want to save password like this we use hash function;

     const user=new User({
        username,
        password:hash
    }); 
     await user.save();
     req.session.user_id=user._id;
 res.redirect("/");
     
 })

 //this is for login

 app.post("/login",async (req,res)=>{
     const { username,password}=req.body;
     
     const user=await User.findOne({username});
    const validpassword= await bcrypt.compare(password,user.password);
    if(validpassword)
    {
       
       req.session.user_id=user._id;
   
       res.redirect("/secret");
    }
    else{
        res.redirect('/login');
    }
   
 })
 app.post("/logout",(req,res)=>{
    req.session.user_id=null;
    req.session.destroy();
    res.redirect('/');

})

 
 app.listen(3000,()=>{

    console.log("server is running at port 3000");
 })