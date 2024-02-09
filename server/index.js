// package.json has main server file as index.js

// Standard when you want
const express = require("express");
const app = express();
/* allows us to initialize our server, make API requests, etc */

const db = require("./models");
db.sequelize.sync().then(() => {
  // port has to be different than the react application port
  // run function whenever server is running
  app.listen(3001, () => {
    console.log("Server is running on port3001");
  });
});
