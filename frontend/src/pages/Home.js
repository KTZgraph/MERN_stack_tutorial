import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // mój cutomowy hook musi być osobno na górze kompinetu (w sensie nie moze być w hooku useState); workouts na początku null
  const { workouts, dispatch } = useWorkoutsContext();

  // cały useEffect NIE powinien być async
  useEffect(() => {
    const fetchWorkouts = async () => {
      // teraz tu w środku mogę użyć słowa kluczowego await
      //   jak mamy "proxy": "http://localhost:4000", w forntent/package.json to do fetcha nie możemy używać http://localhost:4000
      //   top też usuwa błą CORS z consoli
      const response = await fetch("/api/workouts");
      const json = await response.json();

      // sprawdzam czy 200 HTTP
      if (response.ok) {
        // aktualizowanie globalnego stanu
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
    // [] dependency - useEffect hook wywoła się tylko raz gdy argument to pusta lista
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
