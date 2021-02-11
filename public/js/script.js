import { api } from "./apiurl.js"
import { goHome, goEditProfile } from "./utils.js";
import { addComponent, footer } from "./components.js";

window.onload = () => {
  if (localStorage.getItem('token')) {
    window.location = "../home.html"
  }
  addComponent('footer', footer())
}

document.getElementById('signup').addEventListener("click", function () {
  console.log("primera entrada")
  api
    .post('/auth/register', {
      userName: document.getElementById('signup_name').value,
      email: document.getElementById('signup_email').value,
      password: document.getElementById('signup_password').value
    })
    .then(function (response) {
      console.log("segunda entrada")
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('userName', response.data.userName)
      goEditProfile()
    })
    .catch(function (error) {
      console.log(error)
      alert('User Already registered!')
    });
})

document.getElementById('login').addEventListener("click", function () {
  api.post('/auth/login', {
    email: document.getElementById('login_email').value,
    password: document.getElementById('login_password').value
  })
    .then(function (response) {
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('userName', response.data.userName)
        goHome()
      } else {
        alert('Email or Password Wrong!')
      }
    })
    .catch(function (error) {
      alert('Email or Password Wrong!')
    });
})