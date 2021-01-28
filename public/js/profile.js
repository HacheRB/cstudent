document.getElementById('logout').addEventListener("click", function () {
  localStorage.clear();
  window.location.assign("./index.html")
  //window.location.reload()
})

function retrieveUserName() {

  return localStorage.getItem('name');
}