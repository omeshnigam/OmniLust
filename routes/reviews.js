const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const Listing=require("../models/listing");
const Review=require("../models/review");

const {isLoggedIn,validateReview,isReviewAuthor}=require('../middleware');
const reviewsController=require("../controllers/reviews");

//Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewsController.createReview));

//Destroy Review Route
router.delete("/:reviewId/delete",isLoggedIn,isReviewAuthor,wrapAsync(reviewsController.destroyReview))

// Edit Review Route: HW
// app.post("/listings/:listingId/reviews/:reviewId/edit",async(req,res)=>{
//     let {listingId,reviewId}=req.params;
//     let listing=await Listing.findById(listingId);
//     let review=await Review.findById(reviewId);
//     res.redirect(`/listings/${listing._id}`);
//     })

module.exports=router;