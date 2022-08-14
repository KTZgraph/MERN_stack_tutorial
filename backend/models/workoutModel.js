// mongoDB samo jest schemaLESS , to biblioteka mongoose pozwala na tworzenie schemas
const mongoose = require("mongoose");

const Schema = mongoose.Schema; //funckja do tworzenia nowej schemy

// schema definiuje strukturę dokumentu w tej kolejkcji
const workoutSchema = new Schema(
  {
    // pierwszy argument to obiekt który określa strukturę dokumentu jak ma on wyglądać
    title: {
      type: String,
      required: true,
    },
    reps: {
      // powtórzenia ćwiczeć
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  {
    // drugi argument też obiekt, fajne że z automatu dodaje daty kiedy utworzono czy zmodyfikowano
    // coś takiego jest w zwrotce jsona do klienta
    // createdAt: "2022-08-14T12:02:55.053Z",
    // updatedAt: "2022-08-14T12:02:55.053Z",
    timestamps: true,
  }
);

// musimy zrobić model zdefuniowany na tej schema
// What a model does is apply tha schema to a particular model then we use the model to interact with a collection of that name
// liczba pojedyncza, potem sam sobie z automatu zmieni na mnogą
// to tworzy nam model który zaimportujemy potem w innych plikach
// potem użyjemy tego modelu Workout to interact with Workputs collection, because it's automatically creates a collection for us based on this name
// it pluralizes this and builds tha collection in the database for us, so
module.exports = mongoose.model("Workout", workoutSchema);

// żeby znaleźć wszystkie kolekcje Workout - funckja .find() bez argumentów
// Workout.find() użycie metody on the model itself
