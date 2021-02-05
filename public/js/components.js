export function addComponent(fatherId, childObj) {
  const father = document.getElementById(fatherId)
  father.innerHTML = ""
  father.innerHTML = childObj
}

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
 <div id="${id}" class="card-course-bg card d-flex mt-3 mb-3 mx-1 " style="width: 15rem; height:27.5rem;">
          <img src="${img}" class="card-img-top p-1" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${author} </p>
              <p class="card-text">${headline} </p>
            </div>
  </div>`
}

// <div class="tracker-container container-md">
export function showCourseTrackerCard(_id, img, title, hours, progress, estimateCompletion, color) {
  return `<!-- track card -->
      <div class="tracker-container container-md">
        <div class=" prueba-tracker">
          <div class="card mt-3" id="card-bg">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="${img}" class="w-100 img-fluid" alt="...">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <div class="row d-flex flex-row">
                    <!-- TITLE -->
                    <div class="d-flex col-10">
                      <h4 class="card-title">${title}</h4>
                    </div>
                    <!-- /Favorite -->
                    <div class="col-2 d-flex justify-content-end">

                      <div class="d-flex justify-content-center align-items-center col-6">
                        <svg id="favorite-course-${_id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                          fill="${color}" class="bi bi-heart-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                      </div>
                      <!-- /Delete -->
                      <div class="d-flex justify-content-center align-items-center  col-6">
                        <svg id="delete-course-${_id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                          fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- RADIO -->
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="daily-checkbox-${_id}">
                    <label class="form-check-label" for="daily-checkbox-${_id}">
                      Study for ${hours} hours
                    </label>
                  </div>
                  <!-- PROGRESS -->
                  <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width:${progress}%"
                      aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                  <!-- ESTIMATE AND RESCHEDULE -->
                  <div class="row d-flex flex-row col-12 align-items-center">
                    <div class="d-flex justify-content-start">
                      <p class="card-text"><small class="text-muted">Estimated completion date :
                          ${estimateCompletion}</small>
                      </p>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button type="button"class="btn-primary rounded" id="reschedule-${_id}">Reschedule</button>
                    </div>
                  </div>
                  <!-- /ESTIMATE AND RESCHEDULE -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /trackcard -->`
}

export function showCourseProgressCard(id, img, title, headline, progress) {
  return `
      <div id="${id}" class="card-course-bg card progress-card m-2" style="width: 15rem;">
        <img src="${img}" class="card-img-top img-fluid" alt="...">
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


/* Add to HTML:
<div id="search-bar" class="container-lg search-container rounded mt-4"></div>
*/
export function addCourseSearch() {
  return `    
      <label for="user_udemy_search">
        <h5 class=" mt-3 mx-3">Add new resources.</h5>
      </label>
      <div class="input-group p-3">
        <span class="input-group-text" id="basic-addon3"><b>Udemy</b></span>
        <input type="text" class="form-control" id="user_udemy_search" name="user_udemy_search"
          aria-describedby="basic-addon3">
          <button type="button" class="btn btn-primary" id="resource_search">Add Resource</button>
        </div></div>`
}

export function addCourseForm(courseObj) {
  return `
  <div class=" d-flex justify-content-left m-3" id="course-info">
        <h5>${courseObj.title}</h5> - ${courseObj.headline}
      </div>
      <form class="row g-3 mb-3">
        <div class="col-md-4">
          <label for="input-starting-date" class="form-label">Starting Date</label>
          <input type="date" class="form-control" id="input-starting-date">
        </div>
        <div class="col-md-4">
          <label for="input-daily-progress" class="form-label">Daily Progress(hours)</label>
          <input type="string" class="form-control" id="input-daily-progress">
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <button type="button" id="add-course-btn" class="btn btn-primary">Add Course</button>
        </div>
      </form>`
}

/* Add to HTML: 
<nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-dark"></nav> 
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
    </div>`
}

/* Add to HTML:
<footer id="footer"></footer>
*/
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
  <!-- /FOOTER -->`
}