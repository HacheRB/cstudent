const mongoose = require('mongoose')
const courseProgressSchema = require('./courseProgress.model').schema
const socialSchema = require('./social.model')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'A valid email is required'],
    validate: {
      validator: function (v) {
        return /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(v);
      },
      message: email => `${email.value} is not a valid email!`
    },
  },
  verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String,
    lowercase: true,
    trim: true,
    default: "url-predefinida"
  },
  userName: {
    type: String,
    maxLength: 144,
    trim: true,
    unique: true,
    required: [true, 'user name is required'],
    validate: {
      validator: function (v) {
        return /^[a-z0-9_-]{3,15}$/.test(v);
      },
      message: username => `${username.value} is not a valid user name!`
    },
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  privacy: {
    type: String,
    enum: ["PUBLIC", "FRIENDS", "PRIVATE"],
    default: "PRIVATE"
  },
  location: {
    city: {
      type: String,
      trim: true,
      default: ""
    },
    country: {
      type: String,
      trim: true,
      default: ""
    }
  },
  firstName: {
    type: String,
    trim: true,
    maxLength: 144,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 144,
    default: ""
  },
  birthDate: {
    type: Date,
    default: "",
    required: false
  },
  socialLinks: {
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
  },
  coursesProgress: [courseProgressSchema]
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel
