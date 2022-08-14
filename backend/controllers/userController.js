const User = require("../models/userModel");

//login user
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // użycie naszej funckji statycznej stworzonej na modelu
    const user = await User.signup(email, password);
    // jako zwrotne json serwer zwraca email i nowo utworozny dokument user
    res.status(200).json({ email, user });
  } catch (error) {
    // dziwne błedy jak się słowa kluczowe źle poda np "pasword": "abc" zamiast "password"
    // "error": "data and salt arguments required"
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
