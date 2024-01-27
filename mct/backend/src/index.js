const express = require("express");
const cors = require("cors");

const app = express();

const { User } = require("./models/user.model.js");

app.use(cors());
app.use(express.json());

app.post("/createUser", async (req, res) => {
  const resp = await User.create({
    bank_id: "123",
    wallet_id: "0xff",
    username: "noumaan",
  });

  return res.json({
    body: resp,
  });
});

module.exports = {
  app,
};
