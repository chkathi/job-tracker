const express = require("express");
const router = express.Router();
const { Jobs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (request, response) => {
  const listOfJobs = await Jobs.findAll();
  response.json(listOfJobs);
});

// validate user before a job is entered
router.post("/", validateToken, async (request, response) => {
  // parse the body to create job
  const job = request.body;
  await Jobs.create(job); // creates entry in database

  response.json(job);
});

// This route is the one that you query by ID
// passing param id using :id
router.get("/byId/:id", async (request, response) => {
  const id = request.params.id;

  // Find by primary key (sequelize function)
  const job = await Jobs.findByPk(id);
  response.json(job);
});

router.get("/byCompany/:companyName", async (request, response) => {
  const companyName = request.params.companyName;

  // Find by primary key (sequelize function)
  const job = await Jobs.findAll({ where: { companyName: companyName } });
  response.json(job);
});

module.exports = router;
