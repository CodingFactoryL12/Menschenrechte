'use client';

import Head from 'next/head';
import { projectGroups, projectStats } from '../data/projects';
import { downloadProjectsCSV } from '../data/projectExport';

interface ProjectGroup {
  id: number;
  name: string;
  teamName: string;
  members: string[];
  focus: string;
  description: string;
  icon: string;
  color: string;
}

export default function Team() {
  const handleDownloadProjects = () => {
    const jsonData = JSON.stringify(projectGroups, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData));
    element.setAttribute('download', 'schuelerprojekte.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
              Schülerprojekte
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {projectStats.totalMembers} Schüler:innen in {projectStats.totalGroups} Gruppen arbeiten an innovativen Menschenrechtsprojekten
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleDownloadProjects}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
              >
                📥 JSON herunterladen
              </button>
              <button
                onClick={downloadProjectsCSV}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                📊 CSV herunterladen
              </button>
            </div>
          </div>

          {/* Project Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {projectGroups.map((group, index) => (
              <div
                key={group.id}
                className="group animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '600ms'
                }}
              >
                <div
                  className={`relative bg-gradient-to-br ${group.color} rounded-2xl overflow-hidden h-full transform transition-all duration-500 hover:scale-105`}
                >
                  {/* Background Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative p-8 flex flex-col h-full">
                    {/* Icon */}
                    <div className="text-6xl mb-4">
                      {group.icon}
                    </div>

                    {/* Group Name and Focus */}
                    <h3 className="text-2xl font-bold text-white mb-2">{group.name}</h3>
                    <p className="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
                      {group.focus}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-white/80 mb-6 flex-grow">
                      {group.description}
                    </p>

                    {/* Team Members */}
                    <div className="space-y-2">
                      <p className="text-xs text-white/70 uppercase tracking-wider">Teamglieder</p>
                      <div className="flex flex-wrap gap-2">
                        {group.members.map((member, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur hover:bg-white/30 transition-colors"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Info Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Projektstatistiken</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-8 text-center text-white transform hover:scale-105 transition-all">
                <p className="text-5xl font-bold mb-2">{projectStats.totalGroups}</p>
                <p className="text-lg opacity-90">Projektgruppen</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-8 text-center text-white transform hover:scale-105 transition-all">
                <p className="text-5xl font-bold mb-2">{projectStats.totalMembers}</p>
                <p className="text-lg opacity-90">Schüler:innen</p>
              </div>
              <div className="bg-gradient-to-br from-pink-600 to-pink-500 rounded-2xl p-8 text-center text-white transform hover:scale-105 transition-all">
                <p className="text-lg opacity-90">Maintainer</p>
                <p className="text-2xl font-bold mt-2">{projectStats.maintainer}</p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Unsere Mission</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Mit diesen kreativen Projekten zeigen unsere Schüler:innen innovativen Wege auf, wie komplexe Menschenrechtsthemen vermittelt werden können. 
              Jede Gruppe bringt ihre einzigartigen Fähigkeiten und Perspektiven ein, um ein wichtiges Thema für junge Menschen zugänglich zu machen.
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
