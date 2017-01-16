const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 9090;

mongoose.connect('mongodb://localhost:' + port + '/usuarios');
var userSchemaJSON = {
  email : String,
  password : String
};

var user_schema = new mongoose.Schema(userSchemaJSON);

var User = mongoose.model("user", user_schema);

const app = express();

app.use(express.static('public'));

app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  User.find((err, doc) => {
    console.log(doc);
  });
  res.render("login");
});

app.post("/users", (req, res) => {

  let user = new User({
    email : req.body.email,
    password : req.body.password
  });

  user.save(() => {
    console.log("Datos guardados");
  });

  res.send("Datos recibidos.");
});

app.listen(8080);
