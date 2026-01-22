'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

// Quiz Data
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Welcher Artikel der Menschenrechtsdeklaration spricht vom Recht auf Leben?",
    options: ["Artikel 1", "Artikel 3", "Artikel 5", "Artikel 10"],
    correct: 1,
    explanation: "Artikel 3 besagt: 'Jeder hat das Recht auf Leben, Freiheit und Sicherheit der Person.'"
  },
  {
    id: 2,
    question: "In welchem Jahr wurde die Allgemeine Erklärung der Menschenrechte verabschiedet?",
    options: ["1945", "1948", "1950", "1952"],
    correct: 1,
    explanation: "Die Allgemeine Erklärung der Menschenrechte wurde am 10. Dezember 1948 von der UN verabschiedet."
  },
  {
    id: 3,
    question: "Welche Organisation wurde gegründet, um Menschenrechte zu überwachen?",
    options: ["NATO", "UNESCO", "Amnesty International", "WHO"],
    correct: 2,
    explanation: "Amnesty International ist eine internationale Menschenrechtsorganisation, die 1961 gegründet wurde."
  },
  {
    id: 4,
    question: "Verbietet die Menschenrechtsdeklaration Kinderarbeit?",
    options: ["Ja, explizit in Artikel 24", "Nein, gar nicht", "Nur teilweise", "Nur in Europa"],
    correct: 0,
    explanation: "Artikel 24 schützt das Recht auf Ruhe und Freizeit und verbietet ausbeuterische Kinderarbeit."
  },
  {
    id: 5,
    question: "Welches Recht schützt die freie Meinungsäußerung?",
    options: ["Artikel 16", "Artikel 19", "Artikel 25", "Artikel 28"],
    correct: 1,
    explanation: "Artikel 19 garantiert das Recht auf Meinungs- und Äußerungsfreiheit."
  }
];

// Memory Cards Data
interface MemoryCard {
  id: number;
  right: string;
  icon: string;
}

const memoryRights: MemoryCard[] = [
  { id: 1, right: "Recht auf Leben", icon: "❤️" },
  { id: 2, right: "Freiheit von Folter", icon: "🛡️" },
  { id: 3, right: "Recht auf Bildung", icon: "📚" },
  { id: 4, right: "Meinungsfreiheit", icon: "🗣️" },
  { id: 5, right: "Recht auf Arbeit", icon: "💼" },
  { id: 6, right: "Recht auf Familie", icon: "👨‍👩‍👧" }
];

type GameType = 'menu' | 'quiz' | 'memory' | 'puzzle';

export default function Games() {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<(MemoryCard | null)[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);

  // Puzzle State
  const [puzzleAnswers, setPuzzleAnswers] = useState<string[]>(['', '', '', '']);
  const [puzzleRevealed, setPuzzleRevealed] = useState<boolean[]>([false, false, false, false]);
  const [puzzleScore, setPuzzleScore] = useState(0);

  const puzzleQuestions = [
    { question: "Artikel 1: Alle Menschen sind _____ und an Würde und Rechten gleich.", answer: "frei" },
    { question: "Artikel 3: Jeder hat das Recht auf _____ und Sicherheit.", answer: "leben" },
    { question: "Artikel 5: Niemand darf der _____ unterworfen werden.", answer: "folter" },
    { question: "Artikel 26: Jeder hat das Recht auf _____.", answer: "bildung" }
  ];

  // Initialize Memory Game
  useEffect(() => {
    if (currentGame === 'memory' && memoryCards.length === 0) {
      const shuffled = [...memoryRights, ...memoryRights].sort(() => Math.random() - 0.5);
      setMemoryCards(shuffled);
      setFlipped(new Array(shuffled.length).fill(false));
      setMatched(new Array(shuffled.length).fill(false));
    }
  }, [currentGame]);

  // Quiz Handler
  const handleQuizAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === quizQuestions[quizIndex].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setCurrentGame('menu');
  };

  // Memory Game Handler
  const handleMemoryCard = (idx: number) => {
    if (flipped[idx] || matched[idx]) return;

    const newFlipped = [...flipped];
    newFlipped[idx] = true;
    setFlipped(newFlipped);

    const flippedIndices = newFlipped.map((f, i) => f && !matched[i] ? i : null).filter(i => i !== null) as number[];

    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (memoryCards[first]?.id === memoryCards[second]?.id) {
        const newMatched = [...matched];
        newMatched[first] = true;
        newMatched[second] = true;
        setMatched(newMatched);
        setMemoryScore(memoryScore + 1);
        setFlipped(new Array(flipped.length).fill(false));
      } else {
        setTimeout(() => {
          const resetFlipped = [...flipped];
          resetFlipped[first] = false;
          resetFlipped[second] = false;
          setFlipped(resetFlipped);
        }, 1000);
      }
    }
  };

  const resetMemory = () => {
    setMemoryCards([]);
    setFlipped([]);
    setMatched([]);
    setMemoryScore(0);
    setCurrentGame('menu');
  };

  // Puzzle Handler
  const handlePuzzleAnswer = (index: number, value: string) => {
    const newAnswers = [...puzzleAnswers];
    newAnswers[index] = value.toLowerCase();
    setPuzzleAnswers(newAnswers);
  };

  const checkPuzzle = () => {
    let score = 0;
    const correct = puzzleQuestions.map((q, i) => {
      const isCorrect = puzzleAnswers[i] === q.answer.toLowerCase();
      if (isCorrect) score++;
      return isCorrect;
    });
    setPuzzleScore(score);
    setPuzzleRevealed(correct);
  };

  const resetPuzzle = () => {
    setPuzzleAnswers(['', '', '', '']);
    setPuzzleRevealed([false, false, false, false]);
    setPuzzleScore(0);
    setCurrentGame('menu');
  };

  return (
    <>
      <Head>
        <title>Interaktive Spiele | Menschenrechte</title>
        <meta name="description" content="Spielerisch mehr über Menschenrechte lernen" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
              🎮 Interaktive Spiele
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Lernen Sie Menschenrechte auf unterhaltsame Weise!
            </p>
          </div>

          {/* Game Menu */}
          {currentGame === 'menu' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {/* Quiz Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-300 transform"
                   onClick={() => setCurrentGame('quiz')}>
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-white mb-3">Quiz</h2>
                <p className="text-white/90 mb-4">Teste dein Wissen über Menschenrechte mit 5 spannenden Fragen!</p>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                  Spielen →
                </button>
              </div>

              {/* Memory Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-300 transform"
                   onClick={() => setCurrentGame('memory')}>
                <div className="text-6xl mb-4">🧠</div>
                <h2 className="text-2xl font-bold text-white mb-3">Memory</h2>
                <p className="text-white/90 mb-4">Finde Paare von Menschenrechten und teste dein Gedächtnis!</p>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                  Spielen →
                </button>
              </div>

              {/* Puzzle Card */}
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-300 transform"
                   onClick={() => setCurrentGame('puzzle')}>
                <div className="text-6xl mb-4">🧩</div>
                <h2 className="text-2xl font-bold text-white mb-3">Wort-Puzzle</h2>
                <p className="text-white/90 mb-4">Ergänze die fehlenden Wörter aus der Menschenrechtsdeklaration!</p>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                  Spielen →
                </button>
              </div>
            </div>
          )}

          {/* Quiz Game */}
          {currentGame === 'quiz' && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              {quizIndex < quizQuestions.length ? (
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-400">Frage {quizIndex + 1} von {quizQuestions.length}</p>
                      <p className="text-blue-400 font-bold">Punkte: {quizScore}</p>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-2xl font-bold text-white mb-8">{quizQuestions[quizIndex].question}</h3>

                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {quizQuestions[quizIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={answered}
                        className={`w-full p-4 rounded-lg font-semibold transition-all text-left ${
                          selectedAnswer === idx
                            ? idx === quizQuestions[quizIndex].correct
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : answered && idx === quizQuestions[quizIndex].correct
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  {answered && (
                    <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 mb-6">
                      <p className="text-blue-200">{quizQuestions[quizIndex].explanation}</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-4">
                    <button
                      onClick={resetQuiz}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                    >
                      Zurück
                    </button>
                    {answered && (
                      <button
                        onClick={nextQuizQuestion}
                        disabled={quizIndex === quizQuestions.length - 1 && answered}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
                      >
                        {quizIndex === quizQuestions.length - 1 ? 'Fertig' : 'Weiter'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-12 text-center">
                  <h2 className="text-4xl font-bold text-white mb-4">Quiz abgeschlossen! 🎉</h2>
                  <p className="text-2xl text-white mb-8">
                    Dein Ergebnis: <span className="font-bold">{quizScore} / {quizQuestions.length}</span>
                  </p>
                  <p className="text-lg text-white/90 mb-8">
                    {quizScore === quizQuestions.length
                      ? 'Perfekt! Du bist ein Menschenrechts-Experte!'
                      : quizScore >= 4
                      ? 'Großartig! Du kennst dich gut aus!'
                      : 'Gut gemacht! Lerne mehr über Menschenrechte!'}
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    Zurück zum Menü
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Memory Game */}
          {currentGame === 'memory' && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Memory-Spiel</h2>
                <p className="text-gray-300 mb-4">Gefundene Paare: {memoryScore} / {memoryRights.length}</p>
                <div className="w-full bg-gray-700 rounded-full h-3 max-w-md mx-auto">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(memoryScore / memoryRights.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
                {memoryCards.map((card, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleMemoryCard(idx)}
                    className={`aspect-square rounded-lg font-bold text-2xl cursor-pointer transition-all duration-300 transform ${
                      flipped[idx] || matched[idx]
                        ? 'bg-gradient-to-br from-blue-400 to-purple-400 scale-100'
                        : 'bg-gray-700 hover:bg-gray-600 scale-95 hover:scale-100'
                    } flex items-center justify-center`}
                  >
                    {(flipped[idx] || matched[idx]) && card?.icon}
                  </div>
                ))}
              </div>

              {memoryScore === memoryRights.length && (
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-center mb-6">
                  <h3 className="text-3xl font-bold text-white mb-4">Gratuliere! 🎉</h3>
                  <p className="text-white/90 mb-6">Du hast alle Menschenrechtspaare gefunden!</p>
                </div>
              )}

              <div className="flex gap-4 max-w-2xl mx-auto">
                <button
                  onClick={resetMemory}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  Zurück
                </button>
                <button
                  onClick={() => {
                    setMemoryCards([]);
                    setFlipped([]);
                    setMatched([]);
                    setMemoryScore(0);
                  }}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  Neu spielen
                </button>
              </div>
            </div>
          )}

          {/* Puzzle Game */}
          {currentGame === 'puzzle' && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 text-center">Wort-Puzzle</h2>
                <p className="text-gray-300 text-center mb-6">Ergänze die fehlenden Wörter aus wichtigen Artikeln der Menschenrechtsdeklaration.</p>
              </div>

              <div className="space-y-6 mb-8">
                {puzzleQuestions.map((q, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-white mb-4">{q.question}</p>
                    <input
                      type="text"
                      value={puzzleAnswers[idx]}
                      onChange={(e) => handlePuzzleAnswer(idx, e.target.value)}
                      placeholder="Deine Antwort..."
                      disabled={puzzleRevealed[idx]}
                      className={`w-full p-3 rounded-lg font-semibold transition-all ${
                        puzzleRevealed[idx]
                          ? puzzleAnswers[idx] === q.answer.toLowerCase()
                            ? 'bg-green-500 text-white border-0'
                            : 'bg-red-500 text-white border-0'
                          : 'bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                    {puzzleRevealed[idx] && (
                      <p className="text-sm mt-2 text-gray-300">
                        Lösung: <span className="font-bold text-blue-400">{q.answer}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {puzzleRevealed[0] && (
                <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-6 mb-8 text-center">
                  <p className="text-white text-xl font-bold">
                    Ergebnis: {puzzleScore} / {puzzleQuestions.length} richtig
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={resetPuzzle}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  Zurück
                </button>
                {!puzzleRevealed[0] ? (
                  <button
                    onClick={checkPuzzle}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  >
                    Überprüfen
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setPuzzleAnswers(['', '', '', '']);
                      setPuzzleRevealed([false, false, false, false]);
                      setPuzzleScore(0);
                    }}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  >
                    Neu spielen
                  </button>
                )}
              </div>
            </div>
          )}
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
