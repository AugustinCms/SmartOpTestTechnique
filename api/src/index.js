var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const sortData = require("./sortData");

var app = express();
var databaseName = "Surgeon";
var database;
require("dotenv").config();
app.use(cors());

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
  MongoClient.connect(process.env.MONGODB_CONNECTION, function (err, client) {
    if (err) throw err;
    database = client.db(databaseName);
    console.log("Connected to MongoDB");
  });
});

app.get("/api/surgeons", function (req, res) {
  database
    .collection("Surgeon collection")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      data = sortData(result);
      // sort data by operation count
      data.sort((a, b) => {
        return b.operationCount - a.operationCount;
      });
      if (req.query.search) {
        data = data.filter((surgeon) =>
          surgeon.surgeon.toLowerCase().includes(req.query.search.toLowerCase())
        );
      }
      res.send(data);
    });
});
