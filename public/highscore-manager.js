// Highscore Management System
class HighscoreManager {
    constructor(gameName) {
        this.gameName = gameName;
        this.storageKey = `highscores_${gameName}`;
        this.maxHighscores = 10;
    }

    // Füge einen neuen Score hinzu
    addScore(playerName, score) {
        const highscores = this.getHighscores();
        
        highscores.push({
            playerName,
            score,
            date: new Date().toLocaleString('de-DE')
        });

        // Sortiere absteigend und behalte nur die besten
        highscores.sort((a, b) => b.score - a.score);
        highscores.splice(this.maxHighscores);

        localStorage.setItem(this.storageKey, JSON.stringify(highscores));
        return highscores;
    }

    // Hole alle Highscores
    getHighscores() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Überprüfe ob ein Score in die Top 10 kommt
    isHighscore(score) {
        const highscores = this.getHighscores();
        if (highscores.length < this.maxHighscores) return true;
        return score > highscores[highscores.length - 1].score;
    }

    // Lösche alle Highscores
    clearHighscores() {
        localStorage.removeItem(this.storageKey);
    }

    // Rendere Highscores als HTML
    renderHighscores(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const highscores = this.getHighscores();

        if (highscores.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #4b5563;">Noch keine Highscores. Spiel das Spiel und sei der Erste!</p>';
            return;
        }

        let html = '<div class="highscore-list">';
        highscores.forEach((hs, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
            html += `
                <div class="highscore-item">
                    <div class="highscore-rank">${medal || index + 1}</div>
                    <div class="highscore-info">
                        <div class="highscore-name">${this.escapeHtml(hs.playerName)}</div>
                        <small style="color: #9ca3af;">${hs.date}</small>
                    </div>
                    <div class="highscore-score">${hs.score.toLocaleString('de-DE')} Punkte</div>
                </div>
            `;
        });
        html += '</div>';
        html += `<button class="clear-highscores-btn" onclick="document.querySelector('[data-game]').dataset.highscoreManager.clearHighscores(); location.reload();">🗑️ Highscores löschen</button>`;
        
        container.innerHTML = html;
    }

    // Escape HTML für Sicherheit
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Globale Hilfsfunktion für Game-Seiten
function initializeHighscoreDisplay(gameName, containerId) {
    const manager = new HighscoreManager(gameName);
    manager.renderHighscores(containerId);
    return manager;
}

// Zeige Highscore-Popup nach Spiel
function showHighscorePopup(gameName, finalScore, playerName) {
    const manager = new HighscoreManager(gameName);
    
    if (manager.isHighscore(finalScore)) {
        manager.addScore(playerName, finalScore);
        alert(`🎉 Glückwunsch ${playerName}! Du hast einen neuen Highscore erreicht: ${finalScore} Punkte!`);
    } else {
        alert(`Spiel vorbei! Dein Score: ${finalScore} Punkte.`);
    }
}
