var chalk = require('chalk');



const errMsg = (key) => `CONFIGURATION ERROR: ENVIRONMENT VARIABLE ${chalk.bgRed(key)} is required but could not be found`;

/**
 * checks if envs keys are present and set,
 * throws otherwise
 * @param {Array<string>} keys the keys to check for
 * @returns {undefined}
 * @throws {Error} will be thrown if a key is present.
 */
function checkEnvs(keys) {
    keys
      .forEach(key => {
          if (!process.env.hasOwnProperty(key)) {
              throw new Error(errMsg(key));
          }
      })
}

module.exports = checkEnvs;