document.getElementById('update-password-btn').addEventListener("click", function () {
  console.log("hola click")
  const newPassword1 = document.getElementById('new-password-1').value
  const newPassword2 = document.getElementById('new-password-1').value

  if (newPassword1 === newPassword2) {
    console.log("entra en el if password")
    console.log(localStorage.getItem('token'))
    console.log(document.getElementById('new-password-1').value)

    axios
      .put('http://localhost:3000/api/users/me/password', { password: document.getElementById('new-password-1').value }, {
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


document.getElementById('update-profile-btn').addEventListener("click", function () {
  console.log("update profile")
  const data = {
    email: document.getElementById('update-email').value,
    firstName: document.getElementById('update-first-name').value,
    lastName: document.getElementById('update-last-name').value,
    birthDate: document.getElementById('update-birthdate').value,
    location: {
      country: document.getElementById('update-country').value,
      city: document.getElementById('update-city').value
    },
    socialLinks: {
      personal: document.getElementById('social-personal').value,
      facebook: document.getElementById('social-facebook').value,
      instagram: document.getElementById('social-instagram').value,
      linkedin: document.getElementById('social-linkedin').value,
      twitter: document.getElementById('social-twitter').value,
      github: document.getElementById('social-github').value
    }
  }
  console.log(localStorage.getItem('token'))
  console.log(data)
  axios
    .put('http://localhost:3000/api/users/me/', data, {
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
)
document.getElementById('logout').addEventListener("click", function () {
  localStorage.clear();
  window.location.assign("http://localhost:3000")
})


