import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Fix for default marker icons in React-Leaflet (using type assertion to avoid TypeScript warning)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom animated marker icon
const pulsingIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div class="marker-container">
      <div class="marker-pulse"></div>
      <div class="marker-icon">📍</div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Component for lazy loading the map
const MapWithLoader = ({ position }: { position: [number, number] }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
      
      <div className={`h-full w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full"
          whenReady={() => setIsLoaded(true)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <AnimatedMarker position={position} />
        </MapContainer>
      </div>
    </div>
  );
};

// Animated marker component
const AnimatedMarker = ({ position }: { position: [number, number] }) => {
  useEffect(() => {
    // Add CSS for the pulsing animation
    const style = document.createElement('style');
    style.textContent = `
      .marker-container {
        position: relative;
        width: 40px;
        height: 40px;
      }
      .marker-pulse {
        position: absolute;
        width: 30px;
        height: 30px;
        left: 5px;
        top: 5px;
        background: rgba(14, 232, 7, 0.4);
        border-radius: 50%;
        animation: pulse 1.5s infinite;
      }
      .marker-icon {
        position: absolute;
        font-size: 24px;
        left: 8px;
        top: 0;
        z-index: 1;
        transform-origin: bottom center;
        animation: bounce 1s infinite alternate;
      }
      @keyframes pulse {
        0% {
          transform: scale(0.5);
          opacity: 1;
        }
        100% {
          transform: scale(1.8);
          opacity: 0;
        }
      }
      @keyframes bounce {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(-5px);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <Marker position={position} icon={pulsingIcon}>
      <Popup className="custom-popup">
        <p className="font-semibold text-green-800">
          🍽️ Fourways Junction, Kiambu Road, Nairobi, Kenya
        </p>
      </Popup>
    </Marker>
  );
};

const AboutUs = () => {
  const position: [number, number] = [-1.2158, 36.8348];
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-amber-50 to-white py-8 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-gray-800 tracking-tight"
      >
        About Us
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 via-amber-200/30 to-white rounded-2xl transform transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:from-emerald-300/50 group-hover:via-amber-300/40" />
            
            <div className="relative h-full bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform group-hover:-translate-y-1">
              {/* Logo Container */}
              <div className="aspect-square w-full max-w-sm mx-auto mb-6 relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-amber-100 to-white rounded-xl" />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full w-full relative"
                >
                  <img
                    src="/LOGO.JPG"
                    alt="Business Logo"
                    className="absolute inset-0 w-full h-full object-contain p-4 rounded-xl transition-transform duration-700 group-hover:scale-[1.03]"
                    onLoad={() => setIsLoaded(true)}
                    loading="eager"
                  />
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-center space-y-4"
              >
                <p className="text-2xl md:text-3xl text-gray-800 font-medium leading-relaxed transition-all duration-500 group-hover:text-emerald-600">
                  Made with passion,
                  <br />
                  served with love
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  We believe in creating exceptional experiences that blend tradition 
                  with innovation. Our commitment to quality and service excellence 
                  drives everything we do.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 via-emerald-200/30 to-white rounded-2xl transform transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:from-amber-300/50 group-hover:via-emerald-300/40" />
            
            <div className="relative h-full bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform group-hover:-translate-y-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center transition-all duration-500 group-hover:text-amber-600">
                Find Us
              </h2>
              
              <div className="w-full aspect-square max-w-sm mx-auto relative rounded-xl overflow-hidden shadow-lg">
                <MapWithLoader position={position} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ y: -5 }}
                className="mt-6 p-4 bg-gradient-to-br from-emerald-100/50 via-amber-100/50 to-white rounded-lg shadow-md"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-2xl animate-bounce">📍</div>
                  <p className="text-lg text-gray-800 font-medium">
                    Fourways Junction, Kiambu Road
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;