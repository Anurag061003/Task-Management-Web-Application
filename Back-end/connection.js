const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
}
module.exports = connect;
