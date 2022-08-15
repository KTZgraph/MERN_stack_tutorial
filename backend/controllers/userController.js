const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// WARNING npm install jsonwebtoken
const createToken = (_id) => {
  // _id zamiast zwykłego, bo to id z mongoDB, potrzebne bo id jest cześcią `payload` JWT tokena
  // jwt.sign({}) trzy argumnety 1) obiekt który w pewien sposób reprezentuje token który chcemy stworzyć można dać co sie chce BYLE NIE BYŁO SENSITIVE
  // 2) argument to secret string zxnany tylko serverowi - NIE dodawać go do repo tylko do pliku .env
  // 3) argument to jakiś obiekt opcji - jedyne co tu chce dac to ważnosc tokenu na trzy dni
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  // dane z POST
  const { email, password } = req.body;

  // logujemy
  try {
    // użycie naszej funckji statycznej stworzonej na modelu
    const user = await User.login(email, password);
    // stopwrzenie usera
    const token = createToken(user._id);

    // zwrócenie tokena dla usera
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // użycie naszej funckji statycznej stworzonej na modelu
    const user = await User.signup(email, password);
    // jako zwrotne json serwer zwraca email i nowo utworozny token
    // JWT tutal zwrócę token userowi

    // create a token - token tak naprawdę składajacy się z 3 części
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    // dziwne błedy jak się słowa kluczowe źle poda np "pasword": "abc" zamiast "password"
    // "error": "data and salt arguments required"
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
