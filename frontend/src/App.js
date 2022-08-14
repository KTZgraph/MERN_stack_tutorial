import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* navbar przy każdym komponencie, ale UWAGA musi być w BrowserRouter jeśli chcemy używać <Link> z react-router-dom */}
      <Navbar/>
        {/* opakowuje wszystko co wymaga routing system */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
