// Performance monitoring utilities

export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
  } else {
    fn();
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer with performance optimization
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window === "undefined") return null;

  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: "50px",
    ...options,
  });
};

// Memory management
export const cleanupResources = () => {
  if (typeof window !== "undefined") {
    // Clear any cached data
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
  }
};

// Bundle size monitoring
export const logBundleSize = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const scripts = document.querySelectorAll("script[src]");
    let totalSize = 0;

    scripts.forEach((script) => {
      const src = script.getAttribute("src");
      if (src && src.includes("_next")) {
        // This is a simplified check - in real implementation you'd fetch and measure
        console.log(`Script loaded: ${src}`);
      }
    });
  }
};
