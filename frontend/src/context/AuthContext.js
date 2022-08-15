import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

// albo state, action ale to ma być poprzedni stan
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        // z serwera payload to user
        user: action.payload,
      };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //   sprawdzam czy token jest w localstorage bo inaczej co odświeżenie te informacje giną i dla frontu to jest jakby user nie był zalogowany
  useEffect(
    () => {
      // sprawdzam czym mam token w lokal storange - parsowanie jsona na obiket
      const user = JSON.parse(localStorage.getItem("user"));

      //   jeśli mam wartość
      if (user) {
        // to wywołaj akcję login z payloadem z localStorage, jak jest user to go zapisze do globalnego stanu
        dispatch({ type: "LOGIN", payload: user });
      }
    },
    // pusta list a- only fires once
    []
  );

  console.log("AuthContext state: ", state);

  //   trzeba zwócić tempalte
  return (
    // jako zmienną można być dac samego state.user a nie spread operator, ale to bedzie mega wygodne gdy będziemy mieć więcj stanów
    // dispatch tez przekazujemy bo musimy przekazać/ używać funckję gdzie indziej
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {/* to opakowuje całapalikację */}
      {children}
    </AuthContext.Provider>
  );
};
