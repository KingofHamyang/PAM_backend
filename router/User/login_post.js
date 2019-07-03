var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);

var login_post = (req, res) => {
  console.log(req.session.userID);
  sql_findid = "SELECT password from userinfo WHERE id=?";
  msq.query(sql_findid, req.body["ID"], (error, results, fields) => {
    if (results.length == 0) {
      res.send("ID가 잘못되었습니다.");
    } else {
      console.log(req.body["password"]);
      console.log(results[0]);
      if (results[0].password == req.body["password"]) {
        req.session.userID = req.body["ID"];
        //  res.setHeader("Access-Control-Allow-Headers", "Set-Cookie");

        res.send("로그인!");
      } else {
        res.send("패스워드가 틀렸습니다.");
      }
    }
  });
};

module.exports = login_post;
