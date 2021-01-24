const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

exports.register = (req, res) => {
  if (req.body && req.body.password) {
    const encryptedPwd = bcrypt.hashSync(req.body.password, 10)
    User
      .create({
        email: req.body.email,
        password: encryptedPwd,
        userName: req.body.userName,
      })
      .then(user => {
        const data = { email: user.email, userName: user.userName, role: user.role }
        const token = jwt.sign(data, process.env.SECRET)

        res.status(200).json({ token: token, ...data })
      })
      .catch(err => res.status(500).json(err))
  }
}

exports.register2 = (req, res) => {
  //Check if email is in DB
  User
    .findOne({
      email: req.body.email,
    })
    .then(user => {
      if (user) {
        res.send('Email already registered')
      } else {
        //Check if username is already in use
        User
          .findOne({
            userName: req.body.userName,
          })
          .then(user => {
            if (user) {
              res.send('Username already in use ')
            } else {
              if (req.body && req.body.password) {
                const encryptedPwd = bcrypt.hashSync(req.body.password, 10)
                User
                  .create({
                    email: req.body.email,
                    password: encryptedPwd,
                    userName: req.body.userName,
                  })
                  .then(user => {
                    const data = { email: user.email, userName: user.userName }
                    const token = jwt.sign(data, process.env.SECRET)

                    res.status(200).json({ token: token, ...data })
                  })
                  .catch(err => res.status(500).json(err))
              }
            }
          }).catch(err => res.status(500).json(err))
      }
    })
    .catch(err => res.status(500).json(err))
}

// Select only returns what you indicate, not sure about it.
exports.login = (req, res) => {
  User
    .findOne({
      email: req.body.email,
    })
    .select('password email userName role')
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const data = { email: user.email, userName: user.userName, role: user.role }
          const token = jwt.sign(data, process.env.SECRET)
          res.status(200).json({ token: token, ...data })
        } else {
          res.send('passwords do not match')
        }
      } else {
        res.send('User email not found')
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
