const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URI);
    // console.log('Database connection host connected:',connect.connection.host, connect.connection.name)
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
