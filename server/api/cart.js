const router = require('express').Router()
const { models: { Order }} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
    try {
      const singleOrder = await Order.findOne({
          where:{
              userId:req.params.id,
              isOpen:true
          }
      })
      res.send(singleOrder)
    } catch (err) {
      next(err)
    }
  })

// router.get('/', async(req, res, next) => {
//     try{
//         const orders = await Order.findAll();
//         res.send(orders);
//     }
//     catch(ex){
//         next(ex);
//     }
// })

  