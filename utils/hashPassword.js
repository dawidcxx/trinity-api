var sha = require('sha1');

/**
 * hashes the password according to the trinity core requirements
 * @param {string} username
 * @param {string} password
 * @return {string}
 */
module.exports = function hashPassword(username, password) {
  return sha(`${username.toUpperCase()}:${password.toUpperCase()}`);
}
