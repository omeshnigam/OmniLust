const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async(req,res)=>{
let listing=await Listing.findById(req.params.listingId);
let newReview=new Review(req.body.review);
newReview.author=req.user._id;
listing.reviews.push(newReview);

await newReview.save();
await listing.save();

req.flash("success","New Review Created Successfully");
res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let {listingId,reviewId}=req.params;
    let review=await Review.findByIdAndDelete(reviewId);
    let listing=await Listing.findByIdAndUpdate(listingId,{$pull:{reviews:reviewId}});
    req.flash("success","Review Deleted Successfully");
    res.redirect(`/listings/${listing._id}`);
}