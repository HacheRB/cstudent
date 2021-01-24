const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

// Authentication Middleware
exports.authUser = (req, res, next) => {
  console.log(req.headers.token)
  if (!req.headers.token) {
    res.status(401).json({ error: 'No Token found' })
  } else {
    jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
      if (err) { res.status(403).json({ error: 'Token not valid' }) }
      User
        .findOne({ email: token.email })
        .then(user => {
          res.locals.user = user
          console.log("<<<<<<<<<<<<<<<<<<<<<<<<")
          console.log(res.locals.user)
          console.log("<<<<<<<<<<<<<<<<<<<<<<<<")
          next()
        })
        .catch(err => res.json(err))
    })
  }
}

exports.isAdmin = (req, res, next) => {
  if (!token.role === "ADMIN") {
    res.status(401).json({ error: 'Not enough permissions' })
  } else {
    next()
  }
}


exports.VerifyEmail = (req, res, next) => {
  User
    .findOne({
      email: req.body.email,
    })
    .then(user => {
      if (user) return res.send('Email already registered')
      next()
    }).catch(err => res.status(500).json(err))
}

exports.VerifyUserName = (req, res, next) => {
  User
    .findOne({
      userName: req.body.userName,
    })
    .then(user => {
      if (user) return res.send('Username already in use')
      next()
    }).catch(err => res.status(500).json(err))
}