const validator = require('validator')
const axios = require('axios')
const utils = require('../utils/utils')

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
      console.log(courses.data.results)
      res.status(200).json(courses.data.results)
    })
    .catch(err => utils.handleError(err, res))
}


exports.getUdemyCoursesBySearchString2 = (req, res) => {
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
      const mapped = []
      courses.data.map(obj => {
        const instructors = []
        obj.Visible_instructors.map(instructor => {
          instructors.push({
            title: instructor.title,
            name: instructor.name,
            display_name: instructor.display_name,
            job_title: instructor.job_title,
            image_50x50: instructor.image_50x50,
            image_100x100: instructor.image_100x100,
            initials: instructor.initials,
            url: instructor.url,
          })
        })
        mapped.push({
          courseId: obj.id,
          avg_rating: obj.avg_rating,
          avg_rating_recent: obj.avg_rating_recent,
          created: obj.created,
          description: obj.description,
          headline: obj.headline,
          image_125_H: obj.image_125_H,
          is_paid: obj.is_paid,
          locale: obj.locale,
          num_lectures: obj.num_lectures,
          num_subscribers: obj.num_subscribers,
          price: obj.price,
          primary_category: obj.primary_category,
          primary_subcategory: obj_subcategory,
          title: obj.title,
          url: obj.url,
          Visible_instructors: instructors
        })
      })
      res.status(200).json(mapped)
      next()
    })
    .catch(err => utils.handleError(err, res))
}

