const mongoose = require("mongoose");

let MONGODB_URI;
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");
    console.log(
      "Connection Instance Host:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
