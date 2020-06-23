const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const requiresAuth = require("../auth/requires-auth");
const dbConnection = require("../data/connection");

const server = express();

const sessionConfig = {
  name: "my-session",
  secret: process.env.SESSION_SECRET || "My Secret",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 10,
  }),
};

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", requiresAuth, usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ msg: "up" });
});

module.exports = server;
