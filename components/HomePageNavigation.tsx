"use client";
import React, { useState } from "react";
import { AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { isLowPerformanceDevice } from "@/lib/mobileOptimizations";
import { HomePageFloatingDock } from "@/components/HomePageFloatingDock";

export function HomePageNavigation() {
  // Detect if we're on a low performance device
  const isLowPerformance = isLowPerformanceDevice();

  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  // Track last update time to throttle updates on low-performance devices
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      // Throttle updates on low performance devices
      const now = Date.now();
      if (isLowPerformance && now - lastUpdateTime < 100) {
        return;
      }
      setLastUpdateTime(now);

      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
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

  return (
    <>
      <AnimatePresence mode="wait"></AnimatePresence>
      <HomePageFloatingDock />
    </>
  );
}
