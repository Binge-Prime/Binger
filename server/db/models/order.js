const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  products:{
      type: Sequelize.STRING
  },
  isComplete: {
    type: Sequelize.BOOLEAN
  }
})
module.exports = Order; 