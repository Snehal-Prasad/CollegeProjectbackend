const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://light:light@cluster0.fixmbbs.mongodb.net/students?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Routes
app.use("/api/student", require("./routes/studentRoutes"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
