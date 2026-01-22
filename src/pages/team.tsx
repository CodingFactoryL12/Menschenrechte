'use client';

import Head from 'next/head';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  skills: string[];
  icon: string;
  bio: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Maria Schmidt",
    role: "Projektleitung & Design",
    skills: ["UI/UX Design", "Projektmanagement", "Recherche"],
    icon: "👩‍💼",
    bio: "Maria führt das Projekt an und kümmert sich um das visuelle Design sowie die Koordination aller Arbeiten.",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    name: "Lars Müller",
    role: "Entwicklung & Technik",
    skills: ["Frontend", "React/Next.js", "Datenvisualisierung"],
    icon: "👨‍💻",
    bio: "Lars entwickelt die technische Infrastruktur und implementiert alle interaktiven Features der Website.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Sophie Wagner",
    role: "Inhalte & Recherche",
    skills: ["Recherche", "Texterstellung", "Dokumentation"],
    icon: "👩‍🔬",
    bio: "Sophie recherchiert umfassend zu Menschenrechtsthemen und erstellt prägnante, informative Inhalte.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 4,
    name: "Felix Schneider",
    role: "Datenanalyse & Grafiken",
    skills: ["Datenvisualisierung", "Grafik-Design", "Animation"],
    icon: "👨‍🎨",
    bio: "Felix erstellt beeindruckende Visualisierungen und Animationen, die komplexe Daten verständlich machen.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: 5,
    name: "Emma Hoffmann",
    role: "Spiele & Interaktion",
    skills: ["Game Design", "Interaktive Erlebnisse", "User Testing"],
    icon: "🎮",
    bio: "Emma entwickelt unterhaltsame Spiele und interaktive Elemente, um das Lernen spannend zu gestalten.",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 6,
    name: "Jonas Weber",
    role: "Multimedia & Kommunikation",
    skills: ["Video-Bearbeitung", "Audio-Production", "Social Media"],
    icon: "🎬",
    bio: "Jonas produziert Videoinhalte und kümmert sich um die Kommunikation mit der Zielgruppe.",
    color: "from-red-500 to-pink-500"
  }
];

const milestones = [
  { date: "Sept 2025", title: "Projektstart", desc: "Ideenentwicklung und Planung" },
  { date: "Okt 2025", title: "Recherchephase", desc: "Umfangreiche Recherche zu Menschenrechten" },
  { date: "Nov 2025", title: "Entwicklung", desc: "Technische Umsetzung beginnt" },
  { date: "Dez 2025", title: "Beta-Launch", desc: "Erste Version online" },
  { date: "Jan 2026", title: "Schülerprojekte", desc: "Integration der Mitschülerprojekte" },
  { date: "Feb 2026", title: "Finales Launch", desc: "Vollständige Website live" }
];

export default function Team() {
  return (
    <>
      <Head>
        <title>Unser Team | Menschenrechte</title>
        <meta name="description" content="Lernen Sie unser engagiertes Team kennen" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
              Unser Team
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Engagierte Schüler, die sich leidenschaftlich für die Vermittlung von Menschenrechten einsetzen
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '600ms'
                }}
              >
                <div
                  className={`relative bg-gradient-to-br ${member.color} rounded-2xl overflow-hidden h-full transform transition-all duration-500 hover:scale-105`}
                >
                  {/* Background Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative p-8 flex flex-col h-full">
                    {/* Icon */}
                    <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                      {member.icon}
                    </div>

                    {/* Name and Role */}
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="text-sm text-white/80 mb-6 flex-grow">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="space-y-2">
                      <p className="text-xs text-white/70 uppercase tracking-wider">Fähigkeiten</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur hover:bg-white/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Timeline */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Projektmeilensteine</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-8 animate-fade-in ${
                      index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationDuration: '600ms'
                    }}
                  >
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-4 border-slate-900 shadow-lg shadow-blue-500/50 lg:relative lg:left-0"></div>

                    {/* Content */}
                    <div className={`flex-1 bg-gray-800 rounded-lg p-6 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      <p className="text-sm font-bold text-blue-400 uppercase tracking-wider">{milestone.date}</p>
                      <h3 className="text-xl font-bold text-white mt-1">{milestone.title}</h3>
                      <p className="text-gray-400 mt-2">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Unsere Mission</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Wir möchten junge Menschen inspirieren und aufklären über Menschenrechte. Durch kreative, interaktive und unterhaltsame Inhalte 
              machen wir ein wichtiges Thema zugänglich und zeigen, dass jeder von uns einen Unterschied machen kann.
            </p>
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
      `}</style>
    </>
  );
}
