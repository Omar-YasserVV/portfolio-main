"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { isLowPerformanceDevice } from "@/lib/mobileOptimizations";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  
  // Detect if we're on a low performance device
  const isLowPerf = isLowPerformanceDevice();
  
  useEffect(() => {
    // Skip animation entirely on very low performance devices
    if (isLowPerf && wordsArray.length > 20) {
      // For very long text on low-perf devices, just show everything at once
      animate(
        "span",
        { opacity: 1 },
        { duration: 0.1 }
      );
      return;
    }
    
    // Use optimized animation settings based on device performance
    animate(
      "span",
      { opacity: 1 },
      {
        duration: isLowPerf ? 1 : 2,
        delay: stagger(isLowPerf ? 0.05 : 0.2),
        ease: isLowPerf ? "linear" : "easeOut"
      }
    );
  }, [scope.current, animate, wordsArray.length, isLowPerf]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              // change here if idx is greater than 3, change the text color to #CBACF9
              className={` ${
                idx > 3 ? "text-purple" : "dark:text-white text-black"
              } opacity-0`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      {/* mt-4 to my-4 */}
      <div className="my-4">
        {/* remove  text-2xl from the original */}
        <div className=" dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
