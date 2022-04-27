const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors()); // To allow any origin
app.use(express.json()); // To read json data in request body

app.listen(4000, ()=>{
    console.log("App run on http://localhost:3000");
})

// import Task model
const TaskModel = require("./models/task_model");

// Define static route
app.use(express.static("public"));

// Define dynamic routes
app.get("/tasks", (req, res) => {
  TaskModel.find()
  // .sort({priority: 'asc'})
  // .limit(2)
  .then((tasks) => {
    res.send(tasks);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
});

app.get("/todo", (req, res) => {
  TaskModel.find({completed: false})
  .then((tasks) => {
    res.send(tasks);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
});

app.post("/add_task", (req, res) => {
  // const task = new TaskModel(req.body);
  // task.save();
  // response.send(task);
  TaskModel.create(req.body)
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/task/:id", (req, res) => {
  console.log("delete task with id: " + req.params.id);
  TaskModel.deleteOne({_id: req.params.id})
  .then((obj) => {
      res.send(obj);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/complete/:id", (req, res) => {
  console.log("complete task with id: " + req.params.id);
  TaskModel.updateOne({ _id: req.params.id }, { completed: true })
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
