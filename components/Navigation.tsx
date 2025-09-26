"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { isLowPerformanceDevice } from "@/lib/mobileOptimizations";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconBriefcase,
  IconMessageCircle,
  IconUser,
  IconArticle,
} from "@tabler/icons-react";

// Navigation configuration
const NAVIGATION_CONFIG = {
  home: {
    mobile: [
      { name: "Home", link: "#", icon: <IconHome className="h-4 w-4" /> },
      { name: "About", link: "#about", icon: <IconUser className="h-4 w-4" /> },
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
    ],
    desktop: [
      {
        id: 1,
        title: "Home",
        icon: (
          <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
      },
      {
        id: 2,
        title: "About",
        icon: (
          <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#about",
      },
      {
        id: 3,
        title: "Projects",
        icon: (
          <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#projects",
      },
      {
        id: 4,
        title: "Contact",
        icon: (
          <IconMessageCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#contact",
      },
      {
        id: 5,
        title: "Blog",
        icon: <IconArticle className="h-full w-full text-yellow-300" />,
        href: "/blog",
      },
      {
        id: 6,
        title: "LinkedIn",
        icon: (
          <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://www.linkedin.com/in/omaryvsser",
      },
      {
        id: 7,
        title: "GitHub",
        icon: (
          <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://github.com/Omar-YasserVV",
      },
    ],
  },
  blog: {
    mobile: [
      { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
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
    ],
    desktop: [
      {
        id: 1,
        title: "Home",
        icon: (
          <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/",
      },
      {
        id: 2,
        title: "LinkedIn",
        icon: (
          <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://www.linkedin.com/in/omaryvsser",
      },
      {
        id: 3,
        title: "GitHub",
        icon: (
          <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://github.com/Omar-YasserVV",
      },
    ],
  },
};

// Mobile Navigation Component
const MobileNav = ({
  navItems,
  className,
}: {
  navItems: any[];
  className?: string;
}) => {
  const isLowPerformance = isLowPerformanceDevice();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const now = Date.now();
      if (isLowPerformance && now - lastUpdateTime < 100) {
        return;
      }
      setLastUpdateTime(now);

      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleClick = (navItem: any, e: React.MouseEvent) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (navItem.link === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (navItem.link.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(navItem.link);
      if (element) {
        const navHeight = 60;
        const elementPosition = element.offsetTop - navHeight - 20;
        setTimeout(() => {
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }, 100);
      }
    } else if (navItem.link.startsWith("http")) {
      e.preventDefault();
      window.open(navItem.link, "_blank");
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-4 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
            onClick={(e) => handleClick(navItem, e)}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-sm !cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

// Desktop Dock Component
const DesktopDock = ({ navItems }: { navItems: any[] }) => {
  const handleClick = (href: string, e: React.MouseEvent) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const dockHeight = 120;
        const elementPosition = element.offsetTop - dockHeight - 20;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    } else if (href.startsWith("http")) {
      e.preventDefault();
      window.open(href, "_blank");
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[5000]">
      <FloatingDock
        items={navItems.map((link) => ({
          ...link,
          href: link.href,
          onClick: (e: React.MouseEvent) => handleClick(link.href, e),
        }))}
      />
    </div>
  );
};

// Main Navigation Component
export const Navigation = ({
  variant = "home",
  className,
}: {
  variant?: "home" | "blog";
  className?: string;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => window.innerWidth < 768;
    setIsMobileDevice(checkIsMobile());

    const handleResize = () => {
      setIsMobileDevice(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return null;
  }

  const config = NAVIGATION_CONFIG[variant];

  if (isMobileDevice) {
    return <MobileNav navItems={config.mobile} className={className} />;
  }

  return <DesktopDock navItems={config.desktop} />;
};

// Export for backward compatibility
export const HomePageNavigation = () => <Navigation variant="home" />;
export const BlogResponsiveNavigation = () => <Navigation variant="blog" />;
