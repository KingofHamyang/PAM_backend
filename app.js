const config = require("./DB_config");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
var mysql = require("mysql");
var session = require("express-session");

var cors = require("cors");
const routing = require("./router/router.js");

const app = express();

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: true
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static("public"));

app.use("/router", routing);

app.get("/", (req, res) => {
  console.log(req.session.userID);
  if (req.session.userID) {
    res.render("main", { name: req.session.userID + "님 환영합니다!" });
  } else {
    res.render("main", { name: "로그인 해주세요" });
  }
});

app.listen(3001, () => {
  console.log("node is running at 3001");
});
