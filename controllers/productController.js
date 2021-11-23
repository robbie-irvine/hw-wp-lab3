const getCatalogue = (request, response) => {
  const catalogServices = require("../services/productServices");
  catalogServices.searchService(function (err, rows) {
    response.render("catalogue", { products: rows });
  });
};

const getProductByID = (request, response) => {
  const catalogServices = require("../services/productServices");
  let reference = request.params.id;
  catalogServices.searchIDService(reference, function (err, rows) {
    response.render("article", { product: rows });
  });
};

const getProductsByCategory = (request, response) => {
  const catalogServices = require("../services/productServices");
  let category = request.params.category;
  catalogServices.searchCategoryService(category, function (err, rows) {
    response.json(rows);
    response.end();
  });
};

const addToCart = (request, response) => {
  let quantity = parseInt(request.body.quantity, 10);
  let reference = request.body.reference;

  if (request.session.cart === undefined) {
    console.log("Initialising cart...");
    request.session.cart = {};
  }

  if (request.session.cart.hasOwnProperty(reference)) {
    request.session.cart[reference].quantity += quantity;
  } else {
    request.session.cart[reference] = {
      item: JSON.parse(request.body.product),
      quantity: quantity
    };
  }

  searchCart(request, response);
};

const searchCart = (request, response) => {
  const productServices = require("../services/productServices");

  let cart = request.session.cart;
  let cartExt = [];

  if (cart)
    Object.keys(cart).forEach((reference) => {
      cartExt.push({
        reference: reference,
        name: cart[reference].item.name,
        price: cart[reference].item.price,
        vat: cart[reference].item.vat,
        quantity: cart[reference].quantity
      });
      console.log(JSON.stringify(cart[reference].item));
    });

  response.render("cart", { items: cartExt });
};

module.exports = {
  getCatalogue,
  getProductByID,
  getProductsByCategory,
  addToCart,
  searchCart
};
