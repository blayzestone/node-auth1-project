const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model");

module.exports = router;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcryptjs.hashSync(password, rounds);

  try {
    const [result] = await Users.addUser({ username, password: hash });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [user] = await Users.findBy({ username });

  try {
    const [user] = await Users.findBy({ username });

    if (user && bcryptjs.compareSync(password, user.password)) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "incorrect credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "failed" });
  }
});
