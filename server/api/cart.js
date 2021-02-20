const router = require('express').Router()
// exported product models to find their id 
const { models: { Cart, Order, Product }} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
          where:{
              userId:req.params.id,
              isOpen:true
          },
          include: [{
            model: Order,
            include: [Product]
          }]
      })
      res.send(cart)
    } catch (err) {
      next(err)
    }
})
  
router.post('/:id', async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
        where:{
            userId:req.params.id,
            isOpen:true
        }
    })

    if(!cart){
      await Cart.create({
          userId: req.params.id,
          isOpen: true
      })

      cart = await Cart.findOne({
        where:{
            userId:req.params.id,
            isOpen:true
        }
    })
    }

    let newOrder = await Order.create({
      productId: req.body.productId,
      cartId: cart.id
    })

    const order = await Order.findOne({
      where: {
        id: newOrder.id
      },
      include: [ Product ]
    })

    res.send(order).status(201);
  } catch (err) {
    next(err)
  }
})

router.put('/clear/:id', async (req, res, next) => {
  try{
    const cart = await Cart.findOne({
      where:{
          userId:req.params.id,
          isOpen:true
        }
    })

    await cart.destroy();
    
    const newCart = await Cart.create({
      userId: req.params.id,
      isOpen: true
    })

    res.status(201).send(newCart);

  }
  catch(ex){
    next(ex)
  }
})
  
router.put('/delete/:id', async(req,res,next)=>{
  try{
    const order = await Order.findOne({
      where: {
        id: req.params.id
      }
    })

    await order.destroy();
    
    res.sendStatus(201)
    }
  catch(error){
      next(error)
  }
})