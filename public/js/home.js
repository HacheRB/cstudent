/*
axios
  .get('http://localhost:3000/api/posts', { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    const posts = document.getElementById('posts');
    response.data.forEach(post => {
      const newPost = document.createElement('li')
      newPost.innerHTML = post.title;
      posts.appendChild(newPost)
    })
  })

document.getElementById('logout').addEventListener("click", function () {
  localStorage.clear();
  window.location.reload()
})

DEFAULT */

const searchResults = document.getElementById("search_results");
window.onload = () => { }

document.getElementById('resource_search').addEventListener("click", function () {
  console.log("hola")
  axios
    .get(`http://localhost:3000/api/udemyAPI?userSearch=${document.getElementById('user_string_search').value}`, {
      headers: { 'token': localStorage.token },
    })
    .then(res => {
      console.log(res)
      res.data.forEach(course => {
        searchResults.appendChild = `<li>${course.title}</li>`
      })
    })
    .catch(error => {
      console.log(error) //Cambiar alerta
      //window.location.assign("./home.html")
    });
})

document.getElementById('logout').addEventListener("click", function () {
  localStorage.clear();
  window.location.assign("http://localhost:3000")
})

