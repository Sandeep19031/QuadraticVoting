const mysql = require("mysql");
const express = require("express");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "karan",
  database: "data",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/get", (req, res) => {
  res.status(200);
  res.send("kkk");
  console.log("nodejs connected");
});

app.listen(3001, () => {
  console.log("listening");
});
