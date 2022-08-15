// custom hook
// remember this is going to be the actual context not the provider component or anything else the actual context that we created at the top `WorkoutsContext`
// of the file frontend\src\context\WorkoutContext.js
import { WorkoutsContext } from "../context/WorkoutContext";
// and then we also need to import the useContext hook and that comes directly from the react itself which is what we'll be using inside this hook to
// consume the context okay
import { useContext } from "react";

// So once that's done we need to make the hook function which will also export as well
export const useWorkoutsContext = () => {
  //`context` tutaj downolna nazwa stałej;  useContext which is the hook we just grabbed at the top and we pass in the WorkoutsContext object
  //   so this hook returns to us the value of this context which remember is the value we passed into the provider component
  // so context object is the object with the state and the dispatch function
  const context = useContext(WorkoutsContext);
  //   so now we have tha object now stored in our context constant nad then we can just return this state at the bottom of the function of the hook
  // and this means that every time we want to use our workouts data we're just going to invoke this `useWorkoutsContext` hook and get that context value back

  // now another thing we can do inside this hook is just check that we're within the scope of the context we're using or trying to use
  // remember a context provider wraps a component tree that it wants to provide that context value to, in our case that's the root app component <App/> w frontend\src\App.js
  //   but it could have just been the Home component or some other sub tree of components and if that's the case it means you'd only ever be able to use this context
  // within that tree of components
  // and if it's being used outside tha component tree then the context will be `null` so in tha case insted of returning the context which would be pointless when it;s null
  // we can throw an error
  if (!context) {
    // sprawdza czy na pewno go używamy w root komponent, a jeśli nie to zwraca bład
    // so if we don't have a value for it, then we do something and the thing we want to do is throw an error
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
