const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    max: [100, "Age cannot exceed 100"],
    min: [1, "Age must be at least 1"],
  },
});

const Card = mongoose.model("Card", CardSchema)

module.exports = Card;