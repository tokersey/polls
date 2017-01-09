var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send("hello world, You are at the poll index");
});

module.exports = router;