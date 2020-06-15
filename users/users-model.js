const db = require("../data/connection");

module.exports = {
  addUser,
  findUsers,
  findBy,
};

function addUser(user) {
  return db("user").insert(user);
}

function findUsers() {
  return db("user").select("*");
}

function findBy(searchObj) {
  return db("user").select("*").where(searchObj);
}
