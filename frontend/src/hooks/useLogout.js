import { useAuthContext } from "./useAuthContex";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  // wewnętrzna funckja
  const logout = () => {
    // nie trzeba się do backendu odnosić
    // remove user from storage, `user` to nasza nazwa
    localStorage.removeItem("user");

    //dispatch logout action - bez payload
    dispatch({ type: "LOGOUT" });
  };

  // return żeby używać gdzieś indziej tej funckji wewnętrznej
  //   uwaga na return - musza być wąsiaste nawiasy
  return { logout };
};
