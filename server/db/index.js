//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user');
// const Cart = require('./models/cart');
const Orders = require('./models/order');
const Product = require('./models/product');
const Reviews = require('./models/review');
//associations could go here!
User.hasMany(Orders)
User.hasMany(Reviews)
//---
Orders.belongsTo(User)
Product.hasMany(Orders)
//---
Reviews.belongsTo(Product)
Product.hasMany(Reviews)



const syncAndSeed =  async()=> {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({ email: 'murphy@email.com', password: '123' })
  ])
  
  const products = await Promise.all([
    Product.create({
      name: 'Strawberries, 1 lb', 
      price: 4.99, category: 'Fresh Produce', 
      quantity: 10, 
      descripton: 'While this berry\'s colorful cousins—the blueberry and red raspberry—are grown on bushes, this bright red fruit comes from vines close to the ground. It\'s picked when ready to eat, though a strawberry will become a little sweeter if left at room temperature for a day.', 
      ImgUrl: '/images/sze_strawberries.jpg'
    }),
    Product.create({
      name: 'Blueberries, 1 Pint', 
      price: 1.99 , category: 'Fresh Produce', 
      quantity: 10, 
      descripton: 'These sweet, tangy and intensely blue berries contain antioxidants such as anthocyanin, as well as anti-inflammatories. It has sweet-tart taste and their unique blue color.', 
      ImgUrl: '/images/sze_blueberries.jpg'
    }),
    Product.create({
      name: 'Bananas,(5 ct)', 
      price: 0.99 , category: 'Fresh Produce', 
      quantity: 10, 
      descripton: 'Characterized by their bright yellow color and sweet taste, bananas are the ideal fruit for snacks and sports activities', 
      ImgUrl: '/images/sze_bananas.jpg'
    }), 
    Product.create({
      name: 'Cucumber', 
      price: 1.69, category: 'Fresh Produce', 
      quantity: 10, 
      descripton: 'Cucumber is a widely cultivated plant ', 
      ImgUrl: '/images/sze_cucumber.jpg'
    }),
    Product.create({
      name: 'Avocado, One Large', 
      price: 0.99, category: 'Fresh Produce', 
      quantity: 10, 
      descripton: 'Avocado fruits have greenish or yellowish flesh with a buttery consistency and a rich, nutty flavour. ', 
      ImgUrl: '/images/sze_avocado.jpg'
    }),
    Product.create({
      name: 'Organic Green Onion (Scallions), 1 Bunch', 
      price: 0.99, category: 'Fresh Produce', 
      quantity: 10, 
      descripton: 'Organic Green Onion (Scallions), One Bunch. Both parts of the green onion are edible and can be used in cooking. Aid in Weight Loss. ', 
      ImgUrl: '/images/sze_onion.jpg'
    }),

    Product.create({
      name: 'Happy Belly Shredded Mexican Four Cheese Blend, 8 Ounce', 
      price: 1.96, category: 'Dairy, Cheese & Eggs', 
      quantity: 10, 
      descripton: 't’s a good source of calcium and is perfect for making nachos, tacos, quesadillas, and more. Comes in a convenient resealable bag.', 
      ImgUrl: '/images/sze_multicheese.jpg'
    }),
    Product.create({
      name: '365 Everyday Value, Cage-Free Non-GMO Large Brown Grade A Eggs, 12 ct', 
      price: 2.99, category: 'Dairy, Cheese & Eggs', 
      quantity: 10, 
      descripton: 'Cage-Free Large Brown Grade A Eggs. Nutrient dense - packing maximum nutrition in a minimum of calories.', 
      ImgUrl: '/images/sze_eggs.jpg'
    }),
    Product.create({
      name: 'Daisy Sour Cream, 16 oz', 
      price: 2.39, category: 'Dairy, Cheese & Eggs', 
      quantity: 10, 
      descripton: 'What makes Daisy America’s favorite brand of sour cream? It could be the fresh and delicious taste, the rich and creamy texture, or that it’s made from simple, wholesome ingredients - with no additives or preservatives.', 
      ImgUrl: '/images/sze_sourcream.jpg'
    }),
    Product.create({
      name: 'Happy Belly Mozzarella String Cheese, 12 Count, 12 Ounce Pack', 
      price: 2.89, category: 'Dairy, Cheese & Eggs', 
      quantity: 10, 
      descripton: 'Happy Belly String Cheese gives you 12 individually wrapped sticks of low moisture, part-skim milk mozzarella cheese. They contain milk and are a good source of calcium. Add some to a lunch box or keep them handy for fun, satisfying snacks.', 
      ImgUrl: '/images/sze_stringcheese.jpg'
    }),
    Product.create({
      name: 'Califia Farms - Almond Milk, Unsweetened, 48oz,', 
      price: 4.39, category: 'Dairy, Cheese & Eggs', 
      quantity: 10, 
      descripton: 'Our artisanally crafted Almondmilk that\'s 100% sugar-free and has creamy, pure taste will make it a quick staple in your fridge, coffee, smoothies, recipes and more.', 
      ImgUrl: '/images/sze_almondmilk.jpg'
    }),
    Product.create({
      name: 'Lactaid 2% Reduced Fat Milk, 96 fl oz', 
      price: 6.59, category: 'Dairy, Cheese & Eggs', 
      quantity: 10, 
      descripton: 'Get essential nutrients like calcium, protein, and Vitamin D from the milk your taste buds and your tummy can agree on.', 
      ImgUrl: '/images/sze_lactaidmilk.jpg'
    })
  ])
  const [cody, murphy] = users;
  const [strawberry, blueberry, banana, cucumber, avacado, onion, mexicanCheese, egg, cream, stringCheese, almondMilk, milk] = products;

  return {
    users: {
      cody,
      murphy
    },
    products: {
      strawberry, 
      blueberry, 
      banana, 
      cucumber, 
      avacado, 
      onion, 
      mexicanCheese, 
      egg, 
      cream, 
      stringCheese, 
      almondMilk, 
      milk
    }
  };
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Product
  }
}
