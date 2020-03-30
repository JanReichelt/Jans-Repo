World Empire

How to start the app:
(0. Download des Projektordners vom Google Drive)
1. Download Node.js: https://nodejs.org/en/ (LTS-Version bevorzugt)
2. Installieren von Node.js
3. Terminal öffnen und prüfen, ob Node und npm (Node package manager) installiert sind:
    node --version
    npm --version - beide zeigen die installierte Version an, wenn vorhanden
4. In den Projektordner bewegen:
    cd ~/.../world_empire_app
5. Alle dependencies installieren:
    npm install - Installation sollte ohne Probleme laufen
6. Applikation starten (Entwicklungsmodus):
    npm run dev
7. Im Browser Anwendung aufrufen:
    http://localhost:5000/map
8. Jetzt sollte die Karte zu sehen sein mit minimaler Funktionalität (Hover und Klick-Events)

Momentan gibt es das Problem, dass die Datenbank (PostgreSQL) auf diese Weise nicht mitkommt.
Es kann also dabei zu Fehlern kommen.
Wahrscheinlich muss dafür PostgreSQL ebenfalls installiert und die sql_dump-Datei gestartet werden.


Schnell mal eine uuid generieren:
 Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
 https://gist.github.com/6174/6062387
