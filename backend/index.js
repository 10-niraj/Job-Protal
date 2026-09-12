const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (e) {
    console.log("Mongo Error", e.message);
  }
}
connectDB();

app.get("/", (req,res)=> res.send("Backend Running OK"));
app.get("/api/jobs", (req,res)=> res.json([{id:1, title:"Frontend Dev", company:"Google"}]));
app.get("/api/users", (req,res)=> res.json([{id:1, name:"Vivek"}]));

module.exports = app;