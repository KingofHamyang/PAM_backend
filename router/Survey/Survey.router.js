const express = require("express");
var router = express.Router();

const survey_regist = require("./Survey_regist");
const survey_titles = require("./Survey_titles");
const survey_details = require("./Survey_details");
const survey_submit = require("./Survey_submit");
const survey_result = require("./Survey_result");

router.post("/survey_regist", survey_regist);
router.post("/survey_titles", survey_titles);
router.post("/survey_details", survey_details);
router.post("/survey_submit", survey_submit);
router.post("/survey_result", survey_result);

module.exports = router;
