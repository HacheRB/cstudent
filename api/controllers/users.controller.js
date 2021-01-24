const User = require('../models/users.model')
const utils = require('../utils/utils')

exports.getAllUsers = (req, res) => {
  User
    .find()
    .then(response => res.json(response))
    .catch((err) => utils.handleError(err, res))
}

exports.getUserById = (req, res) => {
  User
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => utils.handleError(err, res))
}

exports.updateUser = (req, res) => {
  User
    .findByIdAndUpdate(res.locals.user.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => {
      console.log(response)
      res.json(response)
    })
    .catch((err) => utils.handleError(err, res))
}

exports.updatePassword = (req, res) => {
  console.log('pendiente de hacer')
}

exports.deleteUserById = (req, res) => {
  User
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => utils.handleError(err, res))
}

