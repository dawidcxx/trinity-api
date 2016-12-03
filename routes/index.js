var router = require('express').Router();
var passport = require('passport');

/**
 * AUTH RELATED ROUTES
 */
router.post('/login', passport.authenticate('local'), function (req, res) {
  res.sendStatus(204);
});

router.post('/logout', function(req, res) {
  req.logout();
  res.sendStatus(204);
});


/**
 * RESOURCES
 */
router.use('/user', require('./api/user'));


module.exports = router;