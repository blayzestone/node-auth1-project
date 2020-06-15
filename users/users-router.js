const router = require("express").Router();

const Users = require("./users-model");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const users = await Users.findUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
