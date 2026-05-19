import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  sections: string[];
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export function MobileMenu({ sections, activeSection, onSectionClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionClick = (section: string) => {
    onSectionClick(section);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border z-50 p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-semibold">Menu</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex  flex-col gap-3">
                {sections.map((section) => (
                  <motion.button
                    key={section}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionClick(section)}
                    className={`text-left px-4 py-3 rounded-lg capitalize font-medium transition-all ${
                      activeSection === section
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted text-foreground hover:bg-muted hover:text-primary'
                    }`}
                  >
                    {section === 'formacao' ? 'Formação' : section === 'experiencia' ? 'Experiência' : section}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
