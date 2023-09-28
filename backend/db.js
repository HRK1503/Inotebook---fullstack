const mongoose=require('mongoose');
const mongoURI="mongodb+srv://kotechahitarth1503:Krishna%401503@cluster-to-do-list.bqdxdio.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

const connectToMongo=async ()=>{
    await mongoose.connect(mongoURI,{ useNewUrlParser: true });
    console.log("connected");
}

module.exports=connectToMongo