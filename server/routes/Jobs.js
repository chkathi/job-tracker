const express = require("express");
const router = express.Router();
const { Jobs } = require("../models");

router.get("/", async (request, response) => {
  const listOfJobs = await Jobs.findAll();
  response.json(listOfJobs);
});

router.post("/", async (request, response) => {
  // parse the body to create job
  const job = request.body;
  await Jobs.create(job); // creates entry in database

  response.json(job);
});

module.exports = router;
