import { api } from "./apiurl.js"
import { checkIfUserHasCourse, escapeChars, goEditProfile, goHome, logOut, printCourses, printTrackedCourses } from "./utils.js";
import { addComponent, addCourseSearch, footer, navBar, addCourseForm, showCourseTrackerCard, showCourseProgressCard, showCourseSearchResult } from "./components.js";

window.onload = () => {
  let selectedCourse = null
  addComponent('navbar', navBar())
  addComponent('search-bar', addCourseSearch())
  addComponent('footer', footer())

  //Tracker in navbar
  document.getElementById('tracker-btn').addEventListener("click", function () {
    goHome()
  })

  //Username in navbar
  const userName = (localStorage.getItem('userName'))
  const loggedUser = document.getElementById('loggedUser')
  loggedUser.innerHTML = `Logged in as ${userName} `
  //Home redirect
  document.getElementById('home-bt').addEventListener("click", function () {
    goHome()
  })
  //Edit Profile redirect
  document.getElementById('editProfile').addEventListener("click", function () {
    goEditProfile()
  })
  document.getElementById('logout').addEventListener("click", logOut)


  //churro abominable
  //Resource search
  document.getElementById('resource_search').addEventListener("click", function () {
    let userSearch = escapeChars(document.getElementById('user_udemy_search').value)
    api
      .get(`/udemyAPI?userSearch=${userSearch}`, {
        headers: { 'token': localStorage.token },
      })
      .then(response => {
        //Recorto las busquedas devueltas
        const searchResults = document.getElementById('search-results')
        const courseForm = document.getElementById('add-course-form')
        searchResults.innerHTML = "";
        courseForm.innerHTML = "";
        const slicedArray = response.data.slice(0, 5)
        //For each que imprime las tarjetas y  añade los eventlistener para cada una.
        slicedArray.forEach(course => {
          let courseCard = document.createElement('div')
          const courseCardFunc = showCourseSearchResult(course.courseId, course.image_240x135, course.title, course.visible_instructors[0].title, course.headline)
          courseCard.innerHTML = (courseCardFunc)
          searchResults.appendChild(courseCard)
          //event listener de cada tarjeta
          document.getElementById(`${course.courseId}`).addEventListener("click", function () {
            selectedCourse = course;
            searchResults.innerHTML = "";
            courseForm.innerHTML = "";
            //formulario del curso
            addComponent(`add-course-form`, addCourseForm(selectedCourse))

            document.getElementById('add-course-btn').addEventListener("click", function () {
              api
                .post('/users/me/courses',
                  {
                    courseInfo: selectedCourse,
                    initial_date: document.getElementById('input-starting-date').value,
                    hoursPerDay: document.getElementById('input-daily-progress').value
                  },
                  { headers: { 'token': localStorage.token } }
                )
              window.location.reload()
            })
          })
        })
      })
      .catch(error => {
        console.error(error)
      });
  })
}

// GET USER TRACKED PROGRESS - need to improve
api
  .get('/users/me/', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    printTrackedCourses('users-tracking', response)
  })
  .catch(error => {
    console.error(error)
  })

// GET USER Courses - need to improve
api
  .get('/users/me/', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    printCourses('users-progress', response)
  })
  .catch(error => {
    console.error(error)
  })

