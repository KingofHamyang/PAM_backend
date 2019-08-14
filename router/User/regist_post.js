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

var regist_post = (req, res) => {
  var params = [];

  idcheckparams = [];

  studentidcheckparams = [];

  var ID = req.body["ID"];
  var password = req.body["password"];
  var name = req.body["name"];
  var studentID = req.body["studentID"];

  params.push(ID);
  params.push(password);
  params.push(name);
  params.push(100);
  params.push(Number(studentID));
  params.push(Number(studentID));

  idcheckparams.push(ID);

  studentidcheckparams.push(Number(studentID));

  var sql_select_id = "SELECT * from userinfo WHERE id=?";
  var sql_select_studentid = "SELECT * from userinfo WHERE studentID=?";
  var sql =
    "INSERT INTO userinfo (ID,Password,name,point,studentID) VALUES(?,?,?,?,?)";
  async function regist_query(req, res) {
    try {
      var IDtoRegist = await my_msq(sql_select_id, idcheckparams);
      console.log(IDtoRegist);
      if (IDtoRegist.length == 0) {
        var StudentID_to_regist = await my_msq(
          sql_select_studentid,
          studentidcheckparams
        );
        console.log(StudentID_to_regist);
        if (StudentID_to_regist.length == 0) {
          await my_msq(sql, params);
          return "ID 생성완료!";
        } else {
          return "이미 해당 학번으로 만들어진 아이디가 존재합니다!";
        }
      } else {
        return "이미 해당 아이디가 존재합니다!";
      }
    } catch (err) {
      console.log("Database connection error");
      return "Database connection error";
    }
  }

  regist_query(req, res).then(result => {
    res.send(result);
  });
  /*
  msq.query(sql_select_id, idcheckparams, (error, results, fields) => {
    if (results.length == 0) {
      console.log(req.body);
      msq.query(
        sql_select_studentid,
        studentidcheckparams,
        (error, results, fields) => {
          console.log(results);
          console.log(studentidcheckparams);
          if (results.length == 0) {
            msq.query(sql, params, function(error, results, fields) {
              res.send("ID 생성 완료!");
            });
          } else {
            res.send("이미 해당 학번으로 만들어진 아이디가 존재합니다!");
          }
        }
      );
    } else {
      res.send("이미 해당 아이디가 존재합니다!");
    }
  });
  */
};

module.exports = regist_post;
