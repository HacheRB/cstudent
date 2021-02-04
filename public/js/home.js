import { checkIfUserHasCourse, escapeChars, goEditProfile, goHome, logOut, printCourses, printTrackedCourses } from "./utils.js";
import { addComponent, addCourseSearch, footer, navBar, addCourseForm, showCourseTrackerCard, showCourseProgressCard, showCourseSearchResult } from "./components.js";

window.onload = () => {
  let selectedCourse = null
  addComponent('navbar', navBar())
  addComponent('search-bar', addCourseSearch())
  addComponent('footer', footer())

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
    axios
      .get(`http://localhost:3000/api/udemyAPI?userSearch=${userSearch}`, {
        headers: { 'token': localStorage.token },
      })
      .then(response => {
        //Recorto las busquedas devueltas
        console.log(response.data[0])
        const searchResults = document.getElementById('search-results')
        const courseForm = document.getElementById('add-course-form')
        searchResults.innerHTML = "";
        courseForm.innerHTML = "";
        const slicedArray = response.data.slice(0, 4)
        //For each que imprime las tarjetas y  añade los eventlistener para cada una.
        slicedArray.forEach(course => {
          let courseCard = document.createElement('div')
          const courseCardFunc = showCourseSearchResult(course.courseId, course.image_240x135, course.title, course.visible_instructors[0].title, course.headline)
          courseCard.innerHTML = (courseCardFunc)
          searchResults.appendChild(courseCard)
          //event listener de cada tarjeta
          document.getElementById(`${course.courseId}`).addEventListener("click", function () {
            console.log("clickeado")
            selectedCourse = course;
            console.log(selectedCourse)
            searchResults.innerHTML = "";
            courseForm.innerHTML = "";
            //formulario del curso
            addComponent(`add-course-form`, addCourseForm(selectedCourse))

            document.getElementById('add-course-btn').addEventListener("click", function () {
              axios.post('http://localhost:3000/api/users/me/courses', {
                headers: { 'token': localStorage.token },
                data: {
                  courseInfo: selectedCourse,
                  initial_date: document.getElementById('input-starting-date').value,
                  hoursPerDay: document.getElementById('input-daily-progress').value
                }
              })
                .then(response => {
                  //Recargo los tracked courses
                  let userForm = document.getElementById('add-course-form')
                  console.log(userForm)
                  userForm.innerHTML = ''
                  let clearTracker = document.getElementById('users-tracking').value
                  clearTracker.innerHTML = ''
                  axios
                    .get('http://localhost:3000/api/users/me/', { headers: { token: localStorage.getItem('token') } })
                    .then(response => {
                      printTrackedCourses('users-tracking', response)
                    })
                    .catch(error => {
                      console.error(error)
                    })
                  // /Recargo los tracked courses para añadir el nuevo

                })
                .catch(error => {
                  console.log(error)
                  alert('Something failed, Course not added!')
                });
            })
          })
        })
      })
      .catch(error => {
        console.error(error)
      });
  })
}


function getUdemyCourseFull(udemyObj) {
  axios
    .get(`http://localhost:3000/api/udemyAPI/course`, {
      headers: { 'token': localStorage.token }, params: { udemyId: udemyObj.courseId }
    })
    .then(response => { })
  console.log(response)
    .catch(error => {
      console.error(error)
    })
}

function addUdemyCoursetoCollection() {
  axios
    .get(`http://localhost:3000/api/udemy/`, {
      headers: { 'token': localStorage.token }, params: { udemyId: udemyObj.courseId }
    })
    .then(response => { })
  console.log(response)

    .catch(error => {
      console.error(error)
    })
}

//no funciona
function searchUdemyCourses(elementId, response, results) {
  let courseVar = "prueba"
  let searchResults = document.getElementById(elementId)
  searchResults.innerHTML = "";
  let slicedArray = response.data.slice(0, (results))
  slicedArray.forEach(course => {
    let courseCard = document.createElement('div')
    let courseCardFunc = showCourseSearchResult(course.courseId, course.image_240x135, course.title, course.visible_instructors[0].title, course.headline)
    courseCard.innerHTML = (courseCardFunc)
    console.log(courseCard)
    searchResults.appendChild(courseCard)
    document.getElementById(`${course.courseId}`).addEventListener("click", function () {
      courseVar = course;
      searchResults.innerHTML = "";
    })
  })
  return courseVar
}


// GET USER Courses - need to improve
axios
  .get('http://localhost:3000/api/users/me/', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    console.log(response)
    printTrackedCourses('users-tracking', response)
  })
  .catch(error => {
    console.error(error)
  })

// GET USER Courses - need to improve
axios
  .get('http://localhost:3000/api/users/me/', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    printCourses('users-progress', response)
  })
  .catch(error => {
    console.error(error)
  })