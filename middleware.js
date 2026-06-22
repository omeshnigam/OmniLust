const Listing=require('./models/listing');
const {listingSchema,reviewSchema}=require('./schema');
const ExpressError=require("./utils/ExpressError");
const Review=require("./models/review");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to do this operation");
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner._id.equals(res.locals.currUser._id)){
            req.flash("error","You do not have the permission to do this");
            return res.redirect(`/listings/${id}`);
        }
        next();
}

// Server-side validation using joi and middleware
//For Listing Validation:
module.exports.validateListing=(req,res,next)=>{
    // 1st way:
    // let result=listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error){
    //     throw new ExpressError(result.error,400);
    // }

    // 2nd way:
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");//combining additional information about an error
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
}

//For Review Validation:
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");//combining additional information about an error
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
        let review=await Review.findById(reviewId);
        if(!review.author._id.equals(res.locals.currUser._id)){
            req.flash("error","You are not the author of this review");
            return res.redirect(`/listings/${id}`);
        }
        next();
}
