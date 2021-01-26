const mongoose = require('mongoose')
const socialSchema = new mongoose.Schema({
  personal: {
    type: String,
    maxLength: 144,
    trim: true,
    default: "",
  },
  facebook: {
    type: String,
    maxLength: 144,
    trim: true,
    default: "",
  },
  instagram: {
    type: String,
    maxLength: 144,
    trim: true,
    default: "",
  },
  linkedin: {
    type: String,
    maxLength: 144,
    trim: true,
    default: "",
  },
  twitter: {
    type: String,
    maxLength: 144,
    trim: true,
    default: "",
  },
  github: {
    type: String,
    maxLength: 144,
    trim: true,
    default: ""
  }
})

const socialModel = mongoose.model('social', socialSchema)
module.exports = socialModel
