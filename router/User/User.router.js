const express = require("express");

var router = express.Router();

const regist_get = require("./regist_get");
const regist_post = require("./regist_post");
const login_get = require("./login_get");
const login_post = require("./login_post");
const logout = require("./logout");
const myinfo = require("./myinfo");

router.get("/regist", regist_get);
router.post("/regist", regist_post);
router.post("/logout", logout);
router.post("/myinfo", myinfo);
router.get("/login", login_get);
router.post("/login", login_post);

module.exports = router;
