const mongoose = require("mongoose");
require('dotenv').config();


// Connect to MangoDB

DB_PATH = process.env.DATABASE || 'mongodb://localhost:27017/TODO';
mongoose.connect(DB_PATH, { useUnifiedTopology: true });
// Check if connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Define the Schema for the Tasks collection
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: Number,
  categories: [String]
});

// Create the Model for the Tasks collection from Schema
const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;
