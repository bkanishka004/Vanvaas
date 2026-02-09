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
  const { username, email, password } = req.body;
  users.push({ username, email, password });
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

// LOGOUT
app.get("/logout", (req, res) => {
  currentUser = null;
  res.redirect("/");
});

// VIEW ALL CAMPGROUNDS
app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { camps: camps, user: currentUser });
});

// ADD CAMP - Show Form
app.get("/camps/new", (req, res) => {
  res.render("camps/new", { user: currentUser });
});

// ADD CAMP - Handle Form Submission
app.post("/camps", (req, res) => {
  const { title, location, description, price, image } = req.body;
  
  const newCamp = {
    id: camps.length + 1,
    title,
    location,
    description,
    price,
    image: image || "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600",
  };
  
  camps.push(newCamp);
  res.redirect("/campgrounds");
});

// VIEW SINGLE CAMPGROUND
app.get("/campgrounds/:id", (req, res) => {
  const camp = camps.find((c) => c.id === parseInt(req.params.id));
  
  if (camp) {
    res.render("camps/show", { camp: camp, user: currentUser });
  } else {
    res.redirect("/campgrounds");
  }
});

// EDIT CAMPGROUND - Show Form
app.get("/campgrounds/:id/edit", (req, res) => {
  const camp = camps.find((c) => c.id === parseInt(req.params.id));
  
  if (camp) {
    res.render("camps/edit", { camp: camp, user: currentUser });
  } else {
    res.redirect("/campgrounds");
  }
});

// UPDATE CAMPGROUND
app.post("/campgrounds/:id", (req, res) => {
  const { title, location, description, price, image } = req.body;
  const camp = camps.find((c) => c.id === parseInt(req.params.id));
  
  if (camp) {
    camp.title = title;
    camp.location = location;
    camp.description = description;
    camp.price = price;
    camp.image = image || camp.image;
  }
  
  res.redirect(`/campgrounds/${req.params.id}`);
});

// DELETE CAMPGROUND
app.post("/campgrounds/:id/delete", (req, res) => {
  camps = camps.filter((c) => c.id !== parseInt(req.params.id));
  res.redirect("/campgrounds");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});