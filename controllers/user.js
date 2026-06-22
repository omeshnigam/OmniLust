const User=require('../models/user')

module.exports.renderSignUpForm=(req,res)=>{
    res.render('users/signup');
}

module.exports.signup=async (req,res)=>{
    try{
let{username,email,password}=req.body;
const newUser=new User({email,username});
const registeredUser=await User.register(newUser,password);
console.log(registeredUser);
req.login(registeredUser,(err)=>{
if(err){
    return next(err);
}
req.flash('success','Welcome to OmniLust');
res.redirect('/listings');
})
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect('/signup')
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render('users/login');
}

module.exports.login=async (req,res)=>{
    let{username}=req.body;
    req.flash('success',`Welcome ${username.charAt(0).toUpperCase()+username.slice(1)} to OmniLust! You are Successfully Logged In`);
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
    }

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out")
        res.redirect('/listings');
    })
    }
