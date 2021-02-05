import { api } from "./apiurl.js"
import { showCourseProgressCard, showCourseTrackerCard, showCourseSearchResult } from "./components.js";

//REDIRECT FUNCTIONS

export function goHome() {
  window.location = "../home.html"
}

export function goEditProfile() {
  window.location = "../editProfile.html"
}
export function logOut() {
  localStorage.clear();
  window.location.assign("../index.html")
}

export function escapeChars(str) {
  return (encodeURIComponent(str.trim()));
}

export function emptyStringToUndefined(field) {
  if (field === undefined || field == null || field.length <= 0) {
    return undefined
  } return field
}

export function parseMongoDate(date) {
  let parsedDate = new Date(date)
  return parsedDate.toDateString()
}


export function calculateEstimate(course) {
  //Coger fecha de la ultima daily y el progreso actual

  //Restar a la duracion total el progreso actual.

  //dividir  el resultaddo(en horas) por las horas diarias

  let durationInHours = course;


}
//parse
// export function formattedDate(date) {
//   console.log(date.toString())
//   console.log(date.toISOString())
// }

export function checkIfUserHasCourse(id) {
  api
    .get(`/users/me`, {
      headers: { 'token': localStorage.token },
    }).then(response => {
      const courseExists = response.data.coursesProgress.some(obj => {
        return obj.material_id.courseId === id
      })
      return courseExists
    }).catch(error => {
      res.status(500).send(error)
    })
}

export function printCourses(elementId, response) {
  let coursesProgress = document.getElementById(elementId);
  response.data.coursesProgress.forEach(course => {
    let courseCard = showCourseProgressCard(course.material_id._id, course.material_id.image_240x135, course.material_id.title, course.material_id.headline, course.totalProgress)
    coursesProgress.innerHTML += courseCard;
  })
}
export function selectColor(bool) {
  if (!bool) {
    return "currentColor"
  }
  return "red"
}

export function printTrackedCourses(elementId, response) {
  let coursesProgress = document.getElementById(elementId);
  coursesProgress.innerHTML = `
  <label for="user_tracking_courses">
        <h5 class="mt-3 mx-3">Tracked Courses.</h5>
      </label>
  `
  response.data.coursesProgress.forEach(course => {
    console.log(course)
    let estimateDateParsed = parseMongoDate(course.estimateDate)
    let color = selectColor(course.favorite)
    let emptyDiv = document.createElement('div')
    let courseCard = showCourseTrackerCard(course._id, course.material_id.image_240x135, course.material_id.title, course.dailyEstimate, course.totalProgress, estimateDateParsed, color)
    emptyDiv.innerHTML = (courseCard)
    coursesProgress.appendChild(emptyDiv);
    //ADD event listener for favorite btn
    document.getElementById(`favorite-course-${course._id}`).addEventListener("click", function (courseId) {
      console.log(`clicked on favorite ${course._id}`)
      api
        .put(`/users/me/courses/${course._id}/favorite`, {},
          { headers: { 'token': localStorage.token } }
        )
        .then(() => {
          window.location.reload()
        })
        .catch(error => {
          alert(`Course didn't udpdate`)
          console.error(error)
        })
    })

    //ADD event listener for delete
    document.getElementById(`delete-course-${course._id}`).addEventListener("click", function (courseId) {
      console.log(`clicked on delete ${course._id}`)
      api
        .delete(`/users/me/courses/${course._id}`,
          { headers: { 'token': localStorage.token } }
        )
        .then(() => {
          alert(`Course Deleted`)
          window.location.reload()
        })
        .catch(error => {
          alert(`Course wasn't deleted`)
          console.error(error)
        })
    })

    //ADD event listener for RESCHEDULE
    document.getElementById(`reschedule-${course._id}`).addEventListener("click", function (courseId) {
      console.log(`clicked on reschedule ${courseId}`)
    })

    //ADD event listener for daily
    document.getElementById(`daily-checkbox-${course._id}`).addEventListener("click", function (courseId) {
      console.log(`clicked on dailycheckbox ${courseId}`)
    })
  })
}



function checkIfCourseExists(obj) {
  api
    .post(`/udemy/`, {
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
  api
    .post(`/udemy/`, {
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


