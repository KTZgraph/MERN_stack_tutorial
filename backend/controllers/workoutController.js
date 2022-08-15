// importowanie modelu bo będziemy go tutaj używać
const Workout = require("../models/workoutModel");

// importowanie biblioteki, zeby zwalidować id z urla z rządzania klienta
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  // pusty obiket jako argumnet funckji .find - zwróci wszystkie obiekty z bazy
  //   obiekty są posortowane malejące wzgledem daty utworzenia dokumentu w bazie - najnowsze jako pierwsze
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  // parametry z urla tutaj /api/workouts/:id są w obiekcie zadania w property .params
  const { id } = req.params;

  //   zanim poszukamy obiektu, to musimy upewnoić sie że id z urla jest prawidłowego typu jaki wymaga mongoDB type of ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // bez tego jest wewnętrzny bład z mongoDB
    return res.status(404).json({ error: "No such workout" });
  }

  // suzkanie pojedynczegodokuemntu
  const workout = await Workout.findById(id);
  if (!workout) {
    // jeśli nie istneije w bazie
    // trzeba użyć 'return' bo inaczej odpali resztę kodu a myu chcemy od razy zwrotkę jak nie znajdzie
    return res.status(400).json({ error: "No such workout" });
  }

  //   zwraca obiekt, bo nie jest nullem
  res.status(200).json(workout);
};

// CREATE new workout
const createWorkout = async (req, res) => {
  // dobieranie się do ciała, jakie jest wysłane do serwera dzięki middleware app.use(express.json());
  const { title, load, reps } = req.body;
  // tworzenie nowego dokumentu w kolekcji

  // ładniejsza obsługa błedów dla usera, zeby nie widział błedów z kodu
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    // czyli któreś pole jest puste to łądny komunikat do usera
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    // w middleware backend\middleware\requireAuth.js dopisujemy i dusera
    // wiemy, ze mamy te dane, bo wyżej sprawdzam właśnie w middleware if(!user){return res.status(401).json({error:'Aiuthorization})}
    const user_id = req.user._id;
    // Workout.create() jest asynchroniczne, więc trzeba zmienić sygnaturę funkcji createWorkout
    // user_id to autor
    const workout = await Workout.create({ title, load, reps, user_id });
    // zwrotka z serwera - stauts i nowo utworzony obiekt
    res.status(200).json(workout);
  } catch (error) {
    // obiekt error ma atrybut message i to jego wyświetlamy.zwracamy klientowi
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params; //id z urla

  //sprawdzanie czy id jest w prawidłowym formacie
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // bez tego jest wewnętrzny bład z mongoDB
    return res.status(404).json({ error: "No such workout" });
  }

  // staramy się usunąć
  // UWAGA w mongoDB id nazwya sie z podkreślinkiem z proszu `_id`
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    // jeśli nie istneije w bazie taki obiekt
    return res.status(400).json({ error: "No such workout" });
  }

  //   jak obiekt byl w bazie i go usunęliśmy to zwracamy klientowi właśnie usunięty obiket
  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params; //id z urla

  //sprawdzanie czy id jest w prawidłowym formacie
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // bez tego jest wewnętrzny bład z mongoDB
    return res.status(404).json({ error: "No such workout" });
  }

  //   próba update - dwa argumnetu 1: probuje znaleźc obiekt po paramaterach, 2: reprezentuje update któy chcemy zrobić
  //   ...res.body spread opertor robiumy aktulaizje z body któy wysąll nam klient - nie trzeba osobno destrukturyzacji robić z request.body
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    // jeśli nie istneije w bazie taki obiekt
    return res.status(400).json({ error: "No such workout" });
  }

  // zwracam obiekt PRZED aktualizacją
  res.status(200).json(workout);
};

// eksportowanie funkcji
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
