import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Menu from './components/Menu';
import CateringServices from './components/CateringServices';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Sections with unique IDs */}
      <div id="home" className="section">
        <HeroSection />
      </div>
      <div id="menu" className="section">
        <Menu />
      </div>
      <div id="catering" className="section">
        <CateringServices />
      </div>
      <div id="about" className="section">
        <AboutUs />
      </div>
      <div id="gallery" className="section">
        <Gallery />
      </div>
      <div id="testimonials" className="section">
        <Testimonials />
      </div>
      <div id="contact" className="section">
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
}

export default App;
