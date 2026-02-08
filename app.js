const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let users = [];
let camps = [];
let currentUser = null;

// HOME PAGE
app.get("/", (req, res) => {
  res.render("home", { camps: camps, user: currentUser });
});

// REGISTER
app.get("/register", (req, res) => {
  res.render("users/register");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  currentUser = username;
  res.redirect("/");
});

// LOGIN
app.get("/login", (req, res) => {
  res.render("users/login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const foundUser = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (foundUser) {
    currentUser = username;
    res.redirect("/");
  } else {
    res.send("Invalid Credentials");
  }
});

// ADD CAMP (Functionality)
app.get("/camps/new", (req, res) => {
  res.render("camps/new");
});

app.post("/camps", (req, res) => {
  const { title, location } = req.body;
  camps.push({ title, location });
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
