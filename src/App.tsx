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
      <div className="section">
        <HeroSection />
      </div>
      <div className="section">
        <Menu />
      </div>
      <div className="section">
        <CateringServices />
      </div>

      <div className="section">
        <AboutUs />
      </div>
      <div className="section">
        <Gallery />
      </div>
      <div className="section">
        <Testimonials />
      </div>
     
      <div className="section">
        <ContactUs />
      </div>
      <div className="section">
        <Footer />
      </div>

      {/* Other components will be added here */}
    </div>
  );
}


export default App;
