const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const date = require(__dirname + "/date.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

var items = ["Make to-do list"];
var worklists = [];

app.get("/", function (req, res) {
  //   res.sendFile(__dirname + "/index.html");
  day = date.getDate();
  res.render("list", { ListTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  if (req.body.list === "Work") {
    worklists.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work", newListItems: worklists });
});

app.listen(PORT, function (req, res) {
  console.log("Server is running on port ${PORT}");
});
