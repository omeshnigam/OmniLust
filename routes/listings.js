const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing");
const {isLoggedIn,isOwner,validateListing}=require('../middleware');
const listingController=require('../controllers/listings');
const multer  = require('multer')
const {storage}=require('../cloudConfig')
const upload = multer({ storage })

// app.get("/testListing",async(req,res)=>{
// let sampleListing=new Listing({
//     title:"My New Villa",
//     description:"Near the beach",
//     price:1200,
//     location:"Goa",
//     country:"India"
// });
// await sampleListing.save();
// console.log("Sample was saved");
// res.send("Congrats, Testing successful");
// });

router.route("/")
//Index Route
.get(wrapAsync(listingController.index))
//Create Route
.post(isLoggedIn,upload.single('image'),validateListing,wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
//Show Route
.get(wrapAsync(listingController.showListing))
//Update Route
.put(isLoggedIn,isOwner,upload.single('image'),validateListing,wrapAsync(listingController.updateListing))
//Destroy Route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))

module.exports=router;