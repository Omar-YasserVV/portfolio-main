"use client";
import React, { useState, useEffect } from "react";
import { isMobile } from "@/lib/mobileOptimizations";

export function NavigationDemo() {
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setIsMobileDevice(isMobile());
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsMobileDevice(isMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        Loading navigation demo...
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg border">
      <h3 className="text-lg font-semibold mb-2">Navigation Demo</h3>
      <div className="space-y-2 text-sm">
        <p>
          <strong>Screen Width:</strong> {screenWidth}px
        </p>
        <p>
          <strong>Is Mobile Device:</strong> {isMobileDevice ? "Yes" : "No"}
        </p>
        <p>
          <strong>Navigation Type:</strong>{" "}
          {isMobileDevice ? "Floating Navbar (Top)" : "Floating Dock (Bottom)"}
        </p>
        <div className="mt-3 p-2 bg-blue-50 rounded">
          <p className="text-blue-800">
            {isMobileDevice
              ? "📱 Mobile: Using floating navbar at the top with scroll-based visibility"
              : "🖥️ Desktop: Using floating dock at the bottom with hover effects"}
          </p>
        </div>
      </div>
    </div>
  );
}
