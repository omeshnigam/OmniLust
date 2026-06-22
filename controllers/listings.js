const Listing=require("../models/listing");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    }

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new");
    }

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author"
    }}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings");
    }
    else{
    res.render("listings/show.ejs",{listing,mapsApiKey:process.env.G_MAP_API_KEY});
    }
}

module.exports.createListing=async (req,res,next)=>{
// let {title,description,image,price,location,country}=req.body;

// if(!req.body.listing){
//     throw new ExpressError("Send valid data for listing",400);
// }

 let url = req.file.path;
  let filename = req.file.filename;

let newListing=new Listing(req.body.obj);

const geoResponse=await client.geocode({
    params:{
        address:newListing.location,
        key:process.env.G_MAP_API_KEY
    }
})

// if(geoResponse.data.status==='OK')
// console.log('valid location');
// else
//     console.log('not a valid location');

// console.log(geoResponse.data.results[0].geometry.location);

if(geoResponse.data.results.length===0){
    req.flash('error','Invalid Location');
    return res.redirect('/listings/new');
}
else{
    const coords=geoResponse.data.results[0].geometry.location;

    newListing.geometry={
        type:'Point',
        coordinates:[coords.lng,coords.lat]
    }
}

// if(!newListing.title){
//     throw new ExpressError("Title is missing!",400);
// }
// if(!newListing.description){
//     throw new ExpressError("Description is missing!",400);
// }
// if(!newListing.location){
//     throw new ExpressError("Location is missing!",400);
// }
// if(!newListing.country){
//     throw new ExpressError("Country is missing!",400);
// }

// console.log(req.user);
newListing.owner=req.user._id;
newListing.image={url,filename};
await newListing.save();
req.flash("success","New Listing Created Successfully");
res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings");
    }else{
    res.render("listings/edit",{listing});}
}

module.exports.updateListing=async(req,res)=>{
    if(!req.body.obj){
        throw new ExpressError("Send valid data for listing",400);
    }
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.obj});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename}
    await listing.save();
    }
    req.flash("success","Listing Updated Successfully");
res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Successfully");
    res.redirect('/listings');
    }