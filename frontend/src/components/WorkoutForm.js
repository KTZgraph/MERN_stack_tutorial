import { useState } from "react";
// customowy hook do aktualizacji globalnego stanu danych
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  // invoke my custom hook
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    //   async funckja bo do api się odnosimy
    e.preventDefault();

    // dummy workout object
    const workout = { title, load, reps };

    // fetch api do
    const response = await fetch("/api/workouts", {
      method: "POST",
      //   pamieać o zamianie obiektu na jsona
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      // to backend zwrca w razie błełdu  res.status(400).json({ error: error.message });
      // troche łądniejsza obsługa błedów, gdy user nie wypełnił któregoś z pól formularza
      setError(json.error);
      // listę z nazwami zwraca backend
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      // czyszczebie inputu, żeby ręcznie nie trzeba było usuwać
      setTitle("");
      setLoad("");
      setReps("");
      // czyszczenie błędu
      setError(null);
      // czyszczenie listy niewypełnionych pól
      setEmptyFields(null);
      console.log("new workout added", json);
      // aktualizowanie globalnego stanu danych, payload to tylko jeden nowo utworzony obiekt - zwrotka z serwera
      // ponieważ to aktulizuje globalny stan, to komponent Home się zrerenderuje
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Excercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        // stylowanie inputu jeśli nie zostal wypełniony -cos dynamicznego
        className={emptyFields?.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        // stylowanie inputu jeśli nie zostal wypełniony -cos dynamicznego
        className={emptyFields?.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        // stylowanie inputu jeśli nie zostal wypełniony -cos dynamicznego
        className={emptyFields?.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
