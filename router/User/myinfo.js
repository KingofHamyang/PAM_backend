var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);

function my_msq(query_string, data_input) {
  return new Promise((resolve, reject) => {
    console.log("promise 접근");
    msq.query(query_string, data_input, (err, response, fields) => {
      if (err) {
        reject(fields);
      } else {
        resolve(response);
      }
    });
  });
}

async function myinfo_query(req, res) {
  var result = await my_msq(
    "SELECT * from userinfo where ID = ?",
    req.session.userID
  );

  return result;
}

var myinfo = (req, res) => {
  console.log("myinfo 접근");
  if (req.session.userID) {
    myinfo_query(req, res)
      .then(response => {
        console.log(response);
        console.log("promise 성공");
        res.send(response);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send("로그인 후에 이용해주세요.");
  }
};

module.exports = myinfo;
