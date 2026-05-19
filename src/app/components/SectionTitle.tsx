import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
}

export function SectionTitle({ icon: Icon, title }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"
      />
    </motion.div>
  );
}
