const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    title:{ type: String, required: true },
    description:{ type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Completed', 'Pending'] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
})
module.exports = mongoose.model("Task",TaskSchema);  