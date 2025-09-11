"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { UseFormReturn } from "react-hook-form";
import { UserAddressFormValues } from "./add-new-address-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const containerStyle = {
  width: "100%",
  height: "200px",
};

const defaultCenter = {
  lat: 30.0444,
  lng: 31.2357,
};

interface AppMapProps {
  form: UseFormReturn<UserAddressFormValues>;
  address?: string;
}

const libraries: "places"[] = ["places"];

export default function AddLatLongMap({ form, address }: AppMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newLocation = { lat, lng };

    setSelectedLocation(newLocation);
    setMapCenter(newLocation);

    // Update form values directly
    form.setValue("latitude", lat);
    form.setValue("longitude", lng);

    // Reverse geocoding → get human-readable address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newLocation }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        form.setValue("address", results[0].formatted_address);
      }
    });
  };

  useEffect(() => {
    if (address && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const location = results[0].geometry.location;
          const newLocation = { lat: location.lat(), lng: location.lng() };

          setSelectedLocation(newLocation);
          setMapCenter(newLocation);

          form.setValue("latitude", newLocation.lat);
          form.setValue("longitude", newLocation.lng);
          form.setValue("address", results[0].formatted_address);
        }
      });
    }
  }, [address, isLoaded]);

  if (!isLoaded) return <Skeleton className="h-[200px] w-full"></Skeleton>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={12}
      onClick={handleMapClick}
    >
      {selectedLocation && (
        <Marker position={selectedLocation} draggable onDragEnd={handleMapClick} />
      )}
    </GoogleMap>
  );
}
