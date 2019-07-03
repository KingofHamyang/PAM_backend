var logout = (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      res.send("서버 또는 데이터베이스 에러.");
      console.log("error");
    } else {
      res.send("로그아웃 완료!");
      console.log("잘댐");
    }
  });
};

module.exports = logout;
