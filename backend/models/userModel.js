const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    // unikalne pole
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// zwraca model stworozny na podstawie Schema
module.exports = mongoose.model('User', userSchema)