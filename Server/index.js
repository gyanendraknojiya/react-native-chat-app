const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const Schema = mongoose.Schema;

const user = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  avatar: String,
  mobile_number: Number,
  country_code: String,
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", user);

app.get("/", (req, res) => {
  res.send("<h1>Sever is running</h1>");
});

app.get("/createUser", (req, res) => {
  const newUser = new userModel({
    firstName: "Gyanendra",
    lastName: "Knojiya",
    email: "gyanendrak064@gmail.com",
    password: "fdff",
  });
  newUser.save();
  userModel.find({}, function (err, docs) {
    res.send(docs);
  });
});

app.post("/user/userLogin", (req, res) => {
  const { email, password } = req.headers;
  console.log(email);
});

app.post("/user/userSignup", (req, res) => {
  const { first_name, last_name, email, password, confirm_password } =
    req.headers;
  // console.log(req.headers);
  if (!first_name || !last_name || !email || !password || !confirm_password) {
    throw res.status(400).send("Invalid login, All fields not completed!");
  }
  if (password !== confirm_password) {
    throw res
      .status(400)
      .send("Invalid login, password and confirm password is not same!");
  }

  userModel.findOne({ email }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    console.log(user);
    if (user) {
      return res.status(400).send("User already exits!");
    }
    if (!user) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash);

        let newUserData ={
          first_name,
          last_name,
          email,
          password: hash,
        }

        const newUser = new userModel(newUserData);
        newUser.save();
        var token = jwt.sign(newUserData, process.env.JWT_SECRET);
        return res.json({
          message:"authentication successful",
          token
        })
      });
    }
  });
});

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    app.listen(PORT, () => {
      console.log("Server is running at port " + PORT);
    });
  }
);
