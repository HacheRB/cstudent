function checkIfCourseExists(obj) {
  axios
    .post(`http://localhost:3000/api/udemy/`, {
      headers: { 'token': localStorage.token },
      data: {
        courseId: obj.id,
        avg_rating: obj.avg_rating,
        avg_rating_recent: obj.avg_rating_recent,
        created: obj.created,
        description: obj.description,
        headline: obj.headline,
        image_125_H: obj.image_125_H,
        is_paid: obj.is_paid,
        locale: obj.locale,
        num_lectures: obj.num_lectures,
        num_subscribers: obj.num_subscribers,
        price: obj.price,
        primary_category: obj.primary_category,
        primary_subcategory: obj_subcategory,
        title: obj.title,
        url: obj.url,
        Visible_instructors: instructors
      }
    })
    .then(course => {
      res.status(200).send(course)
    })
    .catch(error => {
      res.status(500).send(error)
    });
}


function addUdemyCourse(obj, instructors) {
  axios
    .post(`http://localhost:3000/api/udemy/`, {
      headers: { 'token': localStorage.token },
      data: {
        courseId: obj.id,
        avg_rating: obj.avg_rating,
        avg_rating_recent: obj.avg_rating_recent,
        created: obj.created,
        description: obj.description,
        headline: obj.headline,
        image_125_H: obj.image_125_H,
        is_paid: obj.is_paid,
        locale: obj.locale,
        num_lectures: obj.num_lectures,
        num_subscribers: obj.num_subscribers,
        price: obj.price,
        primary_category: obj.primary_category,
        primary_subcategory: obj_subcategory,
        title: obj.title,
        url: obj.url,
        Visible_instructors: instructors
      }
    })
    .then(course => {
      res.status(200).send(course)
    })
    .catch(error => {
      res.status(500).send(error)
    });
}


function showCourseCard(obj) {
  return `
  <!-- EXAMPLE CARD -->
      <div class="card" style="width: 18rem;">
        <img src="${obj.image_125_H}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${obj.title}</h5>
          <p class="card-text">${obj.headline}
          </p>
          <a href="#" class="btn btn-primary">Select</a>
        </div>
      </div>
      <!-- EXAMPLE CARD -->
  `
}

function showCourseProgressCard(obj) {
  return `
  <!-- EXAMPLE CARD -->
      <div class="card" style="width: 18rem;">
        <img src="{obj.image_125_H}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{obj.title}</h5>
          <p class="card-text">{obj.headline}
          </p>
          <div class="progress">
  <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
        </div>
      </div>
      <!-- EXAMPLE CARD -->
  `

}


export { checkIfCourseExists, addUdemyCourse, showCourseCard, showCourseProgressCard }