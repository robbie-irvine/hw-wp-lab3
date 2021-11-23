const express = require("express");

//creating app
const app = express();

//handling static HTML and EJS templates
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index"); //no need for ejs extension
});

const session = require("express-session");

app.use(session({ secret: "some secret code" }));

//route for contacts
app.get("/contacts", (req, res) => {
  res.render("contacts");
});

//route for contacts
app.get("/register", (req, res) => {
  res.render("register");
});

//route for contacts
app.get("/login", (req, res) => {
  res.render("login");
});

//pass requests to the router middleware
const router = require("./apis/routes");
app.use(router);

/*//route for cart
app.get("/api/cart", (req, res) => {
  res.render("cart");
});*/

//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Cart app listening at http://localhost:${port}`);
});
