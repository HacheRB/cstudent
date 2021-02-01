const mongoose = require('mongoose')
const dailySchema = require('./daily.model').schema

const courseProgressSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ["udemycourse"],
    default: "udemycourse"
  },
  material_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A Identifier for the material is required'],
    ref: "udemycourse"
  },
  initialDate: {
    type: Date,
    default: Date.now()
  },
  dailyEstimate: {
    type: Number,
    min: [1, 'Error, minimum value is 1'],
    required: [true, 'Estimate is needed'],
  },
  totalProgress: {
    type: Number,
    min: [0, 'Error, minimum value is 0'],
    default: 0
  },
  estimateDate: {
    type: Date,
    required: false,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ["IN PROGRESS", "COMPLETED"],
    default: "IN PROGRESS"
  },
  favorite: {
    type: Boolean,
    default: false
  },
  daily: [dailySchema]
})

const courseProgressModel = mongoose.model('courseProgress', courseProgressSchema)
module.exports = courseProgressModel