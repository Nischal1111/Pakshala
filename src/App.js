import { Route, Routes } from "react-router-dom";
import Reservations from "../src/Pages/Reservations"
import Home from "../src/Pages/Home"
import Menu from "../src/Pages/Menu"
import Contact from "../src/Pages/Contact"
import About from "../src/Pages/About"

function App() {
  return (
      <Routes>
        <Route element={<Home/>} path="/"></Route>
        <Route element={<Reservations/>} path="/reservations"></Route>
        <Route element={<Menu/>} path="/menu"></Route>
        <Route element={<About/>} path="/about"></Route>
        <Route element={<Contact/>} path="/contact"></Route>
      </Routes>
  );
}

export default App;
