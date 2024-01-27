const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://admin:PgGl6xJi3A6jKMsL@cluster0.lyxducd.mongodb.net";
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
