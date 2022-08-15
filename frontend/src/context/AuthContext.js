import { createContext, useReducer } from "react";

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
