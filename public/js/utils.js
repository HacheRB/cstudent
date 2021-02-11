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


//UTILITY FUNCTIONS
export function escapeChars(str) {
  return (encodeURIComponent(str.trim()));
}

export function emptyStringToUndefined(field) {
  if (field === undefined || field == null || field.length <= 0) {
    return undefined
  } return field
}

export function selectColor(bool) {
  if (!bool) {
    return "currentColor"
  }
  return "red"
}

export function selectDailyStatus(bool) {
  if (!bool) {
    return ""
  }
  return "checked"
}

export function changeSecondstoHours(seconds) {
  let minutes = Math.floor(seconds / 60)
  let minutesRest = Math.floor(minutes % 60)
  let hours = (minutes - minutesRest) / 60
  if (minutesRest > 31) {
    hours++
  }
  return hours
}

export function calculateEstimatedDate(course) {
  let initialDate = new Date(course.initialDate)
  let hours = changeSecondstoHours(course.material_id.content_length_video)
  let days = hours / course.dailyEstimate
  let finalDate = new Date(course.initialDate)
  const year = initialDate.getFullYear()
  return (new Date(finalDate.setDate((initialDate).getDate() + days))).toDateString()
}

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



export function printTrackedCourses(elementId, response) {
  let coursesProgress = document.getElementById(elementId);
  coursesProgress.innerHTML = `
  <label for="user_tracking_courses">
        <h5 class="mt-3 mx-3">Tracked Courses.</h5>
      </label>
  `
  response.data.coursesProgress.forEach(course => {
    let color = selectColor(course.favorite)
    let daily = selectDailyStatus(course.daily[0].completed)
    let estimate = (calculateEstimatedDate(course))
    let emptyDiv = document.createElement('div')
    let courseCard = showCourseTrackerCard(course._id, course.material_id.image_240x135, course.material_id.title, course.dailyEstimate, course.totalProgress, estimate, color, daily)
    emptyDiv.innerHTML = (courseCard)
    coursesProgress.appendChild(emptyDiv);

    //ADD event listener for favorite btn
    document.getElementById(`favorite-course-${course._id}`).addEventListener("click", function () {
      api
        .put(`/users/me/courses/${course._id}/favorite`, {}, { headers: { 'token': localStorage.token } })
        .then(() => {
          window.location.reload()
        })
        .catch(error => {
          alert(`Daily wasn't updated`)
          console.error(error)
        })
    })

    //ADD event listener for delete
    document.getElementById(`delete-course-${course._id}`).addEventListener("click", function () {
      api
        .delete(`/users/me/courses/${course._id}`, { headers: { 'token': localStorage.token } })
        .then(() => {
          alert(`Course Deleted`)
          window.location.reload()
        })
        .catch(error => {
          alert(`Course wasn't deleted`)
          console.error(error)
        })
    })

    //ADD event listener for daily
    document.getElementById(`daily-checkbox-${course._id}`).addEventListener("click", function () {
      api
        .put(`/users/me/courses/${course._id}/daily`, {}, { headers: { 'token': localStorage.token } }
        )
        .then(() => {
          alert(`Daily Updated`)
          window.location.reload()
        })
        .catch(error => {
          alert(`Course wasn't deleted`)
          console.error(error)
        })
    })

    //ADD event listener for RESCHEDULE
    document.getElementById(`reschedule-${course._id}`).addEventListener("click", function () {
    })

  })
}


