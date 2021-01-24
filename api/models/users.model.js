const mongoose = require('mongoose')
const progressSchema = require('./progress.model').schema
const socialSchema = require('./social.model').schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'A valid email is required'],
    validate: {
      validator: function (v) {
        return /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(v);
      },
      message: email => `${email.value} is not a valid Email !`
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
    required: [true, 'user name is required'],
    validate: {
      validator: function (v) {
        return /^[a-z0-9_-]{3,15}$/.test(v);
      },
      message: username => `${username.value} is not a valid User name !`
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
    socialSchema
  },
  resources: [progressSchema]
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel

// use of select: