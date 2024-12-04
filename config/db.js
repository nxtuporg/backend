const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://ved:vedvedved@lms-cluster.s5q8x.mongodb.net");
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;
