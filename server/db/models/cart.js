const Sequelize = require('sequelize')
const db = require('../db')
const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER
  },
  isOpen: {
    type: Sequelize.BOOLEAN
  }
})
module.exports = Cart;