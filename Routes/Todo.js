const express = require("express");
const TodoModel = require("../Models/Todo.model");
const TodoRouter = express.Router();
TodoRouter.use(express.json());

TodoRouter.get("/", async (req, res) => {
  try {
    const todo = await TodoModel.find({ userID: req.body.userID });
    res.status(200).send(todo);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

TodoRouter.post("/create", async (req, res) => {
  try {
    await TodoModel.create(req.body);
    res.status(200).send({ msg: "Todo Added" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

TodoRouter.patch("/:TodoID", async (req, res) => {
  try {
    const TodoID = req.params.TodoID;
    TodoModel.findByIdAndUpdate(TodoID, req.body);
    res.status(200).send({ msg: "Todo Modified" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

TodoRouter.delete("/:TodoID", async (req, res) => {
    try {
      const TodoID = req.params.TodoID;
      TodoModel.findByIdAndDelete(TodoID);
      res.status(200).send({ msg: "Todo Modified" });
    } catch (e) {
      console.log(e);
      res.status(400).send({ msg: "Not Found" });
    }
  });
module.exports = TodoRouter;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Mzk2ZmFkNTNiOTU3MDNiMjVjOWYyZGQiLCJpYXQiOjE2NzA4Mzk4NTN9.lcpAvvxYeXHXELz4NiKGQ3oCJBpx_yXwHwJWmKTLcWQ

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Mzk3MGE5NTEzZTc1YzdkNmJkYTEzNDkiLCJpYXQiOjE2NzA4NDMwMzl9.I1bCT0fhL1rpsUSutRUEc_FTob1YeYeRkjEchOqEi5U