const mongoose = require('mongoose')

const dailySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dailyProgress: {
    type: Number,
    default: 0,
  },
  estimatedProgress: {
    type: Number,
    required: [true, 'Error: needs a daily progress estimate']
  },
})

const dailyModel = mongoose.model('daily', dailySchema)
module.exports = dailyModel
