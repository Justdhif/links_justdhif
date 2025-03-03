'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Impor komponen react-leaflet secara dinamis agar tidak error di SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

const CustomMap = () => {
  const location = {
    latitude: -6.3947602, // Lokasi dari Google Maps
    longitude: 106.863421,
    city: 'Depok',
    country: 'Indonesia',
  };

  const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

  // State untuk menyimpan Leaflet icon
  const [profileIcon, setProfileIcon] = useState(null);

  useEffect(() => {
    // Mengimpor leaflet hanya di client-side
    import('leaflet').then((L) => {
      setProfileIcon(
        new L.Icon({
          iconUrl: '/images/profile.jpg', // Path relatif di Next.js
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -45],
          className: 'border-2 border-cyan-500 rounded-full',
        })
      );
    });
  }, []);

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
        {profileIcon && ( // Render peta hanya jika Leaflet sudah siap
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={17}
            className="w-full h-full z-10"
          >
            <TileLayer url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=23ab47cbb15d4d7d91276367cec976ac" />
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
        )}
      </div>
    </motion.div>
  );
};

export default CustomMap;
