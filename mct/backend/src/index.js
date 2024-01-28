const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const { User } = require("./models/user.model.js");
const { sendTx } = require("./services/sendTx.js");
const { parseEther } = require("ethers/lib/utils.js");
app.use(cors());
app.use(express.json());

const checkUserExistence = async (req, res, next) => {
  const { bank_id, wallet_id, username, password } = req.body;

  if (!bank_id || !wallet_id || !username || !password) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  try {
    const userExists = await User.exists({ bank_id, wallet_id });

    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    }
    next();
  } catch (error) {
    console.error("Error checking user existence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

app.post("/create", checkUserExistence, async (req, res) => {
  const { bank_id, wallet_id, username, password } = req.body;

  try {
    const resp = await User.create({
      bank_id: bank_id,
      wallet_id: wallet_id,
      username: username,
      password: password,
    });

    return res.json({
      body: resp,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/verify", async (req, res) => {
  pass = req.body.password;
  wallet_id = req.body.wallet_id;
  actual_pass = await User.findOne({ wallet_id: wallet_id }, "password").exec();
  actual_pass = actual_pass.password;
  if (pass === actual_pass) {
    return res.json({
      flag: true,
    });
  } else {
    return res.json({
      flag: false,
    });
  }
});

app.post("/isuser", async (req, res) => {
  const wallet_id = req.body.wallet_id;
  try {
    const id = await User.exists({ wallet_id: wallet_id });
    if (id !== null) {
      res.send({
        flag: true,
      });
    } else {
      res.send({
        flag: false,
      });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/finduser", async (req, res) => {
  const wallet_id = req.query.wallet_id;
  try {
    const user = await User.findOne({ wallet_id }, "username");
    if (user && user.username) {
      res.json({ username: user.username });
    } else {
      res.json({ username: null });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/send", async (req, res) => {
  /*
  {
    from: <bank_id> || <wallet_id> : string
    to: <bank_id> || <wallet_id> : string
    type: 1 || 2 || 3 || 4 : number
    amount: <numeric> : number
  }
  1 - mct to mct
  2 - mct to inr
  3 - inr to mct
  4 - inr to inr
  */
  const { from, to, type, amount } = req.body;

  try {
    switch (type) {
      case 1:
        // mct to mct
        const txReceipt = await sendTx(to, parseEther(amount.toString()));
        return res.json({
          txReceipt,
        });
        break;
      case 2:
        const txReceipt2 = await sendTx(
          "0xd68c62F898371Cd602d639eC190A70C6F0101d7f",
          parseEther(amount.toString())
        );
        if (txReceipt2) {
          const response = await axios.post("http://localhost:5000/debit", {
            from: 1,
            to,
            amount,
          });
          console.log(response);
          return res.json({
            txReceipt2,
          });
        }
        break;
      case 3:
        try {
          const response = await axios.post("http://localhost:5000/debit", {
            from,
            to: 1,
            amount,
          });
          if (response) {
            const txReceipt3 = await sendTx(to, parseEther(amount.toString()));
            return res.json({
              txReceipt3,
            });
          }

          // Process the response from Flask (if needed)

          return res.status(400).json({
            response,
          });
        } catch (error) {
          console.log("Error: ", error);
          break;
        }
        break;
      case 4:
        try {
          const response = await axios.post("http://localhost:5000/debit", {
            from,
            to,
            amount,
          });

          // Process the response from Flask (if needed)
          console.log(response);
          return res.json({
            response,
          });
        } catch (error) {
          console.log("Error: ", error);
          break;
        }

        break;
      default:
        return res.status(400).json({ error: "Invalid type" });
    }
  } catch (error) {
    console.log("Error: Noumaan", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  app,
};
