var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);
var survey_submit = (req, res) => {
  console.log("asdf");
  console.log(req.body);

  if (req.session.userID) {
    var parmas = [];

    parmas.push(req.body.s_ssq);

    msq.query(
      //"select COUNT(*), a_q_name,a_sq_s_ssq from answers where a_q_name =? and a_sq_s_ssq =? and answer =?",
      "select COUNT(*),a_q_name,a_sq_s_ssq,answer from answers group by a_q_name, a_sq_s_ssq, answer having a_sq_s_ssq = ?",
      parmas,
      (err, response, fields) => {
        res.send(response);
      }
    );
  } else {
    res.send("로그인 후에 이용해 주세요.");
  }
};

module.exports = survey_submit;
