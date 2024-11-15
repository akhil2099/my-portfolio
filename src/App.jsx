import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// All pages
import Cursor from './components/cursor';
import DevopsPortfolio from './pages/Devops-Portfolio';
import Contact from './pages/Contact';
import {useDocTitle} from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("itsmeakhil");

  return (
    <>
    <div>
    <Cursor/>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<DevopsPortfolio />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </ScrollToTop>
      </Router>
      </div>
    </>
  );
}


export default App;
