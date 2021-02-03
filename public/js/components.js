export function addCourseStatus(status) {
  return `<h2>${status}</h2>
  `
}

export function showMore(redirect) {
  return `
  <ul class="nav d-flex justify-content-center mb-1">
      <li class="nav-item">
        <a class="nav-link text-white" aria-current="page" href="${redirect}">Show more</a>
      </li>
      </ul>`
}

export function showCourseSearchResult(id, img, title, author, headline) {
  return `
 <div id="${id}" class="card d-flex" style="width: 15rem;">
          <img src="${img}" class="card-img-top p-1" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${author} </p>
              <p class="card-text">${headline} </p>
            </div>
  </div>`
}

export function showCourseProgressCard(id, img, title, headline, progress) {
  return `
      <div id="${id}" class="card progress-card m-2" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${headline}
            </p>
            <div class="progress">
              <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
      </div>
  `
}

export function addComponent(fatherId, childObj) {
  const father = document.getElementById(fatherId)
  father.innerHTML = ""
  father.innerHTML = childObj
}

/* Add<nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-dark">
</nav> to HTML
*/
export function navBar() {
  return `
    <div class="container-fluid ">
      <a class="navbar-brand text-white px-3" id="home-bt" href="#">CStudent</a>
      <ul class="navbar-nav d-flex justify-content-end flex-row pe-3">
        <a class="nav-link active text-white pe-4" aria-current="page" href="#">Tracker</a>
        <!-- PROFILE -->
        <a class="nav-link text-white pe-4" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg></a>
        <!-- /PROFILE -->
        <!-- /OPTIONS -->
        <li class="nav-item dropdown pe-4">
          <a class="nav-link dropdown-toggle text-white " href="#" id="navbarDropdownMenuLink" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill"
              viewBox="0 0 16 16">
              <path
                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" id="loggedUser" href="#">Logged in as userName</a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" id="editProfile" href="#">Edit Profile</a></li>
            <li><a class="dropdown-item" id="logout" href="#">Log out</a></li>
          </ul>
        </li>
        <!-- /OPTIONS -->
      </ul>
    </div>  
    `
}

// Add <footer id="footer"></footer> to HTML
export function footer() {
  return `  
  <!-- FOOTER -->
    <ul class="nav d-flex justify-content-center mb-1">
      <li class="nav-item">
        <a class="nav-link text-white" aria-current="page" href="#">Terms of Use</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#">Help</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#">Cookies</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#">Privacy</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#">Contact</a>
      </li>
    </ul>
  <!-- /FOOTER -->
  `
}