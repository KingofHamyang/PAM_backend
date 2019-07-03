var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);
var survey_details = (req, res) => {
  console.log("디테일 접근");
  results = [];
  if (req.session.userID) {
    console.log("세션 존재");
    s_ssq = req.body.s_ssq;
    /*  var getanswerlist = question => {
      
      answer = [];
      answer.push(question.q_name);
      answer.push(question.sq_s_ssq);
      console.log(answer);
      msq.query(
        "SELECT * FROM answerlist where sq_s_ssq = ?",
        answer,
        (err, response, fields) => {
          console.log(response);
          return response;
        }
      );
    };*/
    msq.query(
      "SELECT * from answerlist where sq_s_ssq = ?",
      s_ssq,
      (err, response, fields) => {
        console.log(response);
        res.send(response);
      }
    );
  } else {
    res.send("로그인 후에 이용해주세요.");
  }
};

module.exports = survey_details;
