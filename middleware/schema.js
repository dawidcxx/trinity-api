var util = require('util');
var Ajv = require('ajv');

var ajv = new Ajv();

module.exports = function schemaMiddleware(schema) {
  var validate = ajv.compile(schema);

  return function validateSchemaMiddleware(req, res, next) {
    if (validate(req.body)) {
      next();      
    } else {
     res.status(400).send({
       message: 'invalid request, please adjust your data to the schema',
       schema: schema
     });
    }
  };
}