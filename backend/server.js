require("dotenv").config();

const express = require("express");
// połączenie z baza mongoDB za pomocą bibliteki mongoose
const mongoose = require("mongoose");

// rejestracja routera workout
const workoutRoutes = require("./routes/workouts"); // bez rozszerzenia .js sam sie zorientuje
const userRoutes = require("./routes/user"); // bez rozszerzenia .js sam sie zorientuje

// tworzy aplikacje express, nazwa pp jest dowolna
const app = express();

// rejestracja middlewarów globalnych
// middleware

// middleware pootrzebny żeby w POST czy PATCH dobrać się do danych wyssłanych do serverwa
// express.json() middleware wbudowany z express, to robi, że jak przychodzi reqwuets do serwera to sprawdza czy nie ma jakiegoś body do requestu
// a jeżeli jest to przekazuje go i dołącza do obiektu 'req' czyli request
app.use(express.json());

// next jest wymagany bo inaczej nigdy nie przejdize do kolejnego middleware cyzli koljenj funkji routre
app.use((req, res, next) => {
  console.log(req.path, req.method);
  // next MUSI być uruchomiony na sam koniec
  next();
});

// routes, żeby odpowiadał na tym enpoincie - potrzbene np do reacta
// technicznie rzecz biorąc to też jest middleware
// używa routera z innego pliku, attaches thos all routes into the app
// app.use(workoutRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to the db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests tylko gdy mamy połaczenie z bazą
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
