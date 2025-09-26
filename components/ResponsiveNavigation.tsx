"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { isLowPerformanceDevice, isMobile } from "@/lib/mobileOptimizations";
import { HomePageFloatingDock } from "@/components/HomePageFloatingDock";
import { HomeMobileFloatingNav } from "@/components/HomeMobileFloatingNav";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconBriefcase,
  IconMessageCircle,
  IconUser,
  IconArticle,
} from "@tabler/icons-react";

export function ResponsiveNavigation() {
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
      link: "#",
      icon: <IconHome className="h-4 w-4" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <IconBriefcase className="h-4 w-4" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <IconMessageCircle className="h-4 w-4" />,
    },
    {
      name: "Blog",
      link: "/blog",
      icon: <IconArticle className="h-4 w-4" />,
    },
  ];

  // Show floating navbar for mobile devices (screen width < 768px)
  if (isMobileDevice) {
    return <HomeMobileFloatingNav navItems={navItems} />;
  }

  // Show floating dock for desktop devices (screen width >= 768px)
  return <HomePageFloatingDock />;
}
