export function generateProjectCSV() {
  let csv = 'Gruppe,Fokus,Teamglieder\n';
  
  const projectGroups = [
    {
      name: "Gruppe 1 - Video",
      focus: "Videoproduktion",
      members: ["Luis", "Noah", "Micky"]
    },
    {
      name: "Gruppe 2 - Zeichnen",
      focus: "Illustrationen & Grafiken",
      members: ["Greta", "Marla"]
    },
    {
      name: "Gruppe 3 - Zeichnen",
      focus: "Visuelle Gestaltung",
      members: ["Emilia", "Amelie", "Hannah"]
    },
    {
      name: "Gruppe 4 - Zeichnen + Text",
      focus: "Text & Illustration",
      members: ["Johann", "Emilia", "Elias"]
    },
    {
      name: "Gruppe 5 - Text und Geschichte",
      focus: "Narrative & Texterstellung",
      members: ["Ole", "Mathias"]
    },
    {
      name: "Gruppe 6 - Comic",
      focus: "Comic-Kreation",
      members: ["Max B."]
    },
    {
      name: "Gruppe 7 - Karikatur + Schaubild",
      focus: "Datenvisualisierung & Karikaturen",
      members: ["Noel", "Oskar"]
    },
    {
      name: "Gruppe 8 - Stop Motion",
      focus: "Stop-Motion Animation",
      members: ["Xenia", "Finja", "Helene"]
    }
  ];

  projectGroups.forEach(group => {
    csv += `"${group.name}","${group.focus}","${group.members.join(', ')}"\n`;
  });

  return csv;
}

export function downloadProjectsCSV() {
  const csv = generateProjectCSV();
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', 'schuelerprojekte.csv');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
