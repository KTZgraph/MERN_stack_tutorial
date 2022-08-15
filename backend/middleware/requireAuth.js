const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// middleware
const requireAuth = async (req, res, next) => {
  // musi być async bo uzywamy await
  // weryfikacja czy user is authenticated
  //by using an authorization headers property from the request, tam są też dane jak Content-Type: application-json etc
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorizatino token required" });
  }

  //   wyciąganie wartości tokena sting 'Bearer Header.Payloadf.SyganturaTokenaJWT'
  const token = authorization.split(" ")[1];

  //   weryfikacja tokena czy nie zsotał zmieniony
  try {
    // jwt.verify() dwa argumentu przyjmuje funckja 1) token, 2) sekret z serwera
    // my sobie wcześniej założyliśc, że _id z mongoDB będzie w payload w backend\controllers\userController.js
    const { _id } = jwt.verify(token, process.env.SECRET);
    // Szukanie usera w bazie po id; .select('nazwaPola') to zwrócić mi tylkow  artośc tego pola, ale nie cały dokument
    // metoda z modelu backend\models\userModel.js
    // przypisanie danych do obiektu req req.abc też by dało radę - nazwa dowolna, pozowli na dobanie się do tych danych w kolejnych middlewarach
    // np,: moich fucnkajc routes czy backend\controllers\workoutController.js
    req.user = await User.findOne({ _id }).select("_id");

    // WARNING pamieać o next, bo inaczje nie uruchomi kolejnych middleware
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// exports - liiczba mnoga
module.exports = requireAuth;
