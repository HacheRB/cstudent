const mongoose = require('mongoose')

//Names are currently like udemy API, needs to be changed to camelCase.

const udemySchema = new mongoose.Schema({
  courseId: {
    type: String,
    default: ""
  },
  avg_rating: {
    type: Number,
    default: NaN
  },
  avg_rating_recent: {
    type: Number,
    default: NaN
  },
  created: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  headline: {
    type: String,
    default: ""
  },
  image_125_H: {
    type: String,
    default: ""
  },
  is_paid: {
    type: Boolean,
    default: ""
  },
  locale: {
    type: String,
    default: ""
  },
  num_lectures: {
    type: Number,
    default: NaN
  },
  num_subscribers: {
    type: Number,
    default: NaN
  },
  price: {
    type: String,
    default: ""
  },
  primary_category: {  // Object.title
    type: String,
    default: ""
  },
  pprimary_subcategory: { // Object.title
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: ""
  },
  Visible_instructors: {  //Object with info about instructors. PENDIENTE
    type: Array
  },
  content_length_video: { // In miliseconds /3600. Decimals Rule of Three to change them to minutes
    type: Number,
    default: 0
  }
})

const udemyModel = mongoose.model('udemy', udemySchema)
module.exports = udemyModel

// use of select:


