const bcrypt = require('bcrypt')
const User = require('../models/users.model')
const utils = require('../utils/utils')
const Udemy = require('../models/udemy.model')
const validator = require('validator');

exports.getAllUsers = (req, res) => {
  User
    .find()
    .then(users => res.json(users))
    .catch((err) => utils.handleError(err, res))
}

exports.getUserProfile = (req, res) => {
  User
    .findById(res.locals.user._id)
    .populate({ path: 'coursesProgress.material_id', 'model': 'udemycourse' })
    .then(user => {
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

async function getUdemyCourseById(req, res) {
  try {
    const udemyCourse = await Udemy.findOne({ courseId: req.body.courseInfo.courseId })
    if (udemyCourse) { return udemyCourse }
    return false
  }
  catch (err) { console.error(err) }
}

async function updateUdemyCourse(req, res) {
  try {
    const udemyCourse = await Udemy.findOneAndUpdate({ courseId: req.body.courseInfo.courseId }, req.body.courseInfo, {
      new: true,
      runValidators: true
    })
    return udemyCourse
  }
  catch (err) { console.error(err) }
}

async function addUdemyCourse2(req, res) {
  try { return await Udemy.create(req.body.courseInfo) }
  catch (err) { console.error(err) }
}

async function addCourseProgress2(req, res, udemyLocalId) {
  try {
    const user = await User.findById(res.locals.user._id)
    let courseObj = user.coursesProgress.filter(course => JSON.stringify(course.material_id) === JSON.stringify(udemyLocalId))
    if (courseObj.length === 0) {
      user.coursesProgress.push(
        {
          material_id: udemyLocalId,
          initialDate: req.body.initial_date,
          dailyEstimate: req.body.hoursPerDay,
          daily: [{
            date: new Date(),
            completed: false,
            dailyProgress: req.body.hoursPerDay,
            estimatedProgress: req.body.hoursPerDay
          }]
        })
      await user.save((function (err) {
        if (err) throw err;
      }))
      return user.coursesProgress[user.coursesProgress.length - 1]
    }
  }
  catch (err) { console.error(err) }
}

//separar en el refactor
async function addDailyTask2(req, res, courseProgress) {
  try {
  }
  catch (err) { console.error(err) }
}

exports.addCourseProgress = async (req, res) => {
  let udemyCourse = await getUdemyCourseById(req, res)
  if (udemyCourse) {
    udemyCourse = await updateUdemyCourse(req, res)
  } else {
    udemyCourse = await addUdemyCourse2(req, res)
  }
  let lastCourseProgress = await addCourseProgress2(req, res, udemyCourse._id)
  console.log(lastCourseProgress)
}

exports.updateUser = (req, res) => {

  let country = req.body.location.country || res.locals.user.location.country
  let city = req.body.location.city || res.locals.user.location.city
  let personal = req.body.socialLinks.personal || res.locals.user.socialLinks.personal
  let facebook = req.body.socialLinks.facebook || res.locals.user.socialLinks.facebook
  let instagram = req.body.socialLinks.instagram || res.locals.user.socialLinks.instagram
  let linkedin = req.body.socialLinks.linkedin || res.locals.user.socialLinks.linkedin
  let twitter = req.body.socialLinks.twitter || res.locals.user.socialLinks.twitter
  let github = req.body.socialLinks.github || res.locals.user.socialLinks.github

  User
    .findByIdAndUpdate(res.locals.user.id,
      {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        location: {
          country: country,
          city: city
        },
        socialLinks: {
          personal: personal,
          facebook: facebook,
          instagram: instagram,
          linkedin: linkedin,
          twitter: twitter,
          github: github
        }
      },
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      })
    .then(user => {
      res.send(`Congratulations ${user.userName}, your profile was updated`)
    })
    .catch((err) => utils.handleError(err, res))
}

exports.addDailyTask = (req, res) => {
  console.log("entra en add daily")
  User
    .findById(res.locals.user._id)
    .then(user => {
      const course = user.coursesProgress.id(req.params.id)
      console.log(course.daily)
      user.save((function (err) {
        if (err) throw err;
        res.send('Course favorite updated');
      }))
    })
    .catch(err => utils.handleError(err, res))
}

exports.updateDailyTask = (req, res) => {
  console.log("entra en update daily")
  User
    .findById(res.locals.user._id)
    .then(user => {
      const course = user.coursesProgress.id(req.params.id)
      course.daily[0].completed = !course.daily[0].completed
      user.save((function (err) {
        if (err) throw err;
        res.send(course.daily[0]);
      }))
    })
    .catch(err => utils.handleError(err, res))
}

exports.updateCourseFavorite = (req, res) => {
  console.log("entra en update course")
  User
    .findById(res.locals.user._id)
    .then(user => {
      const course = user.coursesProgress.id(req.params.id)
      course.favorite = !course.favorite
      user.save((function (err) {
        if (err) throw err;
        res.send(course);
      }))

    })
    .catch(err => utils.handleError(err, res))
}

//Problemas con esto
exports.updateCourseProgress = (req, res) => {
  User
    .findById(res.locals.user._id)
    .then(user => {
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
      const course = user.coursesProgress.id(req.params.id)
      console.log("que hay ern course ", course)
      course.remove()
      user.save((function (err) {
        if (err) throw err;
        res.send('Course deleted.');
      }))

    })
    .catch(err => utils.handleError(err, res))
}
