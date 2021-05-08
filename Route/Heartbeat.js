const express = require("express");
const router = express.Router();
const { heartbeat } = require("../Controller/Heartbeat");

router.get('/', heartbeat)
module.exports = router;