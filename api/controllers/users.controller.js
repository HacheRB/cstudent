const User = require('../models/users.model')
const utils = require('../utils/utils')

exports.getAllUsers = (req, res) => {
  User
    .find()
    .then(response => res.json(response))
    .catch((err) => utils.handleError(err, res))
}

exports.getUserProfile = (req, res) => {
  User
    .findById(res.locals.user._id)
    .then(response => res.json(response))
    .catch(err => utils.handleError(err, res))
}

exports.getUserByUserName = (req, res) => {  //need to retrieve only some data
  User
    .findOne({ userName: req.params.userName }) // not sure if params or body
    .then(user => {
      res.json(user)
    }) //solo devolver algunos datos
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
    .remove({ _id: res.locals.user.id })
    .then(response => res.json(response))
    .catch(err => utils.handleError(err, res))
}
