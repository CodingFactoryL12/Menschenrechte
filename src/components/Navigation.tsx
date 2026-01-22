'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">Menschenrechte</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition">Home</Link>
            <Link href="/rights" className="text-gray-700 hover:text-primary transition">Rechte</Link>
            <Link href="/challenges" className="text-gray-700 hover:text-primary transition">Herausforderungen</Link>
            <Link href="/games" className="text-gray-700 hover:text-primary transition font-semibold text-purple-600">Spiele</Link>
            <Link href="/projects" className="text-gray-700 hover:text-primary transition font-semibold text-blue-600">Projekte</Link>
            <Link href="/team" className="text-gray-700 hover:text-primary transition font-semibold text-pink-600">Team</Link>
            <Link href="/action" className="text-gray-700 hover:text-primary transition">Handeln</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
