// ten plik ma służyć tylko do rejestracji routerów, dlatego funckje tworzące sa gdzie ingdziej żeby ten plik nie spuchł
const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// attach the habdler to this router
// GET all workouts - rejestacja funckji z kontrollera - bez wywołania - brak nawiasow ()
router.get("/", getWorkouts);

// GET signle workout rejestacja funckji z kontrollera - bez wywołania - brak nawiasow ()
router.get("/:id", getWorkout);

//POST - create a new Workoput document
router.post("/", createWorkout);

// DELETE a  workout
router.delete("/:id", deleteWorkout);

// UPDATE a  workout
router.patch("/:id", updateWorkout);

// export modułu
module.exports = router;
