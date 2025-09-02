"use client";

import { useState, useEffect } from "react";

export const useMediaChecker = () => {
  const [screenSizes, setScreenSizes] = useState<
    | {
        smScreen: boolean;
        mdScreen: boolean;
        lgScreen: boolean;
        xlScreen: boolean;
        xxlScreen: boolean;
      }
    | undefined
  >(undefined);

  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const updateScreenSizes = () => {
      const smScreen = window.innerWidth <= 640;
      const mdScreen = window.innerWidth > 640 && window.innerWidth <= 1024;
      const lgScreen = window.innerWidth > 1024 && window.innerWidth <= 1280;
      const xlScreen = window.innerWidth > 1280 && window.innerWidth <= 1536;
      const xxlScreen = window.innerWidth > 1536;
      const screenWidth = window.innerWidth;
      setScreenWidth(screenWidth);
      setScreenSizes({ smScreen, mdScreen, lgScreen, xlScreen, xxlScreen });
    };

    updateScreenSizes();

    window.addEventListener("resize", updateScreenSizes);

    return () => window.removeEventListener("resize", updateScreenSizes);
  }, []);

  return { screenSizes, screenWidth };
};
