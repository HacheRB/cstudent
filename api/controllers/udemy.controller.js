const User = require('../models/udemy.model')
const utils = require('../utils/utils')

exports.getAllCourses = (req, res) => {
  User
    .find()
    .then(response => res.json(response))
    .catch((err) => utils.handleError(err, res))
}

exports.getCourseById = (req, res) => {
  User
    .findById(req.params.courseId)
    .then(response => res.json(response))
    .catch((err) => utils.handleError(err, res))
}

exports.AddCourseByUdemyId = (req, res) => {
  console.log('pendiente de hacer')
}

exports.updateCourseById = (req, res) => {
  console.log("<<<<<<<<<<")
  console.log(req.params.courseId)
  console.log("<<<<<<<<<<")
  User
    .findByIdAndUpdate(req.params.courseId, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => {
      console.log(response)
      res.json(response)
    })
    .catch((err) => utils.handleError(err, res))
}

exports.deleteCourseById = (req, res) => {
  User
    .remove({ courseId: req.params.courseId })
    .then(response => res.json(response))
    .catch(err => utils.handleError(err, res))
}

