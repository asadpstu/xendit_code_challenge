const express = require("express");
const router = express.Router();
const { getAllCharecters, getCharecterDetails } = require("../Controller/Charecter");
const {getRedisRecord,getRedisRecordSingle} = require("../Middleware/Redis");



router.get('/', getRedisRecord, getAllCharecters);
router.get('/:charecterId', getRedisRecordSingle, getCharecterDetails);


module.exports = router;