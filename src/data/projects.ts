export interface ProjectGroup {
  id: number;
  name: string;
  teamName: string;
  members: string[];
  focus: string;
  description: string;
  icon: string;
  color: string;
}

export const projectGroups: ProjectGroup[] = [
  {
    id: 1,
    name: "Gruppe 1 - Video",
    teamName: "Video-Team",
    members: ["Luis", "Noah", "Micky"],
    focus: "Videoproduktion",
    description: "Dieses Team produziert aussagekräftige Videoaufnahmen zu verschiedenen Menschenrechtsthemen. Sie recherchieren, planen Dreharbeiten und schneiden professionelle Videos, um komplexe Inhalte verständlich und ansprechend zu vermitteln.",
    icon: "🎬",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 2,
    name: "Gruppe 2 - Zeichnen",
    teamName: "Zeichner-Team",
    members: ["Greta", "Marla"],
    focus: "Illustrationen & Grafiken",
    description: "Greta und Marla erstellen wunderschöne Illustrationen und grafische Darstellungen, die Menschenrechtsthemen visuell vermitteln. Ihre kunstlerischen Werke helfen, abstraktive Konzepte konkret und emotional zugänglich zu machen.",
    icon: "🎨",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Gruppe 3 - Zeichnen",
    teamName: "Illustration-Team",
    members: ["Emilia", "Amelie", "Hannah"],
    focus: "Visuelle Gestaltung",
    description: "Dieses erfahrene Illustrator:innen-Team arbeit an umfangreichen visuellen Projekten. Sie kombinieren verschiedene Techniken und Stile, um emotionale und aussagekräftige Darstellungen von Menschenrechtsfragen zu schaffen.",
    icon: "✏️",
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 4,
    name: "Gruppe 4 - Zeichnen + Text",
    teamName: "Mixed-Media-Team",
    members: ["Johann", "Emilia", "Elias"],
    focus: "Text & Illustration",
    description: "Johann, Emilia und Elias verbinden visuelle Kunst mit aussagekräftigen Texten. Ihr multimedialer Ansatz ermöglicht eine tiefere und facettenreichere Vermittlung von Menschenrechtsthemen durch die Kombination von Bild und Wort.",
    icon: "📝",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 5,
    name: "Gruppe 5 - Text und Geschichte",
    teamName: "Storytelling-Team",
    members: ["Ole", "Mathias"],
    focus: "Narrative & Texterstellung",
    description: "Ole und Mathias erzählen Geschichten, die inspirieren und aufklären. Sie recherchieren Menschenrechtsfälle und formen sie in fesselnde Narrative, die zeigen, wie Menschenrechte das tägliche Leben beeinflussen.",
    icon: "📖",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 6,
    name: "Gruppe 6 - Comic",
    teamName: "Comic-Team",
    members: ["Max B."],
    focus: "Comic-Kreation",
    description: "Max B. kreiert einprägsame Comics, die Menschenrechtsthemen humorvoll, kreativ und leicht verständlich darstellen. Comics bieten eine perfekte Möglichkeit, gerade junge Menschen zu erreichen und zum Nachdenken anzuregen.",
    icon: "💭",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 7,
    name: "Gruppe 7 - Karikatur + Schaubild",
    teamName: "Grafik-Analytics-Team",
    members: ["Noel", "Oskar"],
    focus: "Datenvisualisierung & Karikaturen",
    description: "Noel und Oskar verwandeln komplexe Daten in verständliche Schaubilder und nutzen Karikaturen, um kritische Punkte pointiert hervorzuheben. Ihre Arbeit macht Statistiken und Zahlen zu Menschenrechtsthemen anschaulich und einprägsam.",
    icon: "📊",
    color: "from-teal-500 to-cyan-500"
  },
  {
    id: 8,
    name: "Gruppe 8 - Stop Motion",
    teamName: "Stop-Motion-Team",
    members: ["Xenia", "Finja", "Helene"],
    focus: "Stop-Motion Animation",
    description: "Xenia, Finja und Helene kreieren faszinierende Stop-Motion-Animationen, die Menschenrechtsthemen zum Leben erwecken. Diese aufwändige Technik ermöglicht kreative und zeitlose Darstellungen wichtiger sozialer Botschaften.",
    icon: "🎞️",
    color: "from-green-500 to-emerald-500"
  }
];

export const projectStats = {
  totalGroups: projectGroups.length,
  totalMembers: projectGroups.reduce((sum, group) => sum + group.members.length, 0),
  maintainer: "Leon Friedrich",
  year: 2025
};
