var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);
var myinfo = (req, res) => {
  result = {};
  console.log("myinfo 접근");
  if (req.session.userID) {
    msq.query(
      "SELECT * from userinfo where ID = ?",
      req.session.userID,
      (err, response, fields) => {
        console.log(response);
        res.send(response);
      }
    );
  } else {
    res.send("로그인 후에 이용해주세요.");
  }
};

module.exports = myinfo;
