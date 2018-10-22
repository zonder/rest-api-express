const User = require('../models/user');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.list().then((data)=>{
    res.send(data);
  });
});

module.exports = router;
