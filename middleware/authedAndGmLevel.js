/**
 * @param {number} gmLevel
 */
module.exports = function authedAndGmLevelMiddleware(gmLevel) {
  return function (req, res, next) {
    require('./requireAuth')(req, res, function () {
      if(req.user.gmLevel === gmLevel) {
        next();
      } else {
        res.sendStatus(401);
      }
    });
  }
}