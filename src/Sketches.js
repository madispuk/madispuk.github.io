import React, { useState } from "react";
import { MapContainer, WMSTileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "proj4leaflet";
import "./App.css";
import { sketches } from "./data";
import { Overlay } from "./Overlay";
import { crs } from "./utils";

function App() {
  const [sketch, setSelectedSketch] = useState(sketches[0]);
  const [opacity, setOpacity] = useState(0.6);

  const handleSketchChange = (e) => {
    setSelectedSketch(sketches.find((o) => o.image === e.target.value));
  };

  const handleOpacityChange = (e) => {
    setOpacity(parseFloat(e.target.value));
  };

  const toggleOpacity = () => {
    setOpacity((p) => (p === 1 ? 0 : 1));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-gray-900 items-center lg:p-4">
      <div className="w-full lg:mb-4 flex-grow">
        <MapContainer className="h-full w-full" center={[59.43, 24.73]} zoom={14} crs={crs}>
          <WMSTileLayer
            url="https://kaart.maaamet.ee/wms/alus?"
            layers="of10000"
            format="image/png"
            transparent={false}
          />
          <Overlay
            imageUrl={sketch.image}
            bounds={sketch.bounds}
            center={sketch.center}
            zoom={sketch.zoom}
            opacity={opacity}
          />
        </MapContainer>
      </div>

      <div className="w-full lg:w-1/2 md:gap-4 mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 lg:w-1/2 p-2 lg:p-4">
          <div className="mb-4">
            <select
              id="image-select"
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm"
              onChange={handleSketchChange}
              value={sketch.image}
            >
              {sketches.map((o) => (
                <option key={o.image} value={o.image}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-start mb-4">
            <label className="text-sm font-medium text-slate-600" htmlFor="opacity">
              Opacity:
            </label>
            <span className="font-bold text-slate-600 pl-2">{opacity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            id="opacity"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={handleOpacityChange}
            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
          />

          <div className="mt-4">
            <button
              onClick={toggleOpacity}
              className="w-full px-4 py-2 bg-linnad-primary-700 text-white font-semibold rounded-lg shadow-md hover:bg-linnad-primary-600 transition duration-200"
            >
              Toggle
            </button>
          </div>
        </div>

        <div className="hidden md:block w-full md:w-1/2 lg:w-1/2 p-4 bg-gray-100 rounded-lg shadow-inner mt-4 md:mt-0">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{sketch.info.title}</h2>
          <p className="text-gray-600">{sketch.info.description}</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <a href={sketch.info.url} target="_blank" rel="noopener noreferrer">
                {sketch.info.url}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
