var chalk = require('chalk');

module.exports = function uncaughtErrorHandler(err, req, res, next) {
  res.status(err.status || 500);
  console.log(chalk.bgRed(JSON.stringify(err)));

  // send user more data if in development mode
  if (process.env['NODE_ENV']) {
    res.send(JSON.stringify(err));
  }
  
}