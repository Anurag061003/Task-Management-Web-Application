const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type:String, required: true },
    email: { type: String,unique:true,required:true},
    password: { type: String, default:'' },
    status: { type: String, default: 'Active', enum: ['Active', 'InActive'] },
})
module.exports = mongoose.model("User", userSchema);