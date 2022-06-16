const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: 3307,
  database: "mysql",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// create users
app.get("/create_user_table", (_req, res) => {

    let query = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(30), PRIMARY KEY(id) );';

    connection.query(query, (err, result) => {
      if (err) throw err;
      res.send(result);
    })
});

// add user
app.post("/add_user", (req, res, ) => {

    console.log("here is incoming user", req.body);
    let user = req.body.user;
    
    let query = 'INSERT INTO users SET ?';

    connection.query(query, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Successfully Added!!");
    })
})

// create voting table
app.get("/create_voting_table", (_req, res) => {

  let query = 'CREATE TABLE votes(id int, cand1vote int UNSIGNED,cand2vote int UNSIGNED, cand3vote int UNSIGNED, cand4vote int UNSIGNED, cand5vote int, PRIMARY KEY(id) );';

  connection.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

// Store vote
app.post("/add_vote", (req, res) => {

  let votes = req.body.votes;

  let query = 'INSERT INTO votes SET ?';
  console.log("here is incoming data,", req.body.votes);
  connection.query(query, votes, (err, result) => {
        if (err) throw err;
        res.send(result);
  })
})

// get total votes
app.get("/get_total_votes", (_req, res) => {

    let query = `SELECT SUM(cand1vote) AS "totalCand1Vote", SUM(cand2vote) AS "totalCand2Vote", SUM(cand3vote) AS "totalCand3Vote", SUM(cand4vote) AS "totalCand4Vote", SUM(cand5vote) AS "totalCand5Vote" FROM votes`;
    console.log("total votes query has come");
    connection.query(query, (err, result) => {
      if (err) throw err;
      
      let data =  result[0];
      console.log("this result will be send", data);
      res.send(data);
    })
})
app.get("/", (_req, res) => {
  res.send("Welcome");
})

app.listen(3001, () => {
  console.log("listening");
});
