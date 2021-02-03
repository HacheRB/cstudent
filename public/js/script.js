import { goHome, goEditProfile } from "./utils.js";
import { addComponent, footer } from "./components.js";

window.onload = () => {
  addComponent('footer', footer())
}

document.getElementById('signup').addEventListener("click", function () {
  console.log("primera entrada")
  axios.post('http://localhost:3000/api/auth/register', {
    userName: document.getElementById('signup_name').value,
    email: document.getElementById('signup_email').value,
    password: document.getElementById('signup_password').value
  })
    .then(function (response) {
      console.log("segunda entrada")
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('name', response.data.userName)
      goEditProfile()
    })
    .catch(function (error) {
      console.log(error)
      alert('User Already registered!')
    });
})

document.getElementById('login').addEventListener("click", function () {
  axios.post('http://localhost:3000/api/auth/login', {
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