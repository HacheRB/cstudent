const validator = require('validator')
const axios = require('axios')
const utils = require('../utils/utils')

const CONFIG = {
  headers: {
    'Accept': process.env.UDEMYACCEPT,
    'Authorization': process.env.UDEMYAUTHORIZATION,
    'Content-Type': process.env.UDEMYCONTENTTYPE
  }, params: {
    search: "react%20native"
  },
  timeout: 5000
}


exports.getUdemyCoursesBySearchString = (req, res) => {

  console.log(...CONFIG)
  console.log(">>>>>>>>>>>>>")
  // const userSrtring = validator.escape(req.body.userSearch)
  // console.log(userSrtring)
  axios.get("https://www.udemy.com/api-2.0/courses/", CONFIG)
    .then(function (courses) {
      // console.log(courses.data)
      // res.status(200).send(courses.data)
    })
    .catch(err => utils.handleError(err, res))
}