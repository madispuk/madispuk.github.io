import { useRef, useEffect } from "react";
import { useMap } from "react-leaflet";

import L from "leaflet";
export const Overlay = ({ imageUrl, center, zoom, bounds, opacity }) => {
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
