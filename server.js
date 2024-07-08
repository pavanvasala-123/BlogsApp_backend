const express = require("express");
require("dotenv").config();
const userRouters = require("./Routes/user");
const blogsRouter = require("./Routes/blog");
const Dbconnection = require("./DB Connection/DbConnection");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouters);
app.use("/blogs", blogsRouter);

app.use("/api", (req, res) => {
  res.send("home page");
});

Dbconnection();

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("listening to the port " + process.env.PORT);
});

module.exports = app;
