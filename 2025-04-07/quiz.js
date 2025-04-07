// Klasse Frage
class Frage {
    constructor(frage, optionen, antwort) {
      this.frage = frage;
      this.optionen = optionen;
      this.antwort = antwort;
    }
  
    anzeigen(index) {
      let html = `<div class="frage"><p>${index + 1}. ${this.frage}</p>`;
      this.optionen.forEach((opt) => {
        html += `<label><input type="radio" name="frage${index}" value="${opt}"> ${opt}</label><br>`;
      });
      html += `</div>`;
      return html;
    }
  
    pruefen(gegeben) {
      return gegeben === this.antwort;
    }
  }
  
  // Fragen definieren
  const fragen = [
    new Frage("Was ist 1 + 1?", ["1", "2", "3"], "2"),
    new Frage("Was ist 4 - 2?", ["1", "2", "3"], "2"),
    new Frage("Was ist 2 × 3?", ["5", "6", "7"], "6")
  ];
  
  // Quiz anzeigen
  const quizForm = document.getElementById("quizForm");
  fragen.forEach((frage, i) => {
    quizForm.innerHTML += frage.anzeigen(i);
  });
  
  // Auswertung
  function auswerten() {
    let punkte = 0;
    fragen.forEach((frage, i) => {
      const selected = document.querySelector(`input[name="frage${i}"]:checked`);
      if (selected && frage.pruefen(selected.value)) {
        punkte++;
      }
    });
    document.getElementById("ergebnis").textContent = `Du hast ${punkte} von ${fragen.length} richtig.`;
  }
  