const mongoose = require("mongoose");

const campSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  description: String,
  image: String,
});

module.exports = mongoose.model("Camp", campSchema);
