const bcrypt = require('bcrypt')
const User = require('../models/users.model')
const utils = require('../utils/utils')

exports.getAllUsers = (req, res) => {
  User
    .find()
    .then(users => res.json(users))
    .catch((err) => utils.handleError(err, res))
}

exports.getUserProfile = (req, res) => {
  User
    .findById(res.locals.user._id)
    .then(user => res.json(user))
    .catch(err => utils.handleError(err, res))
}

exports.getUserCourses = (req, res) => {
  console.log(res.locals.user._id)
  User
    .findById(res.locals.user._id)
    .then(user => {
      console.log(user.courseProgress)
      res.json(user.coursesProgress)
    })
    .catch(err => utils.handleError(err, res))
}

exports.getUserByUserName = (req, res) => {  //need to retrieve only some data
  User
    .findOne({ userName: req.params.userName }) // not sure if params or body
    .then(user => {
      console.log("<<<<<<<")
      console.log(user.avatar)
      console.log("<<<<<<<")
      res.status(200).json(user)
      /*
      {
      avatar: user.avatar,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      socialLinks: {
        personal: user.socialLinks.personal,
        facebook: user.socialLinks.facebook,
        instagram: user.socialLinks.instagram,
        linkedin: user.socialLinks.linkedin,
        twitter: user.socialLinks.twitter,
        github: user.socialLinks.github
      },
      location: {
        city: user.location.city,
        country: user.location.country
      }
    }*/
    })
    .catch((err) => utils.handleError(err, res))
}

exports.getUserCoursesByUserName = (req, res) => {  //need to retrieve only some data
  User
    .findOne({ userName: req.params.userName })
    // not sure if params or body
    .then(userCourses => {
      console.log(userCourses)
      res.json(userCourses)
      /*
      {
      source: userCourses.coursesProgress.source,
      material_id: userCourses.coursesProgress.material_id,
      initialDate: userCourses.coursesProgress.initialDate,
      totalProgress: userCourses.coursesProgress.totalProgress,
      status: userCourses.coursesProgress.status,
      favorite: userCourses.coursesProgress.favorite
    }*/
    }) //solo devolver algunos datos
    .catch((err) => utils.handleError(err, res))
}

exports.addCourseProgress = (req, res) => {
  User
    .findById(res.locals.user._id)
    .then(userCourse => {
      userCourse.coursesProgress.push(req.body)
      userCourse.save()
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
      runValidators: true
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
    .then(userCourse => {
      userCourse.coursesProgress.push(req.body)
      userCourse.save()
    })
    .catch(err => utils.handleError(err, res))
}

/*
*/

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
      const course = user.coursesProgress.id(req.params.id)
      console.log(course)
      course.remove()
      user.save()
    })
    .catch(err => utils.handleError(err, res))
}
