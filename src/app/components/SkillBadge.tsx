import { motion } from 'motion/react';

interface SkillBadgeProps {
  skill: string;
  index: number;
  variant?: 'hard' | 'soft';
}

export function SkillBadge({ skill, index, variant = 'hard' }: SkillBadgeProps) {
  const colors = variant === 'hard'
    ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
    : 'bg-accent/70 text-accent-foreground border-accent hover:bg-accent';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-lg border-2 cursor-default transition-all ${colors}`}
    >
      {skill}
    </motion.div>
  );
}
