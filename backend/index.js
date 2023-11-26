const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");

// Connect MongoDB at default port = 27017
mongoose.connect(
  "mongodb://localhost:27017/crud_db",

  {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

app.use(express.json());

app.get("/", (req, res) => res.send("Server is  Running Well"));

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:3001`)
);
