import React, { useRef, useEffect, useState } from "react";
import { MapContainer, useMap, WMSTileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "proj4leaflet";
import "./App.css";
import PageTitle from ".//PageTitle";

const crs = new L.Proj.CRS(
  "EPSG:3301",
  "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
  {
    resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625],
  },
);

const imageOverlays = [
  {
    name: "Koidu",
    image: "images/kohalik-full.png",
    bounds: [
      [59.4297422, 24.7281193],
      [59.4192639, 24.7446606],
    ],
    center: [59.4244552, 24.732682],
    zoom: 11,
    info: {
      title: "Koidu tänava arhitektuurivõistlus 2023-2024",
      url: "https://www.tallinn.ee/et/koidu",
      description:
        "Ideekavand 'Kohalik'. OÜ Stuudio Täna arhitektid Tristan Krevald, Ra Martin Puhkan, Siim Tanel Tõnisson ja Madis Eek.",
    },
  },
  {
    name: "Liivalaia",
    image: "images/liivalaia-200-no-alpha.png",
    bounds: [
      [59.435725, 24.72035],
      [59.424995, 24.765921],
    ],
    center: [59.42725, 24.742649],
    zoom: 11,
    info: {
      title:
        "Liivalaia tänava rekonstrueerimise ja trammitee rajamise projekteerimistingimuste eelnõu avalik väljapanek (24.09.-07.10.2024)",
      url: "https://www.tallinn.ee/et/liivalaia",
      description: "Tallinna Kesklinna Valitsus ning Tallinna Keskkonna- ja Kommunaalamet",
    },
  },
  {
    name: "Poska",
    image: "images/poska.png",
    bounds: [
      [59.4438607, 24.7839889],
      [59.4401005, 24.7865829],
    ],
    info: {
      title: "J. Poska - Reidi tee rattatee põhiprojekt (september 2024)",
      url: "https://www.tallinn.ee/et/poskareidi",
      description:
        "Projekti eesmärk on Tallinna Kesklinnas asuvale Narva mnt 69 kinnistule projekteerida rattatee, mis ühendaks Reidi teed ja J. Poska tänavat. See tagab ühenduse Narva maantee ja Reidi tee vahel ning võimaldab sealt edasi liikuda Pirita promenaadile.",
    },
  },
  {
    name: "Paldiski mnt",
    image: "images/paldiski-mnt.png",
    bounds: [
      [59.4325472, 24.6997364],
      [59.4280967, 24.7142602],
    ],
    info: {
      title: "Paldiski mnt, Merimetsa tee ja Hipodroomi tänava rekonstrueerimine",
      url: "https://www.tallinn.ee/et/paldiskimnt",
      description:
        "Projekti eesmärgiks on koostada Paldiski maantee rekonstrueerimise lahendus alates Mooni tänavast kuni Mustamäe tee- Endla tn- Paldiski mnt ristmikuni, mille tulemusel luuakse turvalisem ja mugavam linnaruum kõigile liiklejatele.",
    },
  },
];

const MapWithImageOverlay = ({ imageUrl, center, zoom, bounds, opacity }) => {
  const map = useMap();
  const overlayRef = useRef(null);

  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    } else if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, center, zoom, bounds]);

  useEffect(() => {
    if (overlayRef.current) {
      map.removeLayer(overlayRef.current);
    }

    const newOverlay = L.imageOverlay(imageUrl, bounds, { opacity });
    overlayRef.current = newOverlay;
    newOverlay.addTo(map);

    return () => {
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, bounds, map]);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.setOpacity(opacity);
    }
  }, [opacity]);

  return null;
};

function App() {
  const [selectedImage, setSelectedImage] = useState(imageOverlays[0].image);
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

  const image = imageOverlays.find((o) => o.image === selectedImage);

  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex flex-col items-center p-4">
      <PageTitle title="linnad.ee - Tallinn" />
      <div className="w-full mb-4 flex-grow shadow-lg rounded-lg border border-gray-200 ">
        <MapContainer className="h-full w-full" center={[59.43, 24.73]} zoom={14} crs={crs}>
          <WMSTileLayer
            url="https://kaart.maaamet.ee/wms/alus?"
            layers="of10000"
            format="image/png"
            transparent={false}
          />
          <MapWithImageOverlay
            imageUrl={selectedImage}
            bounds={image.bounds}
            center={image.center}
            zoom={image.zoom}
            opacity={opacity}
          />
        </MapContainer>
      </div>

      <div className="w-full md:w-full lg:w-1/2 mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between">
        {/* Controls Block */}
        <div className="w-full md:w-1/2 lg:w-1/2 p-4">
          <div className="mb-4">
            <select
              id="image-select"
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm"
              onChange={handleImageChange}
              value={selectedImage}
            >
              {imageOverlays.map((o) => (
                <option key={o.image} value={o.image}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-start mb-4">
            <label className="text-sm font-medium text-gray-700" htmlFor="opacity">
              Opacity:
            </label>
            <span className="font-bold text-indigo-600 pl-2">{opacity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            id="opacity"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={handleOpacityChange}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />

          <div className="mt-4">
            <button
              onClick={toggleOpacity}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
            >
              Toggle
            </button>
          </div>
        </div>

        <div className="hidden md:block w-full md:w-1/2 lg:w-1/2 p-4 bg-gray-100 rounded-lg shadow-inner mt-4 md:mt-0">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{image.info?.title ?? "Image Info"}</h2>
          <p className="text-gray-600">{image.info?.description ?? "No description available."}</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <a href={image.info.url} target="_blank" rel="noopener noreferrer">
                {image.info.url}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
