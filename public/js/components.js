exports.addCourseStatus = (status) => {
  return `<h2>${status}</h2>
  `
}

exports.showMore = (redirect) => {
  return `
  <ul class="nav d-flex justify-content-center mb-1">
      <li class="nav-item">
        <a class="nav-link text-white" aria-current="page" href="${redirect}">Show more</a>
      </li>
      </ul>`
}

exports.showCourseProgressCard = (id, img, title, headline, progress) => {
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

exports.showCourseSearchResult = (id, img, title, author, headline) => {
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
