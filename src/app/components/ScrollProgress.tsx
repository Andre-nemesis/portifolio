import { motion } from 'motion/react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function ScrollProgress() {
  const scrollProgress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left z-50"
      style={{
        scaleX: scrollProgress / 100,
      }}
      initial={{ scaleX: 0 }}
    />
  );
}
