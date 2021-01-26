const Udemy = require('../models/udemy.model')
const utils = require('../utils/utils')

exports.getAllCourses = (req, res) => {
  Udemy
    .find()
    .then(response => res.json(response))
    .catch((err) => utils.handleError(err, res))
}

exports.getCourseById = (req, res) => {
  Udemy
    .findById(req.params.courseId)
    .then(response => res.json(response))
    .catch((err) => utils.handleError(err, res))
}

exports.addCourse = (req, res) => {
  Udemy
    .create({
      //Aqui va los campos del model o le pasamos un  objeto json
    })
    .then(udemy => {
      res.status(200).json({ udemy })
    })
    .catch(err => res.status(500).json(err))
}


exports.updateCourseById = (req, res) => {
  Udemy
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
  Udemy
    .remove({ courseId: req.params.courseId })
    .then(response => res.json(response))
    .catch(err => utils.handleError(err, res))
}

