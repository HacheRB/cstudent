const fs = require('fs');
const readline = require('readline');


getUdemyCoursesBySearchString2 = (req, res) => {
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
          locale: course.locale,
          num_lectures: course.num_lectures,
          num_subscribers: course.num_subscribers,
          price: course.price,
          primary_category: course.primary_category,
          primary_subcategory: course.subcategory,
          title: course.title,
          url: course.url,
          visible_instructors: transform(course.visible_instructors),
          content_length_video: course.content_length_video
        }
      }))
    })
    .catch(err => utils.handleError(err, res))
}


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
      locale: response.data.locale,
      num_lectures: response.data.num_lectures,
      num_subscribers: response.data.num_subscribers,
      price: response.data.price,
      primary_category: response.data.primary_category,
      primary_subcategory: response.data.subcategory,
      title: response.data.title,
      url: response.data.url,
      content_length_video: response.data.content_length_video
    }
    res.status(200).json(data)
  })
  .catch(err => utils.handleError(err, res))



function writeToJson(search) {





  fs.readFile('./db_samples/udemycourses.json', (err, courses) => {
    if (err) throw err;
    let udemyCourses = JSON.parse(courses);


    let data =






      data.forEach(course => {
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
              locale: response.data.locale,
              num_lectures: response.data.num_lectures,
              num_subscribers: response.data.num_subscribers,
              price: response.data.price,
              primary_category: response.data.primary_category,
              primary_subcategory: response.data.subcategory,
              title: response.data.title,
              url: response.data.url,
              content_length_video: response.data.content_length_video
            }
            res.status(200).json(data)
          })
          .catch(err => utils.handleError(err, res))

        udemyCourses.push(udemyCourse)
      })








    udemyCourses.push(udemyCourse)




    fs.writeFile('./db_samples/udemycourses.json', JSON.stringify(udemyCourses), (err) => {
      if (err) throw err;

    })
    rl.close();
  });
}
