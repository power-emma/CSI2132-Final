const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const { Client } = require('pg')
const client = new Client({
  user: 'emma',
  host: 'localhost',
  database: 'CSI2132',
  password: '',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Postgres Database!");
});

let out = ""

app.get("/api", (req, res) => {
    msg = req.query.query
    console.log("Message from client: " + msg)
    res.set('Access-Control-Allow-Origin', '*')
    
    queryAndSend(msg,res)

  });

async function queryAndSend(msg, res) {
  await client.query(msg, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      out = result.rows
      console.log("Finished Query")
      res.json({message: out})
    }
  })
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});