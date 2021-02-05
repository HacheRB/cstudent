const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

// Authentication Middleware
exports.authUser = (req, res, next) => {
  if (!req.headers.token) {
    res.status(401).json({ error: 'No Token found' })
  } else {
    jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
      if (err) { res.status(403).json({ error: 'Token not valid' }) }
      User
        .findOne({ email: token.email })
        .then(user => {
          res.locals.user = user
          next()
        })
        .catch(err => res.json(err))
    })
  }
}

exports.isAdmin = (req, res, next) => {
  if (!res.locals.user.role === "ADMIN") {
    res.status(401).json({ error: 'Not enough permissions' })
  } else {
    next()
  }
}
