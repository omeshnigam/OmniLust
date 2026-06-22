if(process.env.NODE_ENV!='production'){
require('dotenv').config()
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError");
const session=require('express-session');
const {MongoStore} = require('connect-mongo');
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const User=require("./models/user")

const userRouter=require('./routes/user')
const reviewRouter=require('./routes/reviews')
const listingRouter=require('./routes/listings')

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const dbURL=process.env.ATLASDB_URL;

main().then(()=>
    console.log("Connected to DB")).catch(err => console.log(err));

async function main() {
// await mongoose.connect('mongodb://127.0.0.1:27017/omnilust');
  await mongoose.connect(dbURL);
}

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})

const store=MongoStore.create(
    {
        mongoUrl:dbURL,
        crypto:{
            secret:process.env.SECRET
        },
        touchAfter:24*3600 //after 24 hrs
    }
);

store.on("error",(err)=>{
    console.log("Error in Mongo Session Store",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,//After 7 days
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }    
}

app.use(session(sessionOptions));
app.use(flash());//This line should be above routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    // console.log(res.locals.success);
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"xxx@gmail.com",
//         username:"xxx"
//     })
//     let registeredUser=await User.register(fakeUser,"password123");
//     res.send(registeredUser);
// })

app.get("/",(req,res)=>{
    res.redirect("/listings");
})

app.use("/listings",listingRouter);
app.use("/listings/:listingId/reviews",reviewRouter);
app.use('/',userRouter);

app.all("*splat",(req,res,next)=>{
    next(new ExpressError("Page Not Found!",404));  
  })

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    // res.send(message).status(statusCode);
    // res.render("error.ejs",{message}).status(statusCode);//this line will cause an error
    res.status(statusCode).render("error.ejs",{message});
})