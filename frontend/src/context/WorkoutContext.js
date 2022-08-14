// This might seeem like a lot of setup for just a small bit of global states but in the long run it makes things much easier
// especially when a lot of different components start to share and update the same state

import { createContext, useReducer } from "react";

// pamietać o eksporcie bo bedziemy tego potrzebować w innym pliku
export const WorkoutsContext = createContext(); //to zwrca prawidziwego Providera

//pamietać o exporcie "state" odpowiada `state` z const [state, dispatch] = useReducer(workoutsReducer, {workouts: null});
// `action ` odpowiada obiektowi `dispatch` z  const [state, dispatch] = useReducer(workoutsReducer, {workouts: null}); który dodatkowo ma 'payload' properrty
export const workoutsReducer = (state, action) => {
  // wewnątrz reducera to co zwykle robimy to sprawdzenie typu akcji - czyli to co właściwie chcemy zrobić z danymi
  // bo moze chcemy usunąć dane albo edytować a workout or add a workout or set them all etc
  // and the action type would be ddifferent for each of those different changes
  switch (action.type) {
    case "SET_WORKOUTS":
      // aktualizuje całą listę workouts, payload to tak naprawdę cała lista obiektow ktorą dostajemy z serwera
      // zależnie od typyu ackji zwracamy nową wartość którą checmy żeby był stan, wiec zwracamy nowy obiekt
      // if the case was 'SET_WORKOUTS' that would mean we want to set all of the workouts and what we do in each of these cases is return a new value
      // tha we want the state to be, so we return a new object in essence
      return {
        // so i'm gonna return an object and we only have one property, it's the `workouts` property and basically it's going to be the `action.payload`
        // because if we want to set all of the workouts then the payload property on the action that we pass into the dispatch function would be an array of all of the workouts
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        // this time we wanna return the `workouts` property inside the object but this time around it's going to be a new array
        // and we're going to add the `action.payload` which is going to be a single new workout object
        // so we're adding that new workout to his array ; Now we also want the rest of the workout data as well, so we can say
        // `, ...state.workouts] the current state <spreadOperator>state.mojeProperty
        //  this `...state.workouts` is the previous state ant the `workouts:` would be an array of pre-existing workout objects so
        // we're taking all of those and putiing those in the array as well BUT FIRST IS THE NEW ONE, so we;re kind of adding that one on the top
        // so we'd `dispatch` this kingd of action `CREATE_WORKOUT` when we want to  add something
        // and all of this is just for local state, by the way we;re not interactiong with database
        // - here this is just to keep the local state is sync with the database so we might add a new workout to the database  and at that point to keep the local
        // states in sync with the database we would dispatch a create workout action
        // so that locally in out application we have tha new workout as well
        workouts: [action.payload, ...state.workouts],
      };

    case "DELETE_WORKOUT":
      // obsługa usuwania obiektu
      return {
        // filtrowanie po całej liscie - state to poptrzedni stan
        // payload to ten json zwrotka z serwera właśnie usuniety workout
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      // defaultowo akcja zwócenie aktualnego stanu
      return state;
  }
};

// pamietać o eksporcie bo bedziemy tego potrzebować w innym pliku
export const WorkoutsContextProvider = ({ children }) => {
  // inny hook reactadwa argumenty : 1) funkcja, 2)poczatkowy stan
  // useReducer podobny do useState in that we get back a state value and a function 'dispatch' to update that state value and we also specify an initial value for the state
  // as well which is this object {workouts: null}
  // what is different about it is this reducer function right here 'workoutsReducer' how we update the state using this function and also dispatch function as well
  // so if we want to update this state object we first of all call the dispatch function and inside the `dispatch` function we would pass an object as an argument
  // obiekt przekazywany do funckji disptach ma dwa argumenty
  // 1) argument `type` gdzie WARTOSC_Z_WIELKICH_LITER opisuje akcje
  // and this object should have a `type` property which is normally a string all caps that describes in words the state change that we want to make so
  // for example this could be  dispatch({type: 'CREATE_WORKOUT'}) if we wanted to add a new workout
  // or it could be dispatch({type: 'SET_WORKOUTS'}) if we just want to fetch all of the workouts and we wanted to set the entire workouts property
  // 2) argument `payload` property
  // which represents any data we need to make this change so in this case it would be an array of workouts objects
  // dispatch({type: 'SET_WORKOUTS', payload:[{}, {}]}) so that's how we'd invoke this dispatch function and this argument inside it is known as an "action"

  // so when we call this `dispatch` function in turn our reducer function is invokee which is this `workoutsReducer` function and it passes the action into the
  // reducer function so that it can do its thing and update the state using that information and data
  const [state, dispatch] = useReducer(workoutsReducer, {
    // ta wartość może się zmienić w czasie
    workouts: null,
  });

  // musi zwrócić template jak każdy komponent reacta
  return (
    // każda wartośc jest dostępna w opakowanych komponentach
    // value={{workouts : []} to zło, bo p[rzeciez dane cały czas sie zmieniają - create, deltele , update, to powinien być 'a dynamic state value'
    // <WorkoutsContext.Provider value={{workouts : []}}> - lepszy jest useReducer inny hook wbudowany w Reacta
    // teraz musimy dostarczyć state i dispatch wartosci do wszsytkich opakowanych komponentów - ale te wartosci(funckja, obiekt z atrbutami) musza być w obiekcie
    // WARNING [19:53] użyma tutaj spread operator
    // so that insted of just providing this whole object waht I'm doing is I'm spreadiing out the different properties inside this object and we're providing those
    // so now this might as well just be  <WorkoutsContext.Provider value={{state.workouts, dispatch }}> like so, but it would be state.workouts
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {/* konsumowanie wartosci state, dispatch jest całkiem proste możemy użyć wbudowany w reacata hook useContext a potem wyspecifikować któy kontekst chcemy użyc
      but what I like to do is make a custom hook for each context that I have for example I'd make a use wokroput context hook for this context we just made and then 
      whenever I needed to use this context I'd just invoke tha hook, so let's do that - let;s make a new folder called `hooks`
      */}
      {/* ten opakowuje każdy komponent znajdujący się pomiędzy tagami */}
      {children}
    </WorkoutsContext.Provider>
  );
};
