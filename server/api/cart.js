const router = require('express').Router()
// exported product models to find their id 
const { models: { Order, Product, User }} = require('../db')
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
  
  router.post('/:id', async (req, res, next) => {
    try {
      let singleOrder = await Order.findOne({
          where:{
              userId:req.params.id,
              isOpen:true
          }
      })

      console.log('SINGLE ORDER', singleOrder);
      if(!singleOrder){
        await Order.create({
            userId: req.params.id,
            isOpen: true,
            products: []
        })

        singleOrder = await Order.findOne({
          where:{
              userId:req.params.id,
              isOpen:true
          }
      })
      }
      // finding product by their id, passed in from THUNK in req.body 
      const product = await Product.findByPk(req.body.productId)
      //Stringifying product to follow format of stringified product array in our ORDER model
      const stringifiedProduct = JSON.stringify(product.dataValues);
      // Grab current product array that belongs to this order
      const currentProducts = singleOrder.products;
      //splat out current products and stringfiedproduct to combine them as one product array
      singleOrder.products = [...currentProducts, stringifiedProduct];
       
      await singleOrder.save();
       
      res.send(singleOrder).status(201);
    } catch (err) {
      next(err)
    }
  })

  
router.put('/delete', async(req,res,next)=>{
  try{
    const singleOrder = await Order.findOne({
      where:{
          userId:req.body.id,
          isOpen:true
      }
  })
  const currentProducts = singleOrder.products;
  const productArray = (currentProducts.map(product => {
        return JSON.parse(product);
  })).filter(product => product.name !== req.body.orderName)
  
  singleOrder.products = productArray.map(product => {
    return JSON.stringify(product);
  })
   await singleOrder.save();
  
      res.sendStatus(201)
  }
  catch(error){
      next(error)
  }
})