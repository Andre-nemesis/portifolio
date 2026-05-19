import { motion } from 'motion/react';
import { Filter } from 'lucide-react';

interface ProjectFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

export function ProjectFilter({ tags, selectedTag, onTagSelect }: ProjectFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filtrar por:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTagSelect('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedTag === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
        >
          Todos
        </motion.button>

        {tags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagSelect(tag)}
            className={`px-4 py-2 rounded-lg transition-colors capitalize ${
              selectedTag === tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
