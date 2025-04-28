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
  },
});

const Card = mongoose.model("Card", CardSchema)

module.exports = Card;