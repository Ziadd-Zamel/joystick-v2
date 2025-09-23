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
    <div className="bg-hero-gradient flex min-h-screen flex-col items-center justify-center px-4 text-center text-gray-800">
      <div className="w-full max-w-md">
        {/* 404 Number */}
        <div className="mb-4 text-8xl font-bold text-gray-900/20 select-none sm:text-9xl">404</div>

        {/* Main heading */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Page Not Found</h1>

        {/* Description */}
        <p className="mb-8 text-lg text-gray-700 sm:text-xl">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-main rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-green-700 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
          >
            Go Home
          </Link>

          <Button
            onClick={handleGoBack}
            className="border-main hover:bg-main focus:ring-main/50 cursor-pointer rounded-xl border-1 bg-transparent px-6 py-[26px] font-semibold text-gray-800 shadow-lg transition-colors duration-500 hover:text-white focus:ring-2 focus:outline-none"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
