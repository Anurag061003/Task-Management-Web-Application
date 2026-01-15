const mongoose= require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Task-Manager');
        console.log("database connected");

    }catch(err){
        console.log(err)
    }
}
module.exports=connect;