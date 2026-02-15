const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();

/* ================= DATABASE ================= */

mongoose
  .connect("mongodb://127.0.0.1:27017/vanvaasDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================= SETTINGS ================= */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* ================= SESSION ================= */

app.use(
  session({
    secret: "vanvaassecret",
    resave: false,
    saveUninitialized: false,
  }),
);

/* ================= MODELS ================= */

const User = require("./models/User");
const Camp = require("./models/Camp");

/* ================= GLOBAL USER MIDDLEWARE ================= */
/* This safely makes user available in ALL EJS files */

app.use(async (req, res, next) => {
  res.locals.user = null;

  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).select("-password");
      res.locals.user = user;
    } catch (err) {
      console.log(err);
    }
  }

  next();
});

/* ================= ROUTES ================= */

// Home
app.get("/", (req, res) => {
  res.render("home");
});

/* ================= REGISTER ================= */

app.get("/register", (req, res) => {
  res.render("users/register");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.redirect("/login");
});

/* ================= LOGIN ================= */

app.get("/login", (req, res) => {
  res.render("users/login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Incorrect password");
  }

  req.session.userId = user._id;
  res.redirect("/");
});

/* ================= LOGOUT ================= */

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

/* ================= CAMPS ================= */

// Show Add Camp Page (Protected)
app.get("/camps/new", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("camps/new");
});

// Add Camp
app.post("/camps", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const camp = new Camp(req.body);
  await camp.save();

  res.redirect("/campgrounds");
});

// View All Camps
app.get("/campgrounds", async (req, res) => {
  const camps = await Camp.find({});
  res.render("campgrounds", { camps });
});

/* ================= SERVER ================= */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
