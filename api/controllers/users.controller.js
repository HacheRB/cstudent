const bcrypt = require('bcrypt')
const User = require('../models/users.model')
const utils = require('../utils/utils')
const validator = require('validator');

exports.getAllUsers = (req, res) => {
  User
    .find()
    .then(users => res.json(users))
    .catch((err) => utils.handleError(err, res))
}

exports.getUserProfile = (req, res) => {
  console.log(res.locals.user._id)
  User
    .findById(res.locals.user._id)
    .populate({ path: 'coursesProgress.material_id', 'model': 'udemycourse' })
    .then(user => {
      console.log(user)
      res.json(user)
    })
    .catch(err => utils.handleError(err, res))
}

function getUserCoursesPublicData(coursesProgress) {
  return coursesProgress.map(course => {
    return {
      material_id: course.material_id,
      totalProgress: course.totalProgress,
      status: course.status,
      favorite: course.favorite
    }
  })
}

exports.getUserByUserName = (req, res) => {  //need to retrieve only some data
  User
    .findOne({ userName: req.params.userName })
    .populate({ path: 'coursesProgress.material_id', 'model': 'udemycourse' })
    // not sure if params or body
    .then(response => {
      const user = {
        avatar: response.avatar,
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        location: {
          city: response.location.city, country: response.location.country
        },
        socialLinks: {
          personal: response.socialLinks.personal,
          facebook: response.socialLinks.facebook,
          instagram: response.socialLinks.instagram,
          linkedin: response.socialLinks.linkedin,
          twitter: response.socialLinks.twitter,
          github: response.socialLinks.github
        },
        coursesProgress: getUserCoursesPublicData(response.coursesProgress)
      }
      res.status(200).json(user)
    })
    .catch((err) => utils.handleError(err, res))
}

exports.addCourseProgress = (req, res) => {
  User
    .findById(res.locals.user._id)
    .then(userCourse => {
      userCourse.coursesProgress.push(req.body)
      userCourse.save((function (err) {
        if (err) throw err;
        res.send('Course saved.');
      })
      )
    })
    .catch(err => utils.handleError(err, res))
}

exports.updateUser = (req, res) => {
  console.log("req body <<<<<<<<<<<<<<<<<<<<<")
  console.log(req.body)
  console.log("req body <<<<<<<<<<<<<<<<<<<<<")

  User
    .findByIdAndUpdate(res.locals.user.id, req.body, {
      new: true,
      runValidators: true,
      omitUndefined: true
    })
    .then(user => {
      res.send(`Congratulations ${user.userName}, your profile was updated`)
    })
    .catch((err) => utils.handleError(err, res))
}

//Problemas con esto
exports.updateCourseProgress = (req, res) => {
  console.log(res.locals.user._id)
  User
    .findById(res.locals.user._id)
    .then(user => {
      console.log(user)
      let index = user.coursesProgress.findIndex(x => x._id === req.query.params.id);
      if (!req.body.initialDate === null && !req.body.initialDate === "") {
        user.coursesProgress[index].initialDate = req.body.initialDate
      }
      if (!req.body.dailyEstimate === null && !req.body.dailyEstimate === "") {
        user.coursesProgress[index].dailyEstimate = req.body.dailyEstimate
      }
      if (!req.body.totalProgress === null && !req.body.totalProgress === "") {
        user.coursesProgress[index].totalProgress = req.body.totalProgress
      }
      if (!req.body.estimateDate === null && !req.body.estimateDate === "") {
        user.coursesProgress[index].estimateDate = req.body.estimateDate
      }
      if (!req.body.status === null && !req.body.status === "") {
        user.coursesProgress[index].status = req.body.status
      }
      if (!req.body.favorite === null && !req.body.favorite === "") {
        user.coursesProgress[index].favorite = req.body.favorite
      }
      user.save()
    })
    .catch(err => utils.handleError(err, res))
}

exports.updatePassword = (req, res) => {
  if (req.body && req.body.password) {
    const password = bcrypt.hashSync(req.body.password, 10)
    User
      .findByIdAndUpdate(res.locals.user.id, { password: password }, {
        runValidators: true
      })
      .then(user => {
        res.send(`Congratulations ${user.userName}, your password was updated`)
      })
      .catch((err) => utils.handleError(err, res))
  }
}

exports.deleteUserById = (req, res) => {
  User
    .remove({ _id: res.locals.user.id })
    .then(response => res.json(response))
    .catch(err => utils.handleError(err, res))
}

exports.deleteUserCourseById = (req, res) => {
  User
    .findById(res.locals.user._id)
    .then(user => {
      console.log("1")
      const course = user.coursesProgress.id(req.params.id)
      console.log(course)

      course.remove()
      user.save((function (err) {
        if (err) throw err;
        res.send('Course deleted.');
      }))

    })
    .catch(err => utils.handleError(err, res))
}
