// package.json has main server file as index.js

// Standard when you want
const express = require("express");
const app = express();
/* allows us to initialize our server, make API requests, etc */

const cors = require("cors");

// fix parsing issues when creating job using json body
app.use(express.json());

// allows us to make API requests and run react app from same computer
// whitelists our own computer
app.use(cors());

const db = require("./models");

//Routers (importing and applying router)
const jobRouter = require("./routes/Jobs");
app.use("/jobs", jobRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  // port has to be different than the react application port
  // run function whenever server is running
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
