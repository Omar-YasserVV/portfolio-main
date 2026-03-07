"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { isLowPerformanceDevice } from "@/lib/mobileOptimizations";
//TODO: remove later
export const TextGenerateEffect = ({
  words,
  className,
  animate: animateProp = true,
}: {
  words: string;
  className?: string;
  animate?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  const enableAnimation = animateProp && !isLowPerformanceDevice();
  useEffect(() => {
    if (!enableAnimation) return;
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      },
    );
  }, [animate, enableAnimation]);

  const renderWords = () => {
    if (!enableAnimation) {
      return (
        <div>
          {wordsArray.map((word, idx) => {
            return (
              <span
                key={word + idx}
                // change here if idx is greater than 3, change the text color to #CBACF9
                className={` ${
                  idx > 3 ? "text-purple" : "dark:text-white text-black"
                }`}
              >
                {word}{" "}
              </span>
            );
          })}
        </div>
      );
    }

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
