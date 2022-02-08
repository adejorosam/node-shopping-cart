require("dotenv").config();
const jwt = require("jsonwebtoken");
const ErrorResponse = require('../utils/error');


function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    return next();
  } catch (error) {
    return next(new ErrorResponse("Invalid token", 401));

  }
}

module.exports = authMiddleware ;