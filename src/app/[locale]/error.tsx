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
      className="bg-hero-gradient flex min-h-screen flex-col items-center justify-center px-4 text-center text-gray-800"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl" id="error-title">
          Something went wrong
        </h1>

        <p className="mb-8 text-lg text-gray-700 sm:text-xl" aria-describedby="error-title">
          {getErrorMessage(error)}
        </p>

        {/* Action buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <Button
            onClick={reset}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
            aria-label="Try the action again"
          >
            Try Again
          </Button>

          <Button
            onClick={handleRefresh}
            className="rounded-xl bg-white/80 px-6 py-3 font-semibold text-gray-800 shadow-lg transition-colors duration-200 hover:bg-white/90 focus:ring-2 focus:ring-gray-400/50 focus:outline-none"
            aria-label="Refresh the page"
          >
            Refresh Page
          </Button>

          <Button
            onClick={handleGoHome}
            className="rounded-xl bg-gray-200/80 px-6 py-3 font-semibold text-gray-800 shadow-lg transition-colors duration-200 hover:bg-gray-300/80 focus:ring-2 focus:ring-gray-400/50 focus:outline-none"
            aria-label="Go to home page"
          >
            Go Home
          </Button>
        </div>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 max-w-full text-left text-sm text-gray-600">
            <summary className="mb-2 cursor-pointer text-center transition-colors hover:text-gray-800">
              Show Error Details
            </summary>
            <div className="overflow-auto rounded-lg border border-gray-300/50 bg-white/70 p-4 shadow-lg backdrop-blur-sm">
              <p className="mb-2 font-semibold text-gray-800">Error Message:</p>
              <pre className="mb-4 rounded bg-red-50/80 p-2 break-words whitespace-pre-wrap text-red-700">
                {error.message}
              </pre>

              {error.stack && (
                <>
                  <p className="mb-2 font-semibold text-gray-800">Stack Trace:</p>
                  <pre className="rounded bg-gray-50/80 p-2 font-mono text-xs break-words whitespace-pre-wrap text-gray-700">
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
