const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    favoriteGenre: {
      type: String,
      required: true,
    },
    favoriteArtist: {
      type: String,
      required: true,
    },
  },
});

const User = mongoose.model("Signup", userSchema);

module.exports = User;
