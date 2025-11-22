// Animation constants using CSS variables
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.1,
    medium: 0.2,
    normal: 0.3,
    slow: 0.5,
    progress: 0.6,
  },
  ease: [0.4, 0, 0.2, 1] as const,
  stagger: 0.1,
} as const;

// Framer Motion variants for reusability
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInVariants = {
  left: {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  right: {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
};

export const hoverVariants = {
  chip: {
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 },
  },
  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
};