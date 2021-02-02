const mongoose = require('mongoose')
const udemyInstructorSchema = require('./udemyInstructor.model').schema

//Same name as Udemy API 
const udemySchema = new mongoose.Schema({
  courseId: {
    type: Number,
    default: null,
    unique: true,
    required: true
  },
  avg_rating: {
    type: Number,
    default: 0
  },
  avg_rating_recent: {
    type: Number,
    default: null
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
  image_240x135: {
    type: String,
    default: ""
  },
  image_480x270: {
    type: String,
    default: ""
  },
  is_paid: {
    type: Boolean,
    default: false
  },
  locale: {
    type: String,
    default: ""
  },
  num_lectures: {
    type: Number,
    default: null
  },
  num_subscribers: {
    type: Number,
    default: null
  },
  price: {
    type: String,
    default: ""
  },
  primary_category: {  // Object.title
    type: String,
    default: ""
  },
  primary_subcategory: { // Object.title
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
  Visible_instructors: [udemyInstructorSchema],
  content_length_video: { // In miliseconds /3600. Decimals Rule of Three to change them to minutes
    type: Number,
    default: 0
  }
})

const udemyModel = mongoose.model('udemycourse', udemySchema)
module.exports = udemyModel

// use of select:


