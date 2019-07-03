var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);
var survey_submit = (req, res) => {
  console.log(req.body);
  if (req.session.userID) {
    msq.query("SELECT max(answer_id) from Answers", (err, response, fields) => {
      console.log(response[0]["max(answer_id)"]);
      var seq = response[0]["max(answer_id)"];
      var errorbit = 0;
      try {
        for (var key in req.body.data) {
          seq = seq + 1;
          var params = [];
          params.push(seq);
          params.push(req.session.userID);
          params.push(key);
          params.push(req.body.sq_s_ssq);
          params.push(req.body.data[key]);
          msq.query(
            "insert into answers (answer_id, answeredby, a_q_name, a_sq_s_ssq, answer) values (?,?,?,?,?)",
            params,
            (err, response, fields) => {
              if (err) {
                throw err;
              }
            }
          );
        }
        msq.query(
          "select point from userinfo where ID = ?",
          req.session.userID,
          (err, response, fields) => {
            console.log("pointupdate");
            var point = parseInt(response[0].point);
            point = point + 3;
            var point_ = point.toString();
            console.log(point_);
            msq.query(
              "update userinfo set point = ? where ID = ?",
              [point_, req.session.userID],
              (err, response, fields) => {
                console.log(response);
              }
            );
          }
        );

        res.send("설문에 참여해주셔서 감사합니다.");
      } catch (err) {
        res.send("데이터베이스 에러!");
      }
    });
  } else {
    res.send("로그인 후에 이용해 주세요.");
  }
};

module.exports = survey_submit;
