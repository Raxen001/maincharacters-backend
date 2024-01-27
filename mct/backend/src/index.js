const express = require("express");
const cors = require("cors");

const app = express();

const { User } = require("./models/user.model.js");
app.use(cors());
app.use(express.json());

app.post("/create", async (req, res) => {
  bank_id = req.body.bank_id
  wallet_id = req.body.wallet_id
  username = req.body.username
  password = req.body.password

  const resp = await User.create({
    bank_id: bank_id,
    wallet_id: wallet_id,
    username: username,
    password: password,
  });

  return res.json({
    body: resp,
  });
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
  console.log(req.body)
  const wallet_id =  req.body.wallet_id
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


})
module.exports = {
  app,
};
