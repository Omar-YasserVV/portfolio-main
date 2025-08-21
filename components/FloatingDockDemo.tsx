import React, { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconBriefcase,
  IconMessageCircle,
  IconUser,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }
  const links = [
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
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/omaryvsser",
    },
    {
      id: 6,
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Omar-YasserVV",
    },
  ];

  const handleClick = (href: string, e: React.MouseEvent) => {
    // Check if we're in the browser environment
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (href === "#") {
      // Home link - scroll to top
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const dockHeight = 120;
        const elementPosition = element.offsetTop - dockHeight - 20;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[5000]">
      <FloatingDock
        // mobileClassName="translate-y-8"
        items={links.map((link) => ({
          ...link,
          href: link.href,
          onClick: (e: React.MouseEvent) => handleClick(link.href, e),
        }))}
      />
    </div>
  );
}
