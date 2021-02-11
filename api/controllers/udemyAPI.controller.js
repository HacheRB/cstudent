const validator = require('validator')
const axios = require('axios')
const utils = require('../utils/utils')

function transform(instructors) {
  return instructors.map(instructor => {
    return {
      title: instructor.title,
      name: instructor.name,
      display_name: instructor.display_name,
      job_title: instructor.job_title,
      image_50x50: instructor.image_50x50,
      image_100x100: instructor.image_100x100,
      initials: instructor.initials,
      url: instructor.url
    }
  })
}

exports.getUdemyCoursesBySearchString = (req, res) => {
  const userString = req.query.userSearch
  axios.get("https://www.udemy.com/api-2.0/courses/", {
    headers: {
      'Accept': process.env.UDEMYACCEPT,
      'Authorization': process.env.UDEMYAUTHORIZATION,
      'Content-Type': process.env.UDEMYCONTENTTYPE
    }, params: {
      search: userString
    },
    timeout: 5000
  })
    .then(courses => {
      res.status(200).json(courses.data.results)
    })
    .catch(err => utils.handleError(err, res))
}

exports.getUdemyCoursesBySearchString2 = (req, res) => {
  let fields = 'fields[course]'
  const userString = req.query.userSearch
  axios.get("https://www.udemy.com/api-2.0/courses/", {
    headers: {
      'Accept': process.env.UDEMYACCEPT,
      'Authorization': process.env.UDEMYAUTHORIZATION,
      'Content-Type': process.env.UDEMYCONTENTTYPE
    }, params: {
      search: userString,
      ordering: "relevance",
      [fields]: "@all"
    },
    timeout: 10000
  })
    .then(response => {
      res.status(200).json(response.data.results.map(course => {
        return {
          courseId: course.id,
          avg_rating: course.avg_rating,
          avg_rating_recent: course.avg_rating_recent,
          created: course.created,
          description: course.description,
          headline: course.headline,
          image_240x135: course.image_240x135,
          image_480x270: course.image_480x270,
          is_paid: course.is_paid,
          num_lectures: course.num_lectures,
          num_subscribers: course.num_subscribers,
          price: course.price,
          primary_category: course.primary_category.title,
          title: course.title,
          url: course.url,
          visible_instructors: transform(course.visible_instructors),
          content_length_video: course.content_length_video
        }
      }))
    })
    .catch(err => utils.handleError(err, res))
}

exports.getUdemyCourseById = (req, res) => {
  axios.get(`https://www.udemy.com/api-2.0/courses/${req.query.udemyId}/?fields[course]=@all`, {
    headers: {
      'Accept': process.env.UDEMYACCEPT,
      'Authorization': process.env.UDEMYAUTHORIZATION,
      'Content-Type': process.env.UDEMYCONTENTTYPE
    },
    timeout: 5000
  })
    .then(response => {
      let data = {
        courseId: response.data.id,
        avg_rating: response.data.avg_rating,
        avg_rating_recent: response.data.avg_rating_recent,
        created: response.data.created,
        description: response.data.description,
        headline: response.data.headline,
        image_240x135: response.data.image_240x135,
        image_480x270: response.data.image_480x270,
        is_paid: response.data.is_paid,
        num_lectures: response.data.num_lectures,
        num_subscribers: response.data.num_subscribers,
        price: response.data.price,
        primary_category: response.data.primary_category.title,
        title: response.data.title,
        url: response.data.url,
        content_length_video: response.data.content_length_video
      }
      res.status(200).json(data)
    })
    .catch(err => utils.handleError(err, res))
}