const Udemy = require('../models/udemy.model')
const utils = require('../utils/utils')


exports.getAllUdemyCourses = (req, res) => {
  Udemy
    .find()
    .then(udemyCourses => res.json(udemyCourses))
    .catch((err) => utils.handleError(err, res))
}

exports.getUdemyCourseByCourseId = (req, res) => {
  Udemy
    .findOne({ courseId: req.params.courseId })
    .then(udemyCourse => {
      res.json(udemyCourse)
    })
    .catch((err) => utils.handleError(err, res))
}

exports.addUdemyCourse = (req, res) => {
  Udemy
    .create(req.body)
    .then(udemyCourse => {
      res.status(200).json({ udemyCourse })
    })
    .catch(err => res.status(500).json(err))
}

exports.updateUdemyCourseByCourseId = (req, res) => {
  Udemy
    .findOneAndUpdate({ courseId: req.params.courseId }, req.body, {
      new: true,
      runValidators: true
    })
    .then(udemyCourse => {
      res.json(udemyCourse)
    })
    .catch((err) => utils.handleError(err, res))
}

exports.deleteUdemyCourseById = (req, res) => {
  Udemy
    .remove({ courseId: req.params.courseId })
    .then(udemyCourse => res.json(udemyCourse))
    .catch(err => utils.handleError(err, res))
}

