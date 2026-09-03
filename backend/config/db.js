const mongoose = require('mongoose');

// Add HireHub DB name to the connection string
const MONGO_URI = "mongodb+srv://abalani608_db_user:F8BnQPZKoeOsL4Xm@cluster0.s3ubst1.mongodb.net/hirehub?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Atlas Connected successfully!');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
