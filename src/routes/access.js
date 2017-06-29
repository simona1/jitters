
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// check for token
function hasToken(req, res, next) {
  if (!req.cookies.auth) {
    res.sendStatus(404);
  } else {
    next();
  }
}

// check if user is logged
function isLoggedIn(req, res, next) {
  jwt.verify(req.cookies.auth, process.env.JWT_KEY, (err, decoded) => {
    if (err || !decoded.loggedIn) {
      res.sendStatus(403);
    } else {
      next();
    }
  });
}

// check if user is an administrator
function isAdministrator(req, res, next) {
  jwt.verify(req.cookies.auth, process.env.JWT_KEY, (err, decoded) => {
    if (err || parseInt(decoded.id) !== 1) {
      res.sendStatus(403);
    } else {
      next();
    }
  });
}

module.exports = { hasToken, isLoggedIn, isAdministrator };
