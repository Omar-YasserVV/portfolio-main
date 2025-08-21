"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import components with loading states and intersection observer
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="h-screen bg-black-100" />,
});

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div className="h-64 bg-black-100" />,
});

const Approach = dynamic(() => import("@/components/Approach"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100" />,
});

const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100" />,
});

const RecentProjects = dynamic(() => import("@/components/RecentProjects"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100" />,
});

const FloatingDockDemo = dynamic(
  () =>
    import("@/components/FloatingDockDemo").then((mod) => ({
      default: mod.FloatingDockDemo,
    })),
  { ssr: false }
);

// Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasIntersected) {
        setIsIntersecting(true);
        setHasIntersected(true);
      }
    },
    [hasIntersected]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: "50px",
      ...options,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, options]);

  return [elementRef, isIntersecting];
};

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const [loadedComponents, setLoadedComponents] = useState({
    hero: false,
    grid: false,
    projects: false,
    experience: false,
    approach: false,
  });

  // Intersection observers for each section
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [gridRef, gridVisible] = useIntersectionObserver();
  const [projectsRef, projectsVisible] = useIntersectionObserver();
  const [experienceRef, experienceVisible] = useIntersectionObserver();
  const [approachRef, approachVisible] = useIntersectionObserver();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update loaded components based on visibility
  useEffect(() => {
    if (heroVisible) setLoadedComponents((prev) => ({ ...prev, hero: true }));
  }, [heroVisible]);

  useEffect(() => {
    if (gridVisible) setLoadedComponents((prev) => ({ ...prev, grid: true }));
  }, [gridVisible]);

  useEffect(() => {
    if (projectsVisible)
      setLoadedComponents((prev) => ({ ...prev, projects: true }));
  }, [projectsVisible]);

  useEffect(() => {
    if (experienceVisible)
      setLoadedComponents((prev) => ({ ...prev, experience: true }));
  }, [experienceVisible]);

  useEffect(() => {
    if (approachVisible)
      setLoadedComponents((prev) => ({ ...prev, approach: true }));
  }, [approachVisible]);

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
        <div ref={heroRef as React.RefObject<HTMLDivElement>}>
          {loadedComponents.hero && <Hero />}
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>}>
          {loadedComponents.grid && <Grid />}
        </div>

        <div ref={projectsRef as React.RefObject<HTMLDivElement>}>
          {loadedComponents.projects && <RecentProjects />}
        </div>

        <div ref={experienceRef as React.RefObject<HTMLDivElement>}>
          {loadedComponents.experience && <Experience />}
        </div>

        <div ref={approachRef as React.RefObject<HTMLDivElement>}>
          {loadedComponents.approach && <Approach />}
        </div>

        <Footer />
        <FloatingDockDemo />
      </div>
    </main>
  );
};

export default Home;
