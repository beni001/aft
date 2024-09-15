import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Menu from './components/Menu';
import CateringServices from './components/CateringServices';
import AboutUs from './components/AboutUs';
import Reservations from './components/Reservations';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <Menu />
      <CateringServices />
      <AboutUs />
      <Reservations />
      <Testimonials />
      <Gallery/>
      <ContactUs/>
      <Footer/>

      {/* Other components will be added here */}
    </div>
  );
}

export default App;
