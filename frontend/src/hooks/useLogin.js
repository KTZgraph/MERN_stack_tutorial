import { useState } from "react";
import { useAuthContext } from "./useAuthContex";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // gloablny stan apliakcji
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      // error property z backendu nasz
      setError(json.error);
    }

    if (response.ok) {
      // save the user to the local storage -email i JWT, json to zwrotka z backendu a zwracam obiekt usera ={email, jwt)
      localStorage.setItem("user", JSON.stringify(json));

      //   update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  //   trzeba zwócić na końcu tgę funckję z wewnątrz hooka
  return { login, isLoading, error };
};
