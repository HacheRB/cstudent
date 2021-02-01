window.onload = () => {
}

/*User Progress
axios
  .get('http://localhost:3000/api/users/me/courses', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    const courses = document.getElementById('user-progress-list');
    response.data.forEach(post => {
      const newPost = document.createElement('li')
      newPost.innerHTML = post.source;
      courses.appendChild(newPost)
    })
  })
  */

axios
  .get('http://localhost:3000/api/users/me/courses', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    console.log('progress bar ----------------------------------')
    console.log(response.data)
    const courses2 = document.getElementById('users-progress2');
    response.data.forEach(post => {
      console.log('for each ----------------------------------')
      console.log(post.source)
      const coursesito = showCourseProgressCard(post.material_id.image_125_H, post.material_id.title, post.material_id.headline)
      console.log(coursesito)
      const newPost2 = document.createElement("div");
      newPost2.className = "card-container d-inline-flex p-2 bd-highlight";
      newPost2.innerHTML = coursesito;
      courses2.appendChild(newPost2)
    })
  })

document.getElementById('resource_search').addEventListener("click", function () {
  axios
    .get(`http://localhost:3000/api/udemyAPI?userSearch=${document.getElementById('user_udemy_search').value}`, {
      headers: { 'token': localStorage.token },
    })
    .then(courses => {
      console.log("<<<<<<<<<<<<<<<<<<<<<<sdfsdfsdfsdf<<<<<<<<<<")
      console.log(courses.data[0])
      console.log("<<<<<<<<<<<<<<<<<<<<<<first<<<<<<<<<")
      /*
      const parsedResponse = JSON.parse(response.results)
      console.log(parsedResponse)
      console.log("<<<<<<<<<<<<<<<<<<<<<<sdfsdfsdfsdf<<<<<<<<<<")
      parsedResponse.forEach(course => {
        const courseCard = showCourseCard(course)
        newPost.innerHTML = post.title;
        searchResults.appendChild(courseCard)
      })
      */
    })
    .catch(error => {
      console.error(error)
    });
})

document.getElementById('logout').addEventListener("click", function () {
  localStorage.clear();
  window.location.assign("http://localhost:3000")
})



function showCourseProgressCard(img, title, headline) {
  return `
  <!-- EXAMPLE CARD -->
      <div class="card progress-card" style="width: 18rem;">
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
      <!-- EXAMPLE CARD -->
  `

}