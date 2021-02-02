window.onload = () => {
}
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
      sessionStorage.setItem('userSearch', response.data);
      // console.log('search result ----------------------------------')
      // console.log(response.data[0])
      const searchResults = document.getElementById('search-results')
      searchResults.innerHTML = "";
      console.log('sessionStorage ----------------------------------')
      const sessionPrueba = JSON.parse(sessionStorage.getItem('userSearch'));
      console.log(sessionPrueba)
      console.log('sessionStorage ----------------------------------')

      response.data.forEach(course => {
        const courseCard = showCourseSearchResult(course._id, "https://img-b.udemycdn.com/course/125_H/406784_e588_14.jpg?secure=uz7MLCb8IVlNlSoVMCRH9w%3D%3D%2C1612350369", course.title, course.visible_instructors[0].title, course.headline)
        searchResults.innerHTML += courseCard;
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
      const courseCard = showCourseProgressCard(course._id, "https://img-b.udemycdn.com/course/125_H/406784_e588_14.jpg?secure=uz7MLCb8IVlNlSoVMCRH9w%3D%3D%2C1612350369", course.title, course.headline)
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

function showCourseProgressCard(id, img, title, headline) {
  return `
      <div id="${id}" class="card progress-card m-2" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${headline}
            </p>
            <div class="progress">
              <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
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