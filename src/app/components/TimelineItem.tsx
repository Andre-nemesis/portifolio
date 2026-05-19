import { motion } from 'motion/react';

interface TimelineItemProps {
  title: string;
  institution: string;
  period: string;
  description: string;
  index: number;
}

export function TimelineItem({ title, institution, period, description, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 10, transition: { duration: 0.2 } }}
      className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0"
    >
      {/* Timeline dot */}
      <motion.div
        whileHover={{ scale: 1.5, rotate: 180 }}
        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"
      />

      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
          <span className="text-sm text-primary font-medium mt-1 md:mt-0">
            {period}
          </span>
        </div>

        <p className="text-muted-foreground mb-2">
          {institution}
        </p>

        <p className="text-sm text-foreground/80">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
