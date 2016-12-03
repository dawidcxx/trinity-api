var util = require('util');

module.exports = function schemaMiddleware(schema) {

  return function (req, res, next) {
    req.checkBody(schema);

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.useFirstErrorOnly().array()));
        return;
      }
      next();
    });
  }
}