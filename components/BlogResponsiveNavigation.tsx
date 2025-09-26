"use client";
import React, { useState, useEffect } from "react";
import { BlogPageFloatingDock } from "@/components/BlogPageFloatingDock";
import { MobileFloatingNav } from "@/components/MobileFloatingNav";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconArticle,
} from "@tabler/icons-react";

export function BlogResponsiveNavigation() {
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Use screen width for more reliable detection
    const checkIsMobile = () => {
      return window.innerWidth < 768; // md breakpoint
    };
    setIsMobileDevice(checkIsMobile());

    const handleResize = () => {
      setIsMobileDevice(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  // Navigation items for the floating navbar (mobile)
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4" />,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/omaryvsser",
      icon: <IconBrandLinkedin className="h-4 w-4" />,
    },
    {
      name: "GitHub",
      link: "https://github.com/Omar-YasserVV",
      icon: <IconBrandGithub className="h-4 w-4" />,
    },
  ];

  // Show floating navbar for mobile devices (screen width < 768px)
  if (isMobileDevice) {
    return <MobileFloatingNav navItems={navItems} />;
  }

  // Show floating dock for desktop devices (screen width >= 768px)
  return <BlogPageFloatingDock />;
}
