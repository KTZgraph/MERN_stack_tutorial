const express = require("express");
// importowanie modelu
const Workout = require("../models/workoutModel");

const router = express.Router();

// attach the habdler to this router
// GET all workouts
router.get("/", (req, res) => {
  res.json({ mssg: "Get all workouts" });
});

// GET signle workout
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get a single workout" });
});

// POST a new workout - zmiana sygnatury na async (req, res) - mozna teraz używać await w środku
router.post("/", async (req, res) => {
  // dobieranie się do ciała, jakie jest wysłane do serwera dzięki middleware app.use(express.json());
  const { title, load, reps } = req.body;
  // tworzenie nowego dokumentu w kolekcji

  //   try catch block
  try {
    // Workout.create() jest asynchroniczne, więc trzeba zmienić sygnaturę router.post
    const workout = await Workout.create({ title, load, reps });
    // zwrotka z serwera - stauts i nowo utworzony obiekt
    res.status(200).json(workout);
  } catch (error) {
    // obiekt error ma atrybut message i to jego wyświetlamy.zwracamy klientowi
    res.status(400).json({ error: error.message });
  }
});

// DELETE a  workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a workout" });
});

// UPDATE a  workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a workout" });
});

module.exports = router;
