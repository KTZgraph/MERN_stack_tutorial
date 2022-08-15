import { useAuthContext } from "./useAuthContex";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  // destrukturyzacja ze zmianą nazwy bo konfilkt
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  // wewnętrzna funckja
  const logout = () => {
    // nie trzeba się do backendu odnosić
    // remove user from storage, `user` to nasza nazwa
    localStorage.removeItem("user");

    //dispatch logout action - bez payload
    dispatch({ type: "LOGOUT" });

    // czyszczenie globalnego stanu z ćwiczeń
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  // return żeby używać gdzieś indziej tej funckji wewnętrznej
  //   uwaga na return - musza być wąsiaste nawiasy
  return { logout };
};
