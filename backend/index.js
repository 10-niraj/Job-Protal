const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test Route
app.get("/", (req,res)=> res.send("Backend Running"));
app.get("/api/jobs", (req,res)=> res.json([{id:1, title:"Frontend Dev", company:"Google"}]));
app.get("/api/users", (req,res)=> res.json([{id:1, name:"Vivek"}]));

module.exports = app;