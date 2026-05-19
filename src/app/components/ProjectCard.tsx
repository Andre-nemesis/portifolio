import { motion } from 'motion/react';
import { ExternalLink, Star } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  language: string;
}

interface ProjectCardProps {
  repo: GitHubRepo;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative ">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {repo.name}
          </h3>
          <motion.a
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            href={repo.homepage || repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
          {repo.description || 'Sem descrição disponível'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          {repo.language && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">{repo.language}</span>
            </div>
          )}

          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
