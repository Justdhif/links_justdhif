'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Ensure the image is in the 'public/images/' folder
const profileIcon = new L.Icon({
  iconUrl: '/images/profile.jpg',
  iconSize: [70, 70],
  iconAnchor: [25, 50],
  popupAnchor: [0, -45],
  className: 'border-2 border-cyan-500 rounded-full',
});

const CustomMap = () => {
  const location = {
    latitude: -6.3947602, // Location from Google Maps link
    longitude: 106.863421,
    city: 'Depok',
    country: 'Indonesia',
  };

  const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

  return (
    <motion.div
      className="text-center text-gray-300 bg-gray-800 p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-bold">
        📍 Mama Tari's Boarding House Location
      </h2>
      <p>
        {location.city}, {location.country}
      </p>

      <div className="relative w-full h-60 rounded-lg overflow-hidden mt-3">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={17}
          className="w-full h-full z-10"
        >
          <TileLayer url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=23ab47cbb15d4d7d91276367cec976ac" />

          {/* Marker for Mama Tari's Boarding House */}
          <Marker
            position={[location.latitude, location.longitude]}
            icon={profileIcon}
          >
            <Popup>
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Open in Google Maps
              </a>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
}

export default CustomMap;
