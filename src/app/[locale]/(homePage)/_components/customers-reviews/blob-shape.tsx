import React from "react";

export default function BlobShape() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#02A09B" />
          <stop offset="100%" stopColor="#073433" />
        </linearGradient>
      </defs>

      <path
        fill="url(#blobGradient)"
        d="M55.2,-43.2C69.9,-25.6,79.1,-2.7,75.4,18.7C71.7,40.2,55.2,60.3,35,68.2C14.9,76.2,-8.9,72,-30.8,62.1C-52.7,52.3,-72.7,36.7,-78.2,16.7C-83.7,-3.4,-74.8,-27.9,-59.3,-45.7C-43.9,-63.4,-21.9,-74.4,-0.8,-73.7C20.3,-73,40.5,-60.8,55.2,-43.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
