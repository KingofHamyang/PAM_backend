var mysql = require("mysql");
const config = require("../../DB_config");

var msq = mysql.createConnection(config);
var survey_regist = (req, res) => {
  var i = 0;
  var j = 0;
  console.log(req.session.userID);
  titleparams = [];
  if (req.session.userID) {
    msq.query("SELECT max(s_ssq) from SurveyTitle", (err, response, fields) => {
      console.log(response);
      console.log(response[0]["max(s_ssq)"]);

      titleparams.push(parseInt(response[0]["max(s_ssq)"]) + 1);

      titleparams.push(req.body["surveytitle"]);
      titleparams.push(req.session.userID);
      console.log(titleparams);

      msq.query(
        "INSERT INTO SurveyTitle (s_ssq, s_name, s_id) VALUES(?,?,?)",
        titleparams,
        (err, response, fields) => {
          console.log(req.body.data.length);
          const AnswerInsertion = (index, Qparams) => {
            msq.query(
              "INSERT INTO SurveyQuestions (q_name, sq_s_ssq) VALUES(?,?)",
              Qparams,
              (err,
              response,
              fields => {
                console.log("index " + index + " " + j);
                for (j = 0; j < req.body.data[index].contents.length; j++) {
                  Answerlistparams = [];
                  Answerlistparams.push(req.body.data[index].name);
                  Answerlistparams.push(titleparams[0]);
                  Answerlistparams.push(req.body.data[index].contents[j]);
                  console.log(Answerlistparams);
                  msq.query(
                    "INSERT INTO Answerlist (q_name, sq_s_ssq, Answer) VALUES(?,?,?)",
                    Answerlistparams,
                    (err, response, fields) => {
                      console.log(response);
                    }
                  );
                }
              })
            );
          };
          for (i = 0; i < req.body.data.length; i++) {
            questionparams = [];
            questionparams.push(req.body.data[i].name);
            questionparams.push(titleparams[0]);
            console.log(questionparams);
            AnswerInsertion(i, questionparams);
          }
        }
        //
      );
    });
    msq.query(
      "select point from userinfo where ID = ?",
      req.session.userID,
      (err, response, fields) => {
        console.log("pointupdate");
        var point = parseInt(response[0].point);
        point = point - 3;
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
    res.send("설문조사 등록 성공!");
  } else {
    console.log("로그인 안댐");
    res.send("로그인을 먼저 해주세요.");
  }
  console.log(req.body);
};

module.exports = survey_regist;
