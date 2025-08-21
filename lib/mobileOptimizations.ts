// Mobile-specific performance optimizations

import { debounce, throttle } from './performance';

// Detect if the device is mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Detect if the device has low performance (based on device memory API)
export const isLowPerformanceDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check if user prefers reduced motion
  if (typeof window.matchMedia === 'function') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return true;
  }
  
  // Check if the device has limited memory (less than 4GB)
  // @ts-ignore - deviceMemory is not in the standard TypeScript navigator type
  const limitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  // Check if the device has a slow CPU (hardwareConcurrency less than 4)
  const slowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  
  // Check for small screen size (likely mobile)
  const smallScreen = window.innerWidth < 768;
  
  return isMobile() || limitedMemory || slowCPU || smallScreen;
};

// Reduce animation complexity for mobile devices
export const getReducedMotionSettings = () => {
  const isReduced = isLowPerformanceDevice();
  
  return {
    // Longer animation durations for smoother transitions
    duration: isReduced ? 0.5 : 0.2,
    
    // Simpler easing functions
    ease: isReduced ? 'linear' : 'easeInOut',
    
    // Reduce or disable spring physics
    bounce: isReduced ? 0 : 0.25,
    
    // Reduce animation steps
    steps: isReduced ? 10 : 60,
    
    // Disable certain animations completely
    enableComplexAnimations: !isReduced,
  };
};

// Optimize scroll-based animations
export const optimizeScrollAnimation = (callback: Function) => {
  if (typeof window === 'undefined') return () => {};
  
  // Use requestAnimationFrame for smoother performance
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  // Apply more aggressive throttling on mobile
  return isLowPerformanceDevice() 
    ? throttle(handleScroll, 100) 
    : throttle(handleScroll, 16);
};

// Optimize hover animations for touch devices
export const optimizeHoverAnimation = (onHover: Function, onLeave: Function) => {
  if (typeof window === 'undefined') return { onMouseEnter: () => {}, onMouseLeave: () => {}, onTouchStart: () => {}, onTouchEnd: () => {} };
  
  // For mobile, we'll use touch events and add a delay to prevent accidental triggers
  const touchDelay = isLowPerformanceDevice() ? 100 : 0;
  
  return {
    onMouseEnter: !isMobile() ? () => onHover() : undefined,
    onMouseLeave: !isMobile() ? () => onLeave() : undefined,
    onTouchStart: isMobile() ? debounce(() => onHover(), touchDelay) : undefined,
    onTouchEnd: isMobile() ? debounce(() => onLeave(), touchDelay) : undefined,
  };
};

// Reduce the number of particles or elements in animations
export const getOptimizedElementCount = (defaultCount: number) => {
  if (typeof window === 'undefined') return defaultCount;
  
  if (isLowPerformanceDevice()) {
    // Reduce by 70% for low-performance devices
    return Math.max(Math.floor(defaultCount * 0.3), 1);
  }
  
  return defaultCount;
};

// Optimize image loading for mobile
export const getOptimizedImageSize = (defaultWidth: number, defaultHeight: number = defaultWidth) => {
  if (typeof window === 'undefined') return { width: defaultWidth, height: defaultHeight };
  
  if (isLowPerformanceDevice()) {
    // Reduce image size for mobile devices
    return {
      width: Math.floor(defaultWidth * 0.7),
      height: Math.floor(defaultHeight * 0.7)
    };
  }
  
  return { width: defaultWidth, height: defaultHeight };
};

// Optimize CSS transforms for better performance
export const getOptimizedTransform = (isAnimating: boolean = true) => {
  if (typeof window === 'undefined') return {};
  
  const isLowPerf = isLowPerformanceDevice();
  
  return {
    // Always use hardware acceleration for animations
    transform: 'translate3d(0,0,0)',
    
    // Only use willChange when actually animating to avoid memory issues
    willChange: isAnimating ? 'transform' : undefined,
    
    // Reduce animation complexity for low performance devices
    transition: isLowPerf ? 'transform 0.2s linear' : undefined,
    
    // Add backface visibility hidden for better performance
    backfaceVisibility: 'hidden',
    
    // Add perspective for 3D transforms
    perspective: '1000px',
  };
};

// Apply hardware acceleration to DOM elements
export const applyHardwareAcceleration = (element: HTMLElement | null) => {
  if (!element) return;
  
  // Force hardware acceleration
  element.style.transform = 'translate3d(0,0,0)';
  element.style.backfaceVisibility = 'hidden';
  
  // Only set willChange during animations to avoid memory issues
  // This should be set before animation starts and removed after it completes
  // element.style.willChange = 'transform';
};

// Optimize animation frame rate for low performance devices
export const getOptimizedFrameRate = () => {
  return isLowPerformanceDevice() ? 30 : 60; // 30fps for low performance, 60fps for high
};

// Skip frames for smoother animation on low performance devices
export const shouldSkipFrame = () => {
  if (!isLowPerformanceDevice()) return false;
  
  // Skip every other frame on low performance devices
  return Math.random() > 0.5;
};