const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const PORT = 5000;

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const PORT = 5000;  


const uri = `mongodb+srv://${process.env.Mongo_USER}:${process.env.MONGO_PASSWORD}@cluster0.6jqtncq.mongodb.net/test?retryWrites=true&w=majority`;


//const uri = `mongodb+srv://${process.env.Mongo_USER}:${process.env.MONGO_PASSWORD}@cluster0.6jqtncq.mongodb.net/test?retryWrites=true&w=majority`;
const uri = `mongodb+srv://shahedsuleiman2001:12345@cluster0.8jcjwqa.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);
const conn = mongoose.connection;

conn.once("open", () => {
  console.log("Database connected successfully");
});
conn.on("error", (error) => {
  console.error("Error connecting to database:", error);
  process.exit();
});

const todoRouter = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");
app.use(todoRouter);
app.use(userRoute);

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
