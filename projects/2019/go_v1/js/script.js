// white stones rendering by: zpmorgan https://github.com/zpmorgan/gostones-render
// http://www.thegoblog.net/post/147144215961/cats-and-go-by-tango2010-baduk-weiqi-igo-%E5%9B%B2%E7%A2%81
/// Load images (Stones)
let black = new Image(); black.src = 'pics/black.png';
let white1 = new Image(); white1.src = 'pics/white1.png';
let white2 = new Image(); white2.src = 'pics/white2.png';
let white3 = new Image(); white3.src = 'pics/white3.png';
let white4 = new Image(); white4.src = 'pics/white4.png';
let white5 = new Image(); white5.src = 'pics/white5.png';
let white6 = new Image(); white6.src = 'pics/white6.png';
let white7 = new Image(); white7.src = 'pics/white7.png';
let white8 = new Image(); white8.src = 'pics/white8.png';
let white9 = new Image(); white9.src = 'pics/white9.png';
let white10 = new Image(); white10.src = 'pics/white10.png';
let white11 = new Image(); white11.src = 'pics/white11.png';
let white12 = new Image(); white12.src = 'pics/white12.png';
let white13 = new Image(); white13.src = 'pics/white13.png';
let white14 = new Image(); white14.src = 'pics/white14.png';

let whiteStones = [];
whiteStones.push(white1);
whiteStones.push(white2);
whiteStones.push(white3);
whiteStones.push(white4);
whiteStones.push(white5);
whiteStones.push(white6);
whiteStones.push(white7);
whiteStones.push(white8);
whiteStones.push(white9);
whiteStones.push(white10);
whiteStones.push(white11);
whiteStones.push(white12);
whiteStones.push(white13);
whiteStones.push(white14);

/// Set Canvas
let canvas = document.getElementById('board');
let c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 1024;


function resizeCanvasToDisplaySize() {
    // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
    // Die angezeigte Größe des Canvas ermitteln
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Wenn die Auflösung nicht mit der Größe übereinstimmt, anpassen
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        // Und ggf. das Brett neu zeichnen
        if (game) {
            game.w = canvas.width / game.cols;
            game.grid.forEach(intersection => {
                intersection.x = intersection.i * game.w;
                intersection.y = intersection.j * game.w;
                c.clearRect(0, 0, canvas.width, canvas.height);
                game.showBoard();
            });
            // console.log(`Resized to width: ${canvas.width} and height: ${canvas.height}!!`);
        }
        return true;
    }
    return false;
}


/// Global Variables
const startGamePanel = document.getElementById('startGame');
const inGamePanel = document.getElementById('inGame');
const endGamePanel = document.getElementById('endGame');
const moveNrOutput = document.getElementById('moveNr');
const moveColorOutput = document.getElementById('moveColor');
const capturedWhiteOutput = document.getElementById('capturedWhite');
const capturedBlackOutput = document.getElementById('capturedBlack');
const passBtn = document.getElementById('btn-pass');
const countBtn = document.getElementById('btn-count');
const pointsWhite = document.getElementById('pointsW');
const pointsBlack = document.getElementById('pointsB');
const winnerOutput = document.getElementById('winner');
const komiInput = document.getElementById('inputKomi');
let game;


/// Get it going
function startGame() {
    let inputX = document.getElementById('inputX').value;
    let inputY = document.getElementById('inputY').value;

    if ((inputX <= 40 && inputY <= 40) && (inputX >= 2 && inputY >= 2)) {
        if (inputX < inputY) {
            let swap = inputX;
            inputX = inputY;
            inputY = swap;
        }
        c.clearRect(0, 0, canvas.width, canvas.height);
        game = new Game(inputX, inputY);
        resizeCanvasToDisplaySize();
        game.showBoard();
        console.log(game);
        inGamePanel.classList.remove('hidden');
        startGamePanel.classList.add('hidden');
        endGamePanel.classList.add('hidden');
        canvas.addEventListener('click', mouse, false);
        canvas.removeEventListener('click', markDeadGroups, false);

    } else {
        alert('Bitte die Brettgröße zwischen 2x2 und 40x40 wählen.');
    }
}


function restart() {
    confirm('Sicher?\nDas aktuelle Spiel wird abgebrochen.')
    c.clearRect(0, 0, canvas.width, canvas.height);
    resizeCanvasToDisplaySize();
    startGamePanel.classList.remove('hidden');
    inGamePanel.classList.add('hidden');
}


function mouse(event) {
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (game) {
        for (let i = 0; i < game.cols*game.rows; i++) {
            if (mouseX >= game.grid[i].x
            && mouseX <= game.grid[i].x + game.w
            && mouseY <= game.grid[i].y + game.w
            && mouseY >= game.grid[i].y) {
                if (game.grid[i].state === 'empty'){
                    game.move(game.grid[i]);
                    break;
                }
            }
        }
        game.moveUI();
    }
}

function markDeadGroups(event) {
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (game) {
        for (let i = 0; i < game.cols*game.rows; i++) {
            if (mouseX >= game.grid[i].x
            && mouseX <= game.grid[i].x + game.w
            && mouseY <= game.grid[i].y + game.w
            && mouseY >= game.grid[i].y) {
                if (game.grid[i].state !== 'empty'){
                    game.markGroups(game.grid[i]);
                    break;
                }
            }
        }
        game.moveUI();
    }
}

function resign() {
    canvas.removeEventListener('click', mouse, false);
    countBtn.disabled = true;
    endGamePanel.classList.remove('hidden');

    let winner = (game.lastMove === 'w' || game.lastMove === 'passW') ? 'weiß' : 'schwarz';
    winnerOutput.innerHTML = (winner === 'black') ? `S+Aufgabe` : `W+Aufgabe`;

    alert(`Gewonnen hat ${winner}\ndurch Aufgabe des gegnerischen Spielers.`);
}
