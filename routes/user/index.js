var express = require('express');
var router = express.Router();
var util = require('util');
var chalk = require('chalk');

var validateSchema = require('../../middleware/schema');
var hashPassword = require('../../utils/hashPassword');

var requireAuth = require('../../middleware/requireAuth');

var schema = require('./schema.json');


// gets the logged in user
router.get('/', requireAuth, function(req, res) {
  res.send(req.user);
});


// creates a new user
router.post('/', validateSchema(schema.post), function(req, res, next) {
  var {username, password} = req.body;
  var {auth} = req.db;
  var hash = hashPassword(username, password);

  auth.query('INSERT INTO account SET ?', { sha_pass_hash: hash, username },
    function(err, result) {
      if(err) {
        console.error(chalk.bgRed(err));
        res.status(409).send({msg: `failed to create user`, errcode: err.code});
      } else {
        res.status(201).send({id: result.insertId});
      }
    }
  );
});

module.exports = router;
