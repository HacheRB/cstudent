//REDIRECT FUNCTIONS

export function goHome() {
  window.location = "http://localhost:3000/home.html"
}

export function goEditProfile() {
  window.location = "http://localhost:3000/editProfile.html"
}
export function logOut() {
  localStorage.clear();
  window.location.assign("http://localhost:3000")
}

export function emptyStringToUndefined(field) {
  if (field === "" || field === null) {
    return undefined
  } return field
}

function checkIfCourseExists(obj) {
  axios
    .post(`http://localhost:3000/api/udemy/`, {
      headers: { 'token': localStorage.token },
      data: {
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
      }
    })
    .then(course => {
      res.status(200).send(course)
    })
    .catch(error => {
      res.status(500).send(error)
    });
}


function addUdemyCourse(obj, instructors) {
  axios
    .post(`http://localhost:3000/api/udemy/`, {
      headers: { 'token': localStorage.token },
      data: {
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
      }
    })
    .then(course => {
      res.status(200).send(course)
    })
    .catch(error => {
      res.status(500).send(error)
    });
}


