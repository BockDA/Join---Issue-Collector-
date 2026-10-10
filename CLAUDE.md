## Zweck dieses Projekts

Dieses Projekt ist ein Projekt einer weiterbildung
Ich lerne Programmierung und möchte die Anwendung gemeinsam mit Claude Code Schritt für Schritt entwickeln.

Das wichtigste Ziel ist NICHT, die Anwendung möglichst schnell fertigzustellen.

Das wichtigste Ziel ist, dass ich den entstehenden Code verstehe und nachvollziehen kann.

---

# Arbeitsweise

Arbeite immer in kleinen, überschaubaren Schritten.

Implementiere niemals mehrere größere Funktionen gleichzeitig.

Nach jedem sinnvollen Schritt soll gestoppt werden, damit ich:

1. den Code ansehen kann,
2. Fragen stellen kann,
3. den Schritt selbst nachvollziehen kann,
4. das Ergebnis testen kann.

Erst danach soll der nächste Schritt umgesetzt werden.

---

# Vor jeder Änderung

Bevor du Code veränderst:

1. Erkläre kurz, was wir als Nächstes machen.
2. Nenne die Dateien, die geändert oder neu erstellt werden sollen.
3. Erkläre kurz, warum diese Änderung notwendig ist.
4. Warte bei größeren Änderungen auf meine Zustimmung.

Bei sehr kleinen Änderungen darfst du sie direkt durchführen und anschließend erklären.

---

# Nach jeder Änderung

Nach einer Änderung:

1. Zeige mir, welche Datei geändert wurde.
2. Erkläre den neuen Code verständlich.
3. Erkläre wichtige Befehle, Funktionen, Variablen und Sprachkonstrukte.
4. Erkläre, wie der neue Code mit dem bisherigen Code zusammenarbeitet.
5. Sage mir, wie ich die Änderung testen kann.
6. Stoppe danach.
7. zeige im code wenn was dazugekommen ist in grün
    und was gelöscht würde in rot

Nicht automatisch mit dem nächsten Entwicklungsschritt weitermachen.

---

# Größe der Entwicklungsschritte

Bevorzuge kleine Änderungen.

Ein typischer Schritt sollte möglichst nur:

- eine kleine Funktion,
- eine einzelne Komponente,
- einen einzelnen Event-Handler,
- eine kleine Änderung am Datenmodell,
- eine kleine UI-Erweiterung
- oder ein klar abgegrenztes Konzept

enthalten.

Wenn eine Aufgabe zu groß ist, teile sie zuerst in mehrere kleine Schritte auf.

---

# Lernmodus

Gehe davon aus, dass ich den Code lernen und verstehen möchte.

Verwende deshalb möglichst verständlichen und gut lesbaren Code.

Bevorzuge zunächst einfache Lösungen gegenüber besonders cleveren oder stark abstrahierten Lösungen.

Vermeide unnötige Abstraktionen.

Vermeide unnötig komplizierte Design Patterns.

Vermeide unnötige Framework-Magie.

Wenn es mehrere Möglichkeiten gibt, erkläre kurz die wichtigsten Varianten und warum du eine davon verwenden möchtest.

---

# Code erklären

Erkläre insbesondere neue Konzepte, wenn sie zum ersten Mal im Projekt auftauchen.

Beispiele:

- Variablen
- Funktionen
- Parameter
- Rückgabewerte
- Objekte
- Arrays
- Interfaces
- Klassen
- async / await
- Promises
- Event Listener
- DOM-Zugriffe
- Module
- Imports und Exports
- Datenbankabfragen
- APIs

Erkläre nicht nur WAS der Code macht, sondern auch WARUM er so geschrieben wurde.

---

# Bestehenden Code respektieren

Bevor du eine Datei änderst, lies den relevanten bestehenden Code.

Ändere nur das, was für den aktuellen Schritt notwendig ist.

Keine unnötigen Refactorings.

Keine Umbenennungen ohne Grund.

Keine komplette Neustrukturierung des Projekts ohne vorherige Rücksprache.

Keine bestehenden Funktionen entfernen, nur weil eine andere Lösung eleganter wäre.

---

# Dateien

Erstelle nur Dateien, die für den aktuellen Schritt notwendig sind.

Lösche keine Dateien ohne meine ausdrückliche Zustimmung.

Verschiebe oder benenne keine Dateien ohne meine Zustimmung.

---

# Pakete und Abhängigkeiten

Installiere keine neuen npm-, Python- oder sonstigen Pakete ohne vorher zu erklären:

- welches Paket benötigt wird,
- wofür es benötigt wird,
- warum die Funktion nicht sinnvoll ohne dieses Paket umgesetzt werden kann.

Warte anschließend auf meine Zustimmung.

Führe insbesondere nicht automatisch Befehle wie

npm install

pip install

oder vergleichbare Installationen aus.

---

# Sicherheit

Sensible Dateien dürfen nicht ohne ausdrückliche Aufforderung gelesen oder verändert werden.

Dazu gehören insbesondere:

.env
.env.local
.env.production

sowie Dateien mit:

- Passwörtern
- API-Keys
- Tokens
- privaten Schlüsseln
- Zugangsdaten

Zeige niemals Geheimnisse oder Zugangsdaten im Chat an.

---

# Terminalbefehle

Erkläre ungewöhnliche oder möglicherweise gefährliche Terminalbefehle vor der Ausführung.

Führe keine destruktiven Befehle ohne ausdrückliche Zustimmung aus.

Insbesondere keine Befehle, die:

- Dateien massenhaft löschen,
- Verzeichnisse löschen,
- Git-Historien verändern,
- Datenbanken löschen,
- Daten überschreiben
- oder Systemkonfigurationen verändern.

---

# Git

Führe keine automatischen Commits oder Pushes durch.

Kein:

git commit

git push

git reset --hard

git clean

ohne meine ausdrückliche Aufforderung.

---

# Fehler

Wenn ein Fehler auftritt:

Nicht sofort mehrere Änderungen ausprobieren.

Gehe systematisch vor.

1. Fehlermeldung lesen.
2. Ursache erklären.
3. Eine mögliche Lösung vorschlagen.
4. Möglichst nur eine Änderung durchführen.
5. Danach erneut testen.

Ich möchte auch verstehen, warum ein Fehler entstanden ist.

---

# Kommentare im Code

Verwende Kommentare dort, wo sie für das Verständnis hilfreich sind.

Kommentiere aber nicht jede offensichtliche Codezeile.

Kommentare sollen hauptsächlich erklären, WARUM etwas gemacht wird.

---

# Wenn ich eine neue Funktion wünsche

Wenn ich beispielsweise sage:

"Wir brauchen jetzt eine Benutzerverwaltung."

Dann sollst du NICHT sofort die komplette Benutzerverwaltung programmieren.

Teile die Aufgabe zunächst in kleine Lernschritte auf.

Zum Beispiel:

1. Datenmodell überlegen
2. Benutzer anzeigen
3. Benutzer hinzufügen
4. Eingaben prüfen
5. Benutzer bearbeiten
6. Benutzer löschen
7. Datenbank anbinden

Wir bearbeiten anschließend immer nur einen Schritt.

---

# Wichtigste Regel

Ich möchte selbst verstehen, wie diese Anwendung entsteht.

Geschwindigkeit ist zweitrangig.

Wenn du zwischen

"komplett automatisch fertigstellen"

und

"kleiner verständlicher Lernschritt"

wählen kannst, wähle immer den kleinen verständlichen Lernschritt.

Nach jedem abgeschlossenen Lernschritt stoppen und auf meine nächste Anweisung warten.