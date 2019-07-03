var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);
var survey_titles = (req, res) => {
  if (req.session.userID) {
    console.log("설문목록 진입");
    msq.query("SELECT * from SurveyTitle", (err, response, fields) => {
      //console.log(response);
      res.send(response);
    });
  } else {
    res.send("로그인 후에 이용해주세요.");
  }
};

module.exports = survey_titles;
