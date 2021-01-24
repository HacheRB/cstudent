const mongoose = require('mongoose')
const dailySchema = require('./daily.model').schema

const progressSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ["UDEMY"],
    default: "UDEMY"
  },
  material_id: {
    type: String,
    maxLength: 144,
    trim: true,
    required: [true, 'A Identifier for the material is required'],
  },
  initialDate: {
    type: Date,
    default: Date.now
  },
  dailyEstimate: {
    type: Number,
    min: [1, 'Error, minimum value is 1'],
  },
  totalProgress: {
    type: Number,
    min: [1, 'Error, minimum value is 1'],
  },
  estimateDate: {
    type: Date,
    required: false
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

const progressModel = mongoose.model('progress', progressSchema)
module.exports = progressModel