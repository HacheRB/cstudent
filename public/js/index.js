if (localStorage.getItem('token')) {
  window.location = "http://localhost:3000/home.html"
}


document.getElementById('register-bt').addEventListener("click", function () {
  console.log("entra en click")
  axios.post('http://localhost:3000/api/auth/register', {
    userName: document.getElementById('register_username').value,
    email: document.getElementById('register_email').value,
    password: document.getElementById('register_password').value,
  })
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('userName', response.data.userName)
      goHome()
    })
    .catch(function (error) {
      alert('Email or Username already registered!')
      window.location.assign("./index.htmgit ")
    }); git
})

document.getElementById('login').addEventListener("click", function () {
  console.log("entra en click login")
  const data = {
    email: document.getElementById('login_email').value,
    password: document.getElementById('login_password').value
  }
  axios.post('http://localhost:3000/api/auth/login', data)
    .then(function (response) {
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('userName', response.data.userName)
        goEditProfile()
      } else {
        alert('Email or Password Wrong!')
      }
    })
    .catch(function (error) {
      alert('Email or Password Wrong!')
    });
})

function goHome() {
  window.location = "http://localhost:3000/home.html"
}

function goEditProfile() {
  window.location = "http://localhost:3000/editProfile.html"
}
