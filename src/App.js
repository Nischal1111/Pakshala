import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reservations from '../src/Pages/Reservations';
import Home from '../src/Pages/Home';
import Menu from '../src/Pages/Menu';
import Contact from '../src/Pages/Contact';
import ScrollToTop from '../src/components/ScrollToTop';
import About from '../src/Pages/About';

function App() {
  return (
    <>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
