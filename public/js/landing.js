document.getElementById('signup').addEventListener("click", function () {
  axios.post('http://localhost:3000/api/auth/signup', {
    name: document.getElementById('signup_name').value,
    email: document.getElementById('signup_email').value,
    password: document.getElementById('signup_password').value
  })
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('name', response.data.name)
      goHome()
    })
    .catch(function (error) {
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
        localStorage.setItem('name', response.data.name)
        goHome()
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
