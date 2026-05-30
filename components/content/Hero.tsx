import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "../MagicButton";
import { Spotlight } from "../ui/Spotlight";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-20">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          // Using a soft silver/blue-white for a more "atmospheric" look
          fill="rgba(219, 234, 254, 0.5)"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          // Using a vibrant Electric Indigo to match your brand
          fill="rgba(219, 234, 254, 0.5)"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          // Using a deep Cyan/Blue to create contrast
          fill="rgba(219, 234, 254, 0.5)"
        />
      </div>

      <div
        className="h-screen w-full dark:bg-background bg-white dark:bg-grid-white/[0.03] bg-grid-background/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-background, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Welcome to my portfolio
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="Transforming Concepts into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            animate={false}
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Omar, a Full Stack Web Developer based in Egypt.
          </p>

          <a href="/OmarYasser'sResume.pdf" download>
            <MagicButton
              title="Download CV"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="!bg-[#020202]" // Update this to match!
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
