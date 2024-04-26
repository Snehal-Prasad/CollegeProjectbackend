const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const questionRoutes = require('./routes/questionRoutes');
const datasetQuestionRoutes = require("./routes/datasetquestionRoutes"); 

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://light:light@cluster0.fixmbbs.mongodb.net/students?retryWrites=true&w=majority&appName=Cluster0",
  // "mongodb+srv://snehalprasad101:7KoJWt3hgcd88RuH@cluster0.iiaev8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
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
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/question", questionRoutes);
app.use("/api/dataset-question", datasetQuestionRoutes);



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
