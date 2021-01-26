const mongoose = require('mongoose')

const udemyInstructorSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: ""
  },
  name: {
    type: String,
    trim: true,
    default: ""
  },
  display_name: {
    type: String,
    trim: true,
    default: ""
  },
  job_title: {
    type: String,
    trim: true,
    default: ""
  },
  image_50x50: {
    type: String,
    trim: true,
    default: ""
  },
  image_100x100: {
    type: String,
    trim: true,
    default: ""
  },
  initials: {
    type: String,
    trim: true,
    default: ""
  },
  url: {
    type: String,
    trim: true,
    default: ""
  },
})

const udemyInstructorModel = mongoose.model('udemyInstructor', udemyInstructorSchema)
module.exports = udemyInstructorModel