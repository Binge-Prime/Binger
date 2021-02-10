const Sequelize = require('sequelize')
const db = require('../db')
const Review = db.define('review', {
  text: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.FLOAT
  }
})
module.exports = Review;