const express = require("express");

//creating app
const app = express();

//send an HTTP response when recieving HTTP GET /
app.get("/", (req, res) => {
  res.send("Hello, your server is up and running");
});

//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Cart app listening at http://localhost:${port}`);
});
