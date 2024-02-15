const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt"); // allows us to hash password

const { sign } = require("jsonwebtoken");

const { validateToken } = require("../middlewares/AuthMiddleware");
router.post("/", async (request, response) => {
  const { username, password } = request.body;

  // we want to make some changes or hash the password for security
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash });
    console.log("Successfully added User");
  });

  response.json("USER_SUCCESS");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "important"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

// check if there is valid token
// Returns information about the user
router.get("/auth", validateToken, (request, response) => {
  response.json(request.user);
});

module.exports = router;
