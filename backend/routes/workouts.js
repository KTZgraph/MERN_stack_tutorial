// ten plik ma służyć tylko do rejestracji routerów, dlatego funckje tworzące sa gdzie ingdziej żeby ten plik nie spuchł
const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//REQUIRE  AURH FOR ALL WORKOUT ROUTES
// nasz middleware który sprawdza tokena i dopisuje dane usera jeśli sa do req.user
// to co robi, to tak naprawdę uruchamia tę middleware function before all of this staff rignt here (router.get(, router.get(, router.post, router.delete, router.patch
// chcemy chronić te wszsytkei poniższe endpointy
router.use(requireAuth);

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
