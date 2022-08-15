import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContex";

//pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {/* navbar przy każdym komponencie, ale UWAGA musi być w BrowserRouter jeśli chcemy używać <Link> z react-router-dom */}
        <Navbar />
        {/* opakowuje wszystko co wymaga routing system */}
        <div className="pages">
          <Routes>
            {/* przekierowania do strony logowania niezalogowanego usera do logowania, a zalogowanego do głównej*/}
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
