import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Features from './Components/Features';
import LoginComponent from './Components/LoginComponent';
import Hero from './Components/Hero';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {<Route path="/" element={<Home />} /> }
          {<Route path="/about" element={<About />} /> }
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
        <Hero />
        <Features/>
      </div>
    </Router>
  );
}

export default App;