const components = require('./components')
window.onload = () => {
}

const selectedCourse = null
//Resource search
document.getElementById('resource_search').addEventListener("click", function () {
  if (sessionStorage.getItem('userSearch')) {
    sessionStorage.removeItem('userSearch');
  }
  axios
    .get(`http://localhost:3000/api/udemyAPI?userSearch=${document.getElementById('user_udemy_search').value}`, {
      headers: { 'token': localStorage.token },
    })
    .then(response => {
      console.log(response.data[0])
      const searchResults = document.getElementById('search-results')
      searchResults.innerHTML = "";


      response.data.forEach(course => {
        const courseCard = showCourseSearchResult(course.courseId, "https://img-b.udemycdn.com/course/125_H/406784_e588_14.jpg?secure=uz7MLCb8IVlNlSoVMCRH9w%3D%3D%2C1612350369", course.title, course.visible_instructors[0].title, course.headline)
        searchResults.innerHTML += courseCard;
        console.log(course.courseId)
        document.getElementById(`${course.courseId}`).addEventListener("click", function () {
          console.log("clickeado")
          selectedCourse = course;
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
  .get('http://localhost:3000/api/users/me/courses', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    const coursesProgress = document.getElementById('users-progress');
    response.data.forEach(course => {
      console.log(course)
      const courseCard = showCourseProgressCard(course.material_id._id, course.material_id.image_240x135, course.material_id.title, course.material_id.headline, course.totalProgress)
      coursesProgress.innerHTML += courseCard;
    })
  })

document.getElementById('logout').addEventListener("click", function () {
  localStorage.clear();
  window.location.assign("http://localhost:3000")
})


//FUNCTIONS

function addCourseStatus(status) {
  return `<h2>${status}</h2>
  `
}

function showMore(redirect) {
  return `
  <ul class="nav d-flex justify-content-center mb-1">
      <li class="nav-item">
        <a class="nav-link text-white" aria-current="page" href="${redirect}">Show more</a>
      </li>
      </ul>`
}

function showCourseProgressCard(id, img, title, headline, progress) {
  return `
      <div id="${id}" class="card progress-card m-2" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${headline}
            </p>
            <div class="progress">
              <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
      </div>
  `
}

function showCourseSearchResult(id, img, title, author, headline) {
  return `
 <div id="${id}" class="card d-flex" style="width: 18rem;">
          <img src="${img}" class="card-img-top p-1" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${author} </p>
              <p class="card-text">${headline} </p>
            </div>
  </div>`
}