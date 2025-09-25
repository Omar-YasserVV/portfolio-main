"use client";

import React, { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconArticle,
} from "@tabler/icons-react";

export function BlogPageFloatingDock() {
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
      href: "/",
    },
    // {
    //   id: 2,
    //   title: "Blog",
    //   icon: <IconArticle className="h-full w-full text-yellow-300" />,
    //   href: "/blog",
    // },
    {
      id: 3,
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/omaryvsser",
    },
    {
      id: 4,
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

    if (href.startsWith("http")) {
      // External links - open in new tab
      e.preventDefault();
      window.open(href, "_blank");
    } else if (href.startsWith("/")) {
      // Internal route - let the browser handle navigation
      // Don't prevent default, let the link work normally
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[5000]">
      <FloatingDock
        items={links.map((link) => ({
          ...link,
          href: link.href,
          onClick: (e: React.MouseEvent) => handleClick(link.href, e),
        }))}
      />
    </div>
  );
}
