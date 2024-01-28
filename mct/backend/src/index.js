const express = require("express");
const cors = require("cors");

const app = express();

const { User } = require("./models/user.model.js");
app.use(cors());
app.use(express.json());

// app.post("/create", async (req, res) => {
//   bank_id = req.body.bank_id
//   wallet_id = req.body.wallet_id
//   username = req.body.username
//   password = req.body.password
//   const resp = await User.create({
//     bank_id: bank_id,
//     wallet_id: wallet_id,
//     username: username,
//     password: password,
//   });

//   return res.json({
//     body: resp,
//   });
// });
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



app.post("/verify", async(req, res) => {
  pass = req.body.password
  wallet_id = req.body.wallet_id
  actual_pass = await User.findOne({'wallet_id': wallet_id}, 'password').exec();
  actual_pass = actual_pass.password
  if(pass === actual_pass){
    return res.json({
      flag: true
    })
  }
  else{
    return res.json({
      flag:false
    })
  }
})

app.post("/isuser", async (req, res) => {
  const wallet_id =  req.body.wallet_id
  try{
    const id = await User.exists({wallet_id: wallet_id})
    if(id !== null ){
      res.send(
        {
          flag: true
        }
        )
      } 
      else{
        res.send(
          {
            flag: false
          }
          )
        }
      }
      catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

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


module.exports = {
  app,
};
