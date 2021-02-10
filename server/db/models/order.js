const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    products: {
      type: Sequelize.ARRAY(Sequelize.TEXT) 
    },
    isOpen: {
      type: Sequelize.BOOLEAN,
    },
    isComplete: {
      type: Sequelize.BOOLEAN
    }
})

module.exports = Order; 