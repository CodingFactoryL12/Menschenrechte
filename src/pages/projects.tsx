'use client';

import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  author: string;
  category: 'game' | 'interactive' | 'video' | 'simulation' | 'art';
  icon: string;
  shortDesc: string;
  fullDesc: string;
  mediaType: string;
  link?: string;
  tags: string[];
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Menschenrechts-Quiz",
    author: "Maria & Lars",
    category: 'game',
    icon: '🎮',
    shortDesc: "Interaktives Quiz über globale Menschenrechte",
    fullDesc: "Ein unterhaltsames Quiz-Spiel, das Spieler durch verschiedene Szenarien führt und ihr Wissen über Menschenrechte testet. Mit Leaderboard und Achievements.",
    mediaType: 'HTML5 Game',
    tags: ['Quiz', 'Bildung', 'Interaktiv'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: "Escape Room: Freiheit",
    author: "Jonas & Emma",
    category: 'game',
    icon: '🔐',
    shortDesc: "Ein digitales Escape Room Abenteuer",
    fullDesc: "Löse Rätsel und Aufgaben, um mehr über Freiheitsrechte zu erfahren. Der Escape Room verbindet Spaß mit Bildung und zeigt reale Herausforderungen von Menschen ohne Freiheit.",
    mediaType: 'Interactive Web Game',
    tags: ['Adventure', 'Rätsel', 'Spielerisch'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    title: "Dokumentation: Stimmen der Welt",
    author: "Sophie & Alex",
    category: 'video',
    icon: '🎬',
    shortDesc: "Interviews mit Menschen aus verschiedenen Ländern",
    fullDesc: "Eine berührende Dokumentation mit persönlichen Geschichten von Menschen, deren Menschenrechte eingeschränkt waren. Mit Untertiteln in mehreren Sprachen.",
    mediaType: 'Video (8 Min)',
    tags: ['Dokumentation', 'Interviews', 'Authentisch'],
    color: 'from-red-500 to-red-600'
  },
  {
    id: 4,
    title: "Interaktive Weltkarte",
    author: "Felix & Lisa",
    category: 'interactive',
    icon: '🌍',
    shortDesc: "Erkunde Menschenrechtssituationen weltweit",
    fullDesc: "Eine dynamische Weltkarte mit animierten Daten über Menschenrechtsverletzungen und -erfolge in verschiedenen Ländern. Klickbar und mit detaillierten Informationen.",
    mediaType: 'Web Application',
    tags: ['Datenvisualisierung', 'Global', 'Dynamisch'],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 5,
    title: "VR-Simulation: Ein Tag im Leben",
    author: "Lukas & Nina",
    category: 'simulation',
    icon: '🥽',
    shortDesc: "Virtuelle Realität zum Empathie-Aufbau",
    fullDesc: "Eine immersive VR-Simulation, die zeigt, wie es ist, ohne bestimmte Rechte zu leben. Ermöglicht echtes Verständnis durch Einfühlung.",
    mediaType: 'VR Experience',
    tags: ['VR', 'Empatisch', 'Immersiv'],
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 6,
    title: "Kunstinstallation: Mauern der Angst",
    author: "Mira & Tim",
    category: 'art',
    icon: '🎨',
    shortDesc: "Digitale Kunstinstallation mit Interaktion",
    fullDesc: "Eine visuell beeindruckende Installation, die Mauern darstellt, die Menschen voneinander trennen. Durch Interaktion kann man diese Mauern durchbrechen symbolisch.",
    mediaType: '3D Animation',
    tags: ['Kunst', 'Symbolisch', 'Bewegend'],
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 7,
    title: "Podcast-Serie: Stimmen der Gerechtigkeit",
    author: "Anna & David",
    category: 'interactive',
    icon: '🎙️',
    shortDesc: "Audio-Geschichten über Menschenrechtskämpfer",
    fullDesc: "Eine fesselnde Podcast-Serie mit Geschichten von mutigen Menschen, die für Menschenrechte kämpfen. Inspirierend und lehrreich.",
    mediaType: 'Podcast (6 Episoden)',
    tags: ['Audio', 'Inspirierend', 'Geschichten'],
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 8,
    title: "Bildungs-App: Rechte lernen",
    author: "Max & Charlotte",
    category: 'game',
    icon: '📱',
    shortDesc: "Gamifizierte Lern-App für alle Altersgruppen",
    fullDesc: "Eine umfassende Mobile App mit Lernmodulen, Mini-Games und Quizzes. Mit Fortschrittsanzeige und persönlichem Lernplan.",
    mediaType: 'Mobile App',
    tags: ['Bildung', 'Gamification', 'Responsive'],
    color: 'from-cyan-500 to-cyan-600'
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categoryLabels: Record<string, string> = {
    game: '🎮 Spiele',
    interactive: '🖱️ Interaktiv',
    video: '🎬 Video',
    simulation: '🥽 Simulation',
    art: '🎨 Kunst'
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
              Schülerprojekte
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Kreative und interaktive Werke unserer Mitschüler zum Thema Menschenrechte
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Alle
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '600ms'
                }}
              >
                {/* Project Card */}
                <div
                  className={`relative bg-gradient-to-br ${project.color} rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 h-full flex flex-col`}
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative p-6 flex flex-col h-full">
                    {/* Icon and Category */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                        {project.icon}
                      </span>
                      <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur">
                        {categoryLabels[project.category]}
                      </span>
                    </div>

                    {/* Title and Author */}
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-white/80 mb-3">von {project.author}</p>

                    {/* Short Description */}
                    <p className="text-sm text-white/90 mb-4 line-clamp-2">{project.shortDesc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expand Button */}
                    <div className="mt-auto">
                      <button
                        className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 backdrop-blur flex items-center justify-between"
                      >
                        <span>{expandedId === project.id ? 'Weniger' : 'Mehr erfahren'}</span>
                        <span className={`transform transition-transform duration-300 ${expandedId === project.id ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === project.id && (
                  <div className="animate-fade-in mt-4 bg-gray-800 border-l-4 border-gradient rounded-lg p-6 backdrop-blur">
                    <h4 className="text-lg font-bold text-white mb-3">Details</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.fullDesc}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Formattyp</p>
                        <p className="text-white font-semibold">{project.mediaType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Kategorie</p>
                        <p className="text-white font-semibold">{categoryLabels[project.category]}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                      >
                        Zum Projekt →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Statistics Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-fade-in">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-blue-400">{projects.length}</p>
              <p className="text-gray-400 text-sm mt-2">Projekte</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-purple-400">{new Set(projects.map(p => p.author)).size}</p>
              <p className="text-gray-400 text-sm mt-2">Schüler</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-pink-400">{Object.keys(categoryLabels).length}</p>
              <p className="text-gray-400 text-sm mt-2">Kategorien</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-green-400">100%</p>
              <p className="text-gray-400 text-sm mt-2">Kreativität</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in forwards;
          animation-duration: 600ms;
          animation-fill-mode: both;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bg-gradient-to-br {
          background: linear-gradient(135deg, var(--tw-gradient-stops));
        }
      `}</style>
  );
}
