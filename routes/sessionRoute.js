const sessionRoute = require("express").Router();
const userModel = require("../models/usermodel");
const chatModel = require("../models/chatModel");
const shorid = require("shortid");
// sessionRoute.use()
sessionRoute.get("/", async (req, res) => {
  if (!req.cookies["username"]) return res.redirect("/");
  const user = await userModel.findOne({ userid: req.cookies["username"] });
  if (!user) {
    res.clearCookie("username");
    res.redirect("/");
  }
  const id = shorid.generate();
  await chatModel.create({
    chatid: id,
    creator: req.cookies["username"],
    joinee: null,
  });
  res.redirect(`/chat/${id}`);
});
sessionRoute.post("/", async (req, res) => {
  const id = shorid.generate();
  await userModel.create({ username: req.body.uname });
  await chatModel.create({ chatid: id, creator: req.body.uname, joinee: null });
  res.cookie("username", req.body.uname);
  res.send(`/chat/${id}`);
});

module.exports = sessionRoute;
