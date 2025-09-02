"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  // Log error for monitoring/debugging
  React.useEffect(() => {
    console.error("Error boundary caught:", error);
    // Add your error reporting service here
    // trackError(error);
  }, [error]);

  // Get user-friendly error message based on error type
  const getErrorMessage = (error: Error) => {
    if (error.message.includes("ChunkLoadError")) {
      return "Please refresh the page to load the latest version.";
    }
    if (error.message.includes("Network")) {
      return "Network error occurred. Please check your connection and try again.";
    }
    if (error.message.includes("timeout")) {
      return "Request timed out. Please try again.";
    }
    return "An unexpected error occurred. Please try again.";
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen bg-hero-gradient flex flex-col items-center justify-center text-gray-800 text-center px-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md w-full">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900" id="error-title">
          Something went wrong
        </h1>

        <p className="text-lg sm:text-xl mb-8 text-gray-700" aria-describedby="error-title">
          {getErrorMessage(error)}
        </p>

        {/* Action buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          <Button
            onClick={reset}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg"
            aria-label="Try the action again"
          >
            Try Again
          </Button>

          <Button
            onClick={handleRefresh}
            className="px-6 py-3 rounded-xl font-semibold text-gray-800 bg-white/80 hover:bg-white/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50 shadow-lg"
            aria-label="Refresh the page"
          >
            Refresh Page
          </Button>

          <Button
            onClick={handleGoHome}
            className="px-6 py-3 rounded-xl font-semibold text-gray-800 bg-gray-200/80 hover:bg-gray-300/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50 shadow-lg"
            aria-label="Go to home page"
          >
            Go Home
          </Button>
        </div>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 text-sm text-gray-600 text-left max-w-full">
            <summary className="cursor-pointer hover:text-gray-800 transition-colors mb-2 text-center">
              Show Error Details
            </summary>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg overflow-auto border border-gray-300/50 shadow-lg">
              <p className="font-semibold mb-2 text-gray-800">Error Message:</p>
              <pre className="whitespace-pre-wrap break-words mb-4 text-red-700 bg-red-50/80 p-2 rounded">
                {error.message}
              </pre>

              {error.stack && (
                <>
                  <p className="font-semibold mb-2 text-gray-800">Stack Trace:</p>
                  <pre className="whitespace-pre-wrap break-words text-xs text-gray-700 font-mono bg-gray-50/80 p-2 rounded">
                    {error.stack}
                  </pre>
                </>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
