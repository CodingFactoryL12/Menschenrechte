# Implementierungsanleitung: Highscore-System

## Übersicht

Das Highscore-System wurde implementiert, um Spieler-Erfolge in deinen Spielen zu speichern und anzuzeigen.

## Installation

### 1. Script einbinden

Füge das Highscore-Manager-Script in den `<head>` oder vor dem `</body>` Tag deiner HTML-Datei ein:

```html
<script src="public/highscore-manager.js"></script>
```

### 2. Highscore-Container hinzufügen

Füge in deinem Spiel einen Container für die Highscores ein:

```html
<div id="highscores"></div>
```

## Verwendung

### Highscores initialisieren

```javascript
// Am Ende des Spiels oder beim Laden der Seite
const manager = initializeHighscoreDisplay('meinSpielName', 'highscores');
```

### Score hinzufügen

```javascript
// Wenn der Spieler das Spiel beendet
const playerName = prompt('Gib deinen Namen ein:');
showHighscorePopup('meinSpielName', finalScore, playerName);
```

### Manuelle Methoden

```javascript
const manager = new HighscoreManager('meinSpielName');

// Score hinzufügen
manager.addScore('Spieler Name', 1500);

// Highscores abrufen
const scores = manager.getHighscores();

// Prüfen ob Score in Top 10 ist
if (manager.isHighscore(2000)) {
    console.log('Neuer Highscore!');
}

// Highscores löschen
manager.clearHighscores();

// HTML rendern
manager.renderHighscores('highscores');
```

## Beispiel-Integration in ein Quiz-Spiel

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Mein Quiz-Spiel</title>
    <link rel="stylesheet" href="styles.css">
    <script src="public/highscore-manager.js"></script>
</head>
<body>
    <div class="container">
        <h1>Quiz-Spiel</h1>
        
        <!-- Highscores anzeigen -->
        <section class="highscore-container">
            <h2 class="highscore-title">🏆 Top 10 Highscores</h2>
            <div id="highscores"></div>
        </section>

        <!-- Spiel-Inhalt -->
        <div id="gameContent"></div>
    </div>

    <script>
        // Highscores beim Laden anzeigen
        window.addEventListener('DOMContentLoaded', () => {
            const quizManager = initializeHighscoreDisplay('quiz', 'highscores');
        });

        // Nach Spielende
        function endGame(finalScore) {
            const playerName = prompt('Glückwunsch! Gib deinen Namen für die Highscore-Liste ein:');
            if (playerName) {
                showHighscorePopup('quiz', finalScore, playerName);
                // Neuladen für aktualisierte Highscores
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }
    </script>
</body>
</html>
```

## Features

✅ Speichert bis zu 10 beste Scores pro Spiel
✅ Verwendet Browser-LocalStorage (keine Serververbindung nötig)
✅ Zeigt Rang, Spielernamen, Score und Datum an
✅ Medaillen für die Top 3 (🥇🥈🥉)
✅ Sichere HTML-Escaping gegen XSS-Attacken
✅ Einfache API für die Verwendung

## Datenspeicherung

Die Scores werden im Browser-LocalStorage unter dem Schlüssel `highscores_[spielName]` gespeichert.
Beispiel: `highscores_quiz`, `highscores_memory`, `highscores_puzzle`

## Browser-Kompatibilität

Das System funktioniert in allen modernen Browsern, die LocalStorage unterstützen:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅

## Styling

Die Highscores werden automatisch mit den CSS-Klassen aus `styles.css` formatiert:
- `.highscore-container` - Container mit Gradient-Hintergrund
- `.highscore-list` - Liste der Scores
- `.highscore-item` - Einzelner Score-Eintrag
- `.highscore-rank` - Rang-Kreis
- `.highscore-score` - Score-Wert

## Sicherheit

Das System escapt automatisch alle Benutzereingaben, um XSS-Attacken zu verhindern.
