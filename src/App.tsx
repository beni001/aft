import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Menu from "./components/Menu";
import CateringServices from "./components/CateringServices";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { FoodItem, Section, SubSection } from "./Types";
import { menuData as staticMenuData } from "./components/data/MenuData";
import axios from "axios";




const App = () => {
  const [menuData, setMenuData] = useState<Section[]>([]);
  const [loadingState, setLoadingState] = useState({
    isLoading: true, // ✅ Ensure this is included
    error: null as string | null,
    retry: () => fetchMenu(),
    isUsingStaticData: false,
  });

  const fetchMenu = async () => {
    setLoadingState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Try fetching menu data from the API
      const response = await axios.get<Section[]>("http://localhost:5000/api/sections");
      setMenuData(response.data);
      setLoadingState(prev => ({ ...prev, isLoading: false, isUsingStaticData: false }));
    } catch (error) {
      console.error("Failed to fetch menu, using static data.");
      setMenuData(staticMenuData); // ✅ Use the imported static data
      setLoadingState(prev => ({
        ...prev,
        isLoading: false,
        error: "Error fetching menu",
        isUsingStaticData: true,
      }));
    }
  };

  useEffect(() => {
    setLoadingState(prev => ({ ...prev, retry: fetchMenu }));
    fetchMenu();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div id="home" className="section">
        <HeroSection />
      </div>
      <div id="menu" className="section">
        <Menu sections={menuData} loadingState={loadingState} />
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
};

export default App;
