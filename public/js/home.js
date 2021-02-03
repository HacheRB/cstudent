import { checkIfUserHasCourse, escapeChars, goEditProfile, goHome, logOut, printCourses, searchUdemyCourses } from "./utils.js";
import { addComponent, addCourseSearch, footer, navBar, addCourseForm, showCourseProgressCard, showCourseSearchResult } from "./components.js";

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
            /*
            console.log(checkIfUserHasCourse(selectedCourse.courseId))
            if (checkIfUserHasCourse(selectedCourse)) {
              console.log("holaaaaa")
            }
*/
            searchResults.innerHTML = "";
            courseForm.innerHTML = "";
            //formulario del curso
            addComponent(`add-course-form`, addCourseForm(selectedCourse))
            //event listener del curso
            document.getElementById(`add-course-form`).addEventListener("click", function () {
            })

          })
        })
      })
      .catch(error => {
        console.error(error)
      });
  })
}





// GET USER Courses - need to improve
axios
  .get('http://localhost:3000/api/users/me/', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    printCourses('users-progress', response)
  })
  .catch(error => {
    console.error(error)
  })