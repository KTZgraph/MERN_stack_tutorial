import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContex";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // mój cutomowy hook musi być osobno na górze kompinetu (w sensie nie moze być w hooku useState); workouts na początku null
  const { workouts, dispatch } = useWorkoutsContext();
  // pobranie danych zalogowanego usera z globalnego stanu
  const { user } = useAuthContext();

  // cały useEffect NIE powinien być async
  useEffect(() => {
    const fetchWorkouts = async () => {
      // teraz tu w środku mogę użyć słowa kluczowego await
      //   jak mamy "proxy": "http://localhost:4000", w forntent/package.json to do fetcha nie możemy używać http://localhost:4000
      //   top też usuwa błą CORS z consoli
      const response = await fetch("/api/workouts", {
        // authorization headers Bearer<spacja>token
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      // sprawdzam czy 200 HTTP
      if (response.ok) {
        // aktualizowanie globalnego stanu
        // użycie zewnętrzenj funckji która nigdzi enei jest w useEffect zdefiniowana
        // to mamy warning Line 32:6:  React Hook useEffect has a missing dependency: 'dispatch'
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      //jeśli user jest zalogowany pobierz dane
      fetchWorkouts();
    }

    // [] dependency - useEffect hook wywoła się tylko raz gdy argument to pusta lista
    //dispatch to zewnętrzna funckja i trzeba ją dodać jako dependecy
    // -that basically means whgenever the dispatch function changes in any way shape or form then it's going to rerun this useEffect function
  }, [dispatch]);

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
