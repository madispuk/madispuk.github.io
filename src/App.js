// App.js

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  useMap,
  WMSTileLayer,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "proj4leaflet";
import "./App.css";

// Map projection setup
const crs = new L.Proj.CRS(
  "EPSG:3301",
  "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
  {
    resolutions: [
      2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125,
      0.0625,
    ],
  },
);

// Predefined image overlays with bounds
const imageOverlays = {
  "liivalaia-200-no-alpha.png": [
    [59.435725, 24.72035],
    [59.424995, 24.765921],
  ],
  "kohalik-1.png": [
    [59.43014949, 24.72852105],
    [59.4266733, 24.7350316],
  ],
  "kohalik-2.png": [
    [59.42707108, 24.72916985],
    [59.42279257, 24.73667545],
  ],
  "kohalik-3.png": [
    [59.4238552, 24.7336033],
    [59.42036809, 24.74241055],
  ],
  "kohalik-4.png": [
    [59.4216241, 24.7396935],
    [59.4191323, 24.7443725],
  ],
};

const MapWithImageOverlay = ({ imageUrl, bounds, opacity }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds);
  }, [map, bounds]);

  return <ImageOverlay url={imageUrl} bounds={bounds} opacity={opacity} />;
};

function App() {
  const [selectedImage, setSelectedImage] = useState(
    "liivalaia-200-no-alpha.png",
  );
  const [opacity, setOpacity] = useState(0.6);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
  };

  const handleOpacityChange = (e) => {
    setOpacity(parseFloat(e.target.value));
  };

  const toggleOpacity = () => {
    setOpacity((prevOpacity) => (prevOpacity === 1 ? 0 : 1));
  };

  return (
    <div className="h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4 h-full flex flex-col">
        {/* Dropdown for selecting images */}
        <div className="flex justify-center p-4">
          <select
            id="image-select"
            className="w-full md:w-1/4 bg-white p-2 rounded-lg shadow-lg border border-gray-300"
            onChange={handleImageChange}
            value={selectedImage}
          >
            {Object.keys(imageOverlays).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {/* Map Container */}
        <div className="flex-grow">
          <MapContainer
            className="h-full map-container rounded shadow-lg border border-gray-300"
            center={[59.43, 24.73]} // Starting point near Liivalaia
            zoom={10}
            crs={crs}
          >
            {/* Add the TileLayer for the base map */}
            <WMSTileLayer
              url="https://kaart.maaamet.ee/wms/alus?"
              layers="of10000"
              format="image/png"
              transparent={false} // No transparency needed for base layer
            />
            <MapWithImageOverlay
              imageUrl={selectedImage}
              bounds={imageOverlays[selectedImage]}
              opacity={opacity}
            />
          </MapContainer>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-4 space-y-4 md:space-y-0 md:space-x-4">
          {/* Slider for opacity */}
          <div className="slider-group w-full md:w-1/2 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
            <label className="block text-sm font-semibold mb-2 text-center">
              Overlay Opacity:{" "}
              <span id="opacity-display" className="font-bold text-indigo-600">
                {opacity.toFixed(2)}
              </span>
            </label>
            <input
              type="range"
              id="opacity"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={handleOpacityChange}
              className="w-full h-2 bg-indigo-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleOpacity}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
          >
            Toggle Overlay
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
