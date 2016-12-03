var { authDb, charactersDb } = require('../configure/database');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports = function dbContextProviderMiddleware(req, res, next) {
  req.db = { auth: authDb, characters: charactersDb };
  next();
}