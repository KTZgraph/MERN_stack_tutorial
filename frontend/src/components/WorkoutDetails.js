import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    // async to teraz mozemy użyć w środku await
    // jest to potrzebne bo komunikujemy się z naszym api, które odpowiada asynchronicznie
    // iid jest potrzebne do endpointa, a mamy do niego dostęp bo cały komponent ma przekazany jako props konkrenty obiket workout
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });

    // json to zwrtoka z serwera w formacie json, tutaj serwer zwrócić właśnie usunięty obiekt z bazy
    const json = await response.json();

    // sprawdzamy czy response na pewno jest ok
    if (response.ok) {
      // update globalnego stanu
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;