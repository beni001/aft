import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AboutUs = () => {
  const position: LatLngTuple = [-1.2158, 36.8349];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0fe807]/5 via-[#e8ac07]/5 to-white py-12 px-4 sm:px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
        About Us
      </h1>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo Section */}
          <div className="group relative h-[60vh] md:h-auto">
            {/* Enhanced Backdrop Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0fe807]/30 via-[#e8ac07]/20 to-white rounded-2xl transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:from-[#0fe807]/40 group-hover:via-[#e8ac07]/30" />
            
            <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-[0_20px_50px_rgba(14,232,7,0.2)] hover:shadow-[0_25px_60px_rgba(232,172,7,0.3)] transition-all duration-500 ease-out transform group-hover:-translate-y-2">
              {/* Square Logo Container */}
              <div className="aspect-square w-full max-w-xs mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0fe807]/10 via-[#e8ac07]/10 to-white rounded-xl transform transition-all duration-500 group-hover:from-[#0fe807]/20 group-hover:via-[#e8ac07]/20" />
                <img
                  src="/LOGO.JPG"
                  alt="Business Logo"
                  className="absolute inset-0 w-full h-full object-contain p-4 rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="text-center space-y-3">
                <p className="text-xl md:text-2xl text-black font-medium leading-relaxed transition-all duration-300 group-hover:text-[#0fe807]">
                  Made with passion,
                  <br />
                  served with love
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  We believe in creating exceptional experiences that blend tradition 
                  with innovation. Our commitment to quality and service excellence 
                  drives everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="group relative h-[60vh] md:h-auto">
            {/* Enhanced Backdrop Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8ac07]/30 via-[#0fe807]/20 to-white rounded-2xl transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:from-[#e8ac07]/40 group-hover:via-[#0fe807]/30" />
            
            <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-[0_20px_50px_rgba(232,172,7,0.2)] hover:shadow-[0_25px_60px_rgba(14,232,7,0.3)] transition-all duration-500 ease-out transform group-hover:-translate-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 text-center transition-all duration-300 group-hover:text-[#e8ac07]">
                Find Us
              </h2>
              
              <div className="aspect-square w-full max-w-xs mx-auto relative rounded-xl overflow-hidden shadow-lg">
                <MapContainer
                  center={position}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>
                      <p className="font-semibold">
                        📍 Fourways Junction, Kiambu Road, Nairobi, Kenya
                      </p>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-br from-[#0fe807]/10 via-[#e8ac07]/10 to-white rounded-lg shadow-lg transform transition-all duration-500 group-hover:translate-y-1 group-hover:shadow-xl">
                <p className="text-lg text-black text-center">
                  📍 Fourways Junction, Kiambu Road
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;