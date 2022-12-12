const express = require("express");
const app = express();
const env = require("dotenv");
env.config();
const Database_Connection = require("./Configs/db");
const port = process.env.PORT || 8000;
const cors = require("cors");
const TodoRouter = require("./Routes/Todo");
const UserModel = require("./Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./Middlewares/Auth");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/home", (req, res) => {
  res.status(200).send("Welcome to my To=Do App");
});

app.post("/signup", async (req, res) => {
  try {
    let data = await UserModel.find({ email: req.body.email });
    if (data.length > 0) {
      res.status(200).send({ msg: "User Already Exist" });
    } else {
      bcrypt.hash(req.body.password, 5, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        }
        req.body.password = hash;
        await UserModel.create(req.body);
        res.status(200).send({ msg: "User registered Successfully" });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to create new user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let data = await UserModel.find({ email: req.body.email });
    if (data.length <= 0) {
      res.status(200).send({ msg: "User not found" });
    } else {
      bcrypt.compare(
        req.body.password,
        data[0].password,
         (err, result)=> {
          if (err) {
            res.status(500).send({ msg: "Something went wrong !" });
          } else if (result) {
            jwt.sign(
              { userID: data[0]._id },
              process.env.SECRET_KEY,
              (err, token) => {
                res
                  .status(200)
                  .send({ msg: "User login Successfully", token: token });
              }
            );
          }
        }
      );
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to login" });
  }
});

app.use(auth);
app.use("/todo", TodoRouter);

app.listen(port, () => {
  try {
    Database_Connection;
    console.log(`Database connected and listening to http://localhost:${port}`);
  } catch (e) {
    console.log(e);
    console.log("Something wrong in connection");
  }
});
