"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { google } from "google-maps";
import { RegisterFields } from "@/lib/schemas/auth.schema";

const containerStyle = {
  width: "100%",
  height: "200px",
};

const defaultCenter = {
  lat: 30.0444,
  lng: 31.2357,
};

interface RegisterMapProps {
  setValue: UseFormSetValue<RegisterFields>;
  watch: UseFormWatch<RegisterFields>;
}

const RegisterMap: React.FC<RegisterMapProps> = ({ setValue, watch }) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // Watch the address field for changes
  const address = watch("address");

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedLocation({ lat, lng });

    // Set coordinates in form
    setValue("latitude", lat);
    setValue("longitude", lng);

    // Reverse Geocoding to get address from coordinates
    if (window.google?.maps?.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          setValue("address", results[0].formatted_address);
        }
      });
    }
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    handleMapClick(e);
  };

  useEffect(() => {
    if (address && address.trim() && window.google?.maps?.Geocoder) {
      // Geocoding to get coordinates from address
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          setSelectedLocation({ lat, lng });
          setValue("latitude", lat);
          setValue("longitude", lng);
          setMapCenter({ lat, lng });
        }
      });
    }
  }, [address, setValue]);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return;
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <div className="border-input w-full rounded-md border">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
          onClick={handleMapClick}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              clickable
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default RegisterMap;
