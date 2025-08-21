"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import components that might have SSR issues
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Grid = dynamic(() => import("@/components/Grid"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Approach = dynamic(() => import("@/components/Approach"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});
const RecentProjects = dynamic(() => import("@/components/RecentProjects"), {
  ssr: false,
});
const FloatingDockDemo = dynamic(
  () =>
    import("@/components/FloatingDockDemo").then((mod) => ({
      default: mod.FloatingDockDemo,
    })),
  { ssr: false }
);

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state during SSR
  if (!isClient) {
    return (
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 min-h-screen">
        <div className="max-w-7xl w-full flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <Grid />
        <RecentProjects />
        {/* <Clients /> */}
        <Experience />
        <Approach />
        <Footer />
        <FloatingDockDemo />
      </div>
    </main>
  );
};

export default Home;
