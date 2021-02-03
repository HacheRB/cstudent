import { goEditProfile, goHome, logOut } from "./utils.js";
import { addComponent, footer, navBar, showCourseProgressCard, showCourseSearchResult } from "./components.js";

window.onload = () => {
  addComponent('navbar', navBar())
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

  let selectedCourse = null

  //Resource search
  document.getElementById('resource_search').addEventListener("click", function () {
    axios
      .get(`http://localhost:3000/api/udemyAPI?userSearch=${document.getElementById('user_udemy_search').value}`, {
        headers: { 'token': localStorage.token },
      })
      .then(response => {
        console.log(response.data[0])
        const searchResults = document.getElementById('search-results')
        searchResults.innerHTML = "";
        const slicedArray = response.data.slice(0, 4)
        slicedArray.forEach(course => {
          let courseCard = document.createElement('div')
          const courseCardFunc = showCourseSearchResult(course.courseId, course.image_240x135, course.title, course.visible_instructors[0].title, course.headline)
          courseCard.innerHTML = (courseCardFunc)
          console.log(courseCard)
          searchResults.appendChild(courseCard)
          console.log(searchResults)
          document.getElementById(`${course.courseId}`).addEventListener("click", function () {
            console.log("clickeado")
            selectedCourse = course;
            console.log(selectedCourse)
            searchResults.innerHTML = "";
          })
        })
      })
      .catch(error => {
        console.error(error)
      });
  })

  // GET USER Courses - need to improve
  axios
    .get('http://localhost:3000/api/users/me/', { headers: { token: localStorage.getItem('token') } })
    .then(response => {
      console.log(response)
      const coursesProgress = document.getElementById('users-progress');
      response.data.coursesProgress.forEach(course => {
        const courseCard = showCourseProgressCard(course.material_id._id, course.material_id.image_240x135, course.material_id.title, course.material_id.headline, course.totalProgress)
        coursesProgress.innerHTML += courseCard;
      })
    })

}




