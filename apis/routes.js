const express = require("express");
const productController = require("../controllers/productController");
const clientController = require("../controllers/clientController");

//define a router and create routes
const router = express.Router();
//parses POST request
router.use(express.urlencoded({ extended: true }));

//routes for dynamic processing of products
//-----------------------------------------------
//route for listing all products
router.get("/api/catalog", productController.getCatalogue);
router.get("/api/article/:id", productController.getProductByID);

//route for showing cart
/*router.get("/api/cart", function (req, res) {
  let cart = req.session.cart;
  const searchCart = productController.searchCart;
  res.render("cart", { cart: cart, searchCart: searchCart });
});*/
router.get("/api/cart", productController.searchCart);
//route for adding products to cart
router.post("/api/cart", productController.addToCart);

//routes for dynamic processing of clients
//-----------------------------------------------
//route for registration
router.post("/api/register", clientController.registerControl);
//route for login
router.post("/api/login", clientController.loginControl);

//export router
module.exports = router;
