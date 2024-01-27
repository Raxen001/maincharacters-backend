const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI with username and password
const MONGODB_URI =
  "mongodb+srv://admin:PgGl6xJi3A6jKMsL@cluster0.lyxducd.mongodb.net/";

// Enable CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true, // This line can be removed
  useUnifiedTopology: true, // This line can be removed
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a sample schema
const Schema = mongoose.Schema;
const SampleSchema = new Schema({
  name: String,
  age: Number,
});

const SampleModel = mongoose.model("Sample", SampleSchema);

// Define a route to get sample data
app.get("/samples", async (req, res) => {
  try {
    const samples = await SampleModel.find();
    res.json(samples);
  } catch (error) {
    console.error("Error fetching samples:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
