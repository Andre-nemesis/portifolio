import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ExternalLink, Code2, GraduationCap, Briefcase, Lightbulb, Users } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { SkillBadge } from './components/SkillBadge';
import { TimelineItem } from './components/TimelineItem';
import { SectionTitle } from './components/SectionTitle';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingSpinner } from './components/LoadingSpinner';
import { MobileMenu } from './components/MobileMenu';
import { EmptyState } from './components/EmptyState';
import { ScrollProgress } from './components/ScrollProgress';
import { ProjectFilter } from './components/ProjectFilter';

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

export default function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [activeSection, setActiveSection] = useState('sobre');
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('portfolio');

  const config = {
    name: 'André Casimiro',
    title: 'Desenvolvedor Full Stack',
    github: 'andre-nemesis',
    linkedin: 'andre-casimiro-63425a283/',
    email: 'andrecasimio@gmail.com',
    bio: 'Desenvolvedor apaixonado por criar soluções inovadoras e elegantes. Focado em escrever código limpo e entregar experiências excepcionais.',
    avatar: 'https://github.com/andre-nemesis.png',
  };

  const hardSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Git',
    'Docker', 'MongoDB', 'PostgreSQL','MySql', 'JavaScript', 'Spring Boot',
    'Next.js', 'Tailwind CSS', 'REST APIs', 'CI/CD',
  ];

  const softSkills = [
    'Comunicação', 'Trabalho em Equipe', 'Resolução de Problemas',
    'Pensamento Crítico', 'Adaptabilidade', 'Liderança',
    'Gestão de Tempo', 'Criatividade'
  ];

  const education = [
    {
      title: 'Bacharelado em Sistemas de Informação',
      institution: 'IFCE - Campus Cedro',
      period: '2022 - 2026',
      description: 'Focado em algoritmos, estruturas de dados e desenvolvimento de software.'
    }
  ];

  const courses = [
    {
      title: 'Python Backend Development with I.A',
      institution: 'DIO & VIVO',
      period: '2024',
      description: 'Aprofundamento de utilização de I.A para desenvolvimento backend com Python e estrutura da linguagem python..'
    },
  ];

  const experiences = [
    {
      title: 'Engenheiro de Software Júnior',
      institution: 'IFCE/URCA-Campus Iguatu',
      period: '2025 - 2026',
      description: 'Gestão de infraestrutura de servidores, desenvolvimento de aplicações web e manutenção de sistemas internos utilizando tecnologias como React, Node.js, Docker e MySQL, com foco em otimização de processos e segurança da informação.'
    },
    {
      title: 'Desenvolvedor Full Stack',
      institution: 'IFCE/Sebare/Prefeitura de Cedro',
      period: '2025 - 2025',
      description: 'Desenvolvimento de aplicação WEB para a gestão de empreendedores da cidade de CEDRO-CE utilizando React, Node.js com Express.js e MySQL, como foco em gestão de informação e criação de insights via dashboards.'
    },
    {
      title: 'Vencedor do Hackathon IFCE 2025',
      institution: 'IFCE/Sebare/Prefeitura de Cedro',
      period: '2025 - 2025',
      description: 'Desenvolvimento de projeto da ideia de plataforma web para gestão de empreededores.'
    },
    {
      title: 'Monitor da Disciplina de Lógica e Linguagem de Programação',
      institution: 'IFCE-Campus Cedro',
      period: '2024 - 2025',
      description: 'Desenvolvimento de atividades de monitoria, incluindo resolução de dúvidas, elaboração de exercícios e apoio aos alunos na disciplina de Lógica e Linguagem de Programação, utilizando principalmente a linguagem C.'
    }
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${config.github}/repos?sort=updated&per_page=100`);
        const data = await response.json();
        setRepos(data.filter((repo: GitHubRepo) => !repo.name.includes(config.github)));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [config.github]);

  const sections = ['sobre', 'projetos', 'formacao', 'experiencia', 'skills'];

  // Get all unique tags from repos
  const allTags = Array.from(
    new Set(
      repos.flatMap((repo) => repo.topics)
    )
  ).sort();

  // Filter repos by selected tag
  const filteredRepos = selectedTag === 'all'
    ? repos
    : repos.filter((repo) => repo.topics.includes(selectedTag));

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            {config.name}
          </motion.div>

          <div className="hidden md:flex gap-6">
            {sections.map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`capitalize transition-colors ${
                  activeSection === section ? 'text-primary' : 'text-muted-foreground hover:text-foreground cursor-pointer'
                }`}
              >
                {section === 'formacao' ? 'Formação' : section === 'experiencia' ? 'Experiência' : section}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <MobileMenu
              sections={sections}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href={`https://github.com/${config.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href={`https://linkedin.com/in/${config.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="sobre" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full"
              >
                Olá, eu sou
              </motion.div>

              <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                {config.name}
              </h1>

              <p className="text-2xl text-muted-foreground mb-6">
                {config.title}
              </p>

              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                {config.bio}
              </p>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${config.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Entre em Contato
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <img
                src={config.avatar}
                alt={config.name}
                className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border-4 border-primary/20 shadow-2xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Code2} title="Projetos" />

          {loading ? (
            <LoadingSpinner />
          ) : repos.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ProjectFilter
                tags={allTags.slice(0, 10)}
                selectedTag={selectedTag}
                onTagSelect={setSelectedTag}
              />

              {filteredRepos.length === 0 ? (
                <EmptyState message={`Nenhum projeto encontrado com a tag "${selectedTag}"`} />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRepos.slice(0, 9).map((repo, index) => (
                    <ProjectCard key={repo.id} repo={repo} index={index} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section id="formacao" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={GraduationCap} title="Formação Acadêmica" />

          <div className="space-y-6">
            {education.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Cursos e Certificações
            </h3>
            <div className="space-y-6">
              {courses.map((item, index) => (
                <TimelineItem key={index} {...item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Briefcase} title="Experiência Profissional" />

          <div className="space-y-6">
            {experiences.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Code2} title="Hard Skills" />

          <div className="flex flex-wrap gap-3 mb-16">
            {hardSkills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} index={index} />
            ))}
          </div>

          <SectionTitle icon={Users} title="Soft Skills" />

          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} index={index} variant="soft" />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} {config.name}. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
