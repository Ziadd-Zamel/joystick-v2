"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col items-center justify-center text-gray-800 text-center px-4">
      <div className="max-w-md w-full">
        {/* 404 Number */}
        <div className="text-8xl sm:text-9xl font-bold text-gray-900/20 mb-4 select-none">404</div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Page Not Found</h1>

        {/* Description */}
        <p className="text-lg sm:text-xl mb-8 text-gray-700">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl font-semibold text-white bg-main hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg"
          >
            Go Home
          </Link>

          <Button
            onClick={handleGoBack}
            className="px-6 py-[26px] cursor-pointer rounded-xl font-semibold text-gray-800 bg-transparent border-main border-1 hover:bg-main hover:text-white transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-main/50 shadow-lg"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
