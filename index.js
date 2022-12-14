const express = require("express");
const shorid = require("shortid");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

const userModel = require("./models/usermodel");

const app = express();
//All middlewares
const ekDin = 1000 * 60 * 60 * 60 * 24;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "I don't wanna reveal it.",
    cookie: { secure: true, maxAge: ekDin },
    saveUninitialized: true,
    resave: true,
  })
);

//All routes
const chatroomRouter = require("./routes/chatroomRoute");
const sessionRouter = require("./routes/sessionRoute");
const loginRouter = require("./routes/loginRoute");
app.use("/chat/", chatroomRouter);
app.use("/login", loginRouter);
app.use("/createsession", sessionRouter);

app.use("/", async (req, res) => {
  if (
    !req.cookies["username"] ||
    !(await userModel.findOne({ userid: req.cookies["username"] }))
  )
    return res.sendFile(__dirname + "/views/index.html");
  res.redirect("/createsession");
});
app.listen(3000);
