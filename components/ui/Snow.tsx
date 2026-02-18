"use client"; // Essential for Next.js App Router

import { useEffect, useState } from "react";

export default function SnowFall() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load and register the StencilJS web component
    const loadSnowEffect = async () => {
      try {
        // Try using the loader first (works with npm version)
        const loader = await import("@le-pepe/snow-effect/loader");
        if (loader.defineCustomElements) {
          loader.defineCustomElements();
          setIsReady(true);
          return;
        }
      } catch (err) {
        // If loader fails, try importing the main module
        console.warn("Loader not available, trying main module:", err);
      }

      try {
        // Fallback: import main module which may auto-register
        await import("@le-pepe/snow-effect");
        setIsReady(true);
      } catch (fallbackErr) {
        console.error("Failed to load snow effect:", fallbackErr);
      }
    };

    loadSnowEffect();
  }, []);

  // Use the web component with attributes
  if (!isReady) {
    return null;
  }

  return (
    <>
      <div className="max-md:hidden">
        <snow-effect
          flakes={150}
          color="#ffffff"
          speed={1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      </div>
      <div className="md:hidden">
        <snow-effect
          flakes={20}
          color="#ffffff"
          speed={0.7}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      </div>
    </>
  );
}
