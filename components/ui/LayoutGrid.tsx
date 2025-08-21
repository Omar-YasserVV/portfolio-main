"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./MovingBorders";
import { isLowPerformanceDevice, getOptimizedImageSize } from "@/lib/mobileOptimizations";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  // Check if we're on a low performance device
  const isLowPerf = isLowPerformanceDevice();

  const handleClick = (card: Card) => {
    // Skip animation on very low performance devices with small screens
    if (isLowPerf && window.innerWidth < 480 && 'ontouchstart' in window) {
      return;
    }
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    // change md:grid-cols-3 to md:grid-cols-4, gap-4 to gap-10
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto gap-10 ">
      {cards.map((card, i) => (
        <Button
          key={i}
          borderRadius="1.75rem"
          //   Use shorter duration on low performance devices
          duration={isLowPerf ? 15000 : 10000}
          //   add className={cn(card.className, "")}
          className={cn(
            card.className
            // "bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          )}
        >
          <div
            className={cn(
              card.className,
              "relative border-3 border-yellow-500"
            )}
          >
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                card.className,
                "relative overflow-hidden",
                selected?.id === card.id
                  ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                  : lastSelected?.id === card.id
                  ? "z-40 bg-white rounded-xl h-full w-full"
                  : "bg-white rounded-xl h-full w-full"
              )}
              style={{
                // Apply hardware acceleration
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden"
              }}
              layout
              transition={{
                // Optimize animation for mobile
                type: isLowPerf ? "tween" : "spring",
                duration: isLowPerf ? 0.2 : 0.5,
                ease: isLowPerf ? "linear" : "easeInOut"
              }}
            >
              {selected?.id === card.id && <SelectedCard selected={selected} />}
              <BlurImage card={card} />
            </motion.div>
          </div>
        </Button>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{
          // Apply hardware acceleration
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden"
        }}
        animate={{ opacity: selected?.id ? (isLowPerf ? 0.2 : 0.3) : 0 }}
        transition={{
          duration: isLowPerf ? 0.15 : 0.3,
          ease: isLowPerf ? "linear" : "easeInOut"
        }}
      />
    </div>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  const isLowPerf = isLowPerformanceDevice();
  
  // Get optimized image dimensions based on device performance
  const { width, height } = getOptimizedImageSize(100, 100);
  
  // Reduce blur effect and transition duration on low performance devices
  const blurAmount = isLowPerf ? "blur-sm" : "blur-md";
  const transitionDuration = isLowPerf ? "duration-100" : "duration-200";
  
  return (
    <Image
      src={card.thumbnail}
      height={height}
      width={width}
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition",
        transitionDuration,
        loaded ? "blur-none" : blurAmount
      )}
      alt="thumbnail"
      priority={!isLowPerf} // Only use priority loading on high-performance devices
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  // Check if we're on a low performance device
  const isLowPerf = isLowPerformanceDevice();
  
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isLowPerf ? 0.4 : 0.6, // Reduce opacity on low performance devices
        }}
        transition={{
          duration: isLowPerf ? 0.15 : 0.3, // Faster transition on low performance devices
        }}
        style={{
          // Apply hardware acceleration
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden"
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: isLowPerf ? 50 : 100, // Smaller animation distance on low performance devices
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: isLowPerf ? 0.15 : 0.3, // Faster transition on low performance devices
          ease: isLowPerf ? "linear" : "easeInOut", // Simpler easing on low performance devices
          // Use tween instead of spring on low performance devices
          type: isLowPerf ? "tween" : "spring",
        }}
        style={{
          // Apply hardware acceleration
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden"
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
