const mongoose=require("mongoose");
const {Schema}=mongoose;
const Review=require("./review");
const User=require('./user')

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{url:{
        type:String
    },
    filename:{
        type:String
    }
},
    price:{
        type:Number,
        default:1000
    },
    location:{
        type:String,
        required:true
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            default:"Point"
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    country:{
        type:String,
        required:true
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

// This middleware will get trigger when deletion operation will get perform and will delete all the reviews corresponding to a particular listing.
listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
}
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;