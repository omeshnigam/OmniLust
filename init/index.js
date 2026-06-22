require("dotenv").config({ path: "../.env" });

const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing");

const dbURL=process.env.ATLASDB_URL;

main().then(()=>
    console.log("Connected to DB")).catch(err => console.log(err));

async function main() {
//   await mongoose.connect(dbURL);
   await mongoose.connect('mongodb://127.0.0.1:27017/omnilust');
}

const initDB=async()=>{
    await Listing.deleteMany({});
    let listings=[];
    for(let obj of initData.data){
        const address=`${obj.location},${obj.country}`;
        const response=await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.G_MAP_API_KEY}`);

        const data=await response.json();

        //For Debugging
//         console.log("API KEY:", process.env.G_MAP_API_KEY);

//         console.log(address);
// console.log(data.status);
// console.log(data.error_message);

        if(data.results.length>0){
            const coords=data.results[0].geometry.location;
            obj.geometry={
                type:'Point',
                coordinates:[
                    coords.lng,
                    coords.lat
                ]
            };
        }

        obj.owner='6a2c867eefda1211ab8f49e5';
        listings.push(obj);
    }
    await Listing.insertMany(listings);
    console.log("data initialized successfully");
}

initDB();