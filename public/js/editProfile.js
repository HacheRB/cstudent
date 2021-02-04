import { api } from "./apiurl.js"
import { emptyStringToUndefined, goEditProfile, goHome, logOut } from "./utils.js";
import { addComponent, footer, navBar } from "./components.js";

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
}

document.getElementById('update-password-btn').addEventListener("click", function () {
  console.log("hola click")
  const newPassword1 = document.getElementById('new-password-1').value
  const newPassword2 = document.getElementById('new-password-1').value
  if (newPassword1 === newPassword2) {
    console.log("entra en el if password")
    console.log(localStorage.getItem('token'))
    console.log(document.getElementById('new-password-1').value)
    api
      .put('/users/me/password', { password: document.getElementById('new-password-1').value }, {
        headers: { token: localStorage.getItem('token') },
      })
      .then(response => {
        alert(response.data)
      })
      .catch(error => {
        alert('Something went wrong!')
        console.error(error)
      })
  }
  else {
    alert(`New Password doesn't match`)
  }
})
//No Funciona
document.getElementById('update-profile-btn').addEventListener("click", function () {
  console.log("update profile")
  const data = {
    email: emptyStringToUndefined(document.getElementById('update-email').value),
    firstName: emptyStringToUndefined(document.getElementById('update-first-name').value),
    lastName: emptyStringToUndefined(document.getElementById('update-last-name').value),
    birthDate: emptyStringToUndefined(document.getElementById('update-birthdate').value),
    location: {
      country: emptyStringToUndefined(document.getElementById('update-country').value),
      city: emptyStringToUndefined(document.getElementById('update-city').value)
    },
    socialLinks: {
      personal: emptyStringToUndefined(document.getElementById('social-personal').value),
      facebook: emptyStringToUndefined(document.getElementById('social-facebook').value),
      instagram: emptyStringToUndefined(document.getElementById('social-instagram').value),
      linkedin: emptyStringToUndefined(document.getElementById('social-linkedin').value),
      twitter: emptyStringToUndefined(document.getElementById('social-twitter').value),
      github: emptyStringToUndefined(document.getElementById('social-github').value)
    }
  }
  console.log(data)
  api
    .put('/users/me/', data, {
      headers: { token: localStorage.getItem('token') },
    })
    .then(response => {
      console.log(response)
      alert(response.data)
    })
    .catch(error => {
      alert('Something went wrong!')
      console.error(error)
    })
}
)


