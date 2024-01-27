const mongoose = require("mongoose");
const { connectDB } = require("./db/index.js");
require("dotenv").config();
const { app } = require("./index.js");

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Listening on port ...`);
    });
  })
  .catch((e) => {
    console.log("MongoDB Connection Failed", e);
  });
