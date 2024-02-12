const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt"); // allows us to hash password

const { sign } = require("jsonwebtoken");

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  // we want to make some changes or hash the password for security
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash });
    console.log("Successfully added User");
  });

  response.json("USER_SUCCESS");
});

router.post("/login", async (request, response) => {
  const { username, password } = request.body;

  // check if username exists
  const user = await Users.findOne({ where: { username: username } });

  if (!user) response.json({ error: "USER_NOT_FOUND" });
  else if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match)
        response.json({ error: "Wrong username and password combination" });

      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );

      response.json(accessToken);
    });
  }
});

module.exports = router;
