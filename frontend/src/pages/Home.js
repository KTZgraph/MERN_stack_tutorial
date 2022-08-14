import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  // cały useEffect NIE powinien być async
  useEffect(() => {
    const fetchWorkouts = async () => {
      // teraz tu w środku mogę użyć słowa kluczowego await
      //   jak mamy "proxy": "http://localhost:4000", w forntent/package.json to do fetcha nie możemy używać http://localhost:4000
      //   top też usuwa błą CORS z consoli
      const response = await fetch("/api/workouts");
      console.log("response: ", response);
      // parsujemy odpowiedź do jsona listy
      const json = await response.json();
      console.log("json: ", json);

      // sprawdzam czy 200 HTTP
      if (response.ok) {
        setWorkouts(json);
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
