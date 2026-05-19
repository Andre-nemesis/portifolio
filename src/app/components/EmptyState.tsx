import { motion } from 'motion/react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'Nenhum projeto encontrado' }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-4 p-6 bg-muted rounded-full"
      >
        <FolderOpen className="w-12 h-12 text-muted-foreground" />
      </motion.div>
      <p className="text-muted-foreground text-lg">{message}</p>
      <p className="text-sm text-muted-foreground/70 mt-2">
        Adicione topics aos seus repositórios no GitHub para que apareçam aqui
      </p>
    </motion.div>
  );
}
