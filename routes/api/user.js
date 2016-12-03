var express = require('express');
var router = express.Router();
var util = require('util');
var chalk = require('chalk');

var schema = require('../../middleware/schema');
var hashPassword = require('../../utils/hashPassword');

var requireAuth = require('../../middleware/requireAuth');


/* GET users listing. */
router.get('/', requireAuth, function(req, res) {
  res.send(req.user);
});

router.post('/', schema({
  password: {
    notEmpty: true,
    isLength: {
      options: [{ min: 8, max: 64 }]
    },
  },  
  username: {
    notEmpty: true,
    isLength: {
      options: [{ min: 3, max: 32 }]
    }
  }
}), function(req, res, next) {
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
