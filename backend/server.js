require("dotenv").config();

const express = require("express");

// tworzy aplikacje express, nazwa pp jest dowolna
const app = express();

// rejestracja middlewarów globalnych
// next jest wymagany bo inaczej nigdy nie przejdize do kolejnego middleware cyzli koljenj funkji routre
// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  // next MUSI być uruchomiony na sam koniec
  next();
});

// routes, żeby odpowiadał na tym enpoincie - potrzbene np do reacta
// technicznie rzecz biorąc to też jest middleware
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

// nasłuchiwanie na odpowiednim porcie
//listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port 4000");
});
