// white stones rendering by: zpmorgan https://github.com/zpmorgan/gostones-render
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

canvas.width = 640; //normal value: 760
canvas.height = 640;

let c = canvas.getContext('2d');

let moveNr = document.getElementById('moveNr');
let moveColor = document.getElementById('moveColor');
let capStonesW = document.getElementById('capStonesW')
let capStonesB = document.getElementById('capStonesB')


function index(i, j) {
// finds the index of a intersection in the 1-dimensional grid-array
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
        return -1
    }
    return i + j * cols;
}

window.onload = function(){
    /// Get it going
    // var game = new Game(9 , 9); //Immer die größere Zahl zuerst!!
    // game.showBoard();
}

function mouse(event) {
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (let i = 0; i < cols*rows; i++) {
        if (mouseX >= grid[i].x
        && mouseX <= grid[i].x + w
        && mouseY <= grid[i].y + w
        && mouseY >= grid[i].y) {
            if (grid[i].state == 'empty'){
                grid[i].move();
                break;
            }
        }
    }
}

function mousemove(event) {
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (let i = 0; i < cols*rows; i++) {
        if (mouseX >= grid[i].x
        && mouseX <= grid[i].x + w
        && mouseY <= grid[i].y + w
        && mouseY >= grid[i].y) {
            if (grid[i].state == 'empty'){
                console.log("x: " + Math.floor(grid[i].x) + " | y: " + Math.floor(grid[i].y));
                break;
            }
        }
    }
}

canvas.addEventListener('click', mouse, false);
// canvas.addEventListener('mousemove', mousemove, false);

let startGamePanel = document.getElementById('startGame');
let inGamePanel = document.getElementById('inGame');
let endGamePanel = document.getElementById('endGame');

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
        let game = new Game(inputX, inputY);
        console.log(game);
        game.showBoard();
        inGamePanel.classList.remove('hidden');
        startGamePanel.classList.add('hidden');
    } else {
        alert('Bitte die Brettgröße zwischen 2x2 und 40x40 wählen.');
    }
}

function restart() {
    startGamePanel.classList.remove('hidden');
    inGamePanel.classList.add('hidden');
}

function pass() {
    if (moves[moves.length-1] == moves[moves.length-2]) {
        console.log("End the Game!!");
    }

    if (lastMove == 'passb' || lastMove == 'passw') {
        game.endGame();
    } else if (lastMove == 'w') {
        lastMove = 'passb';
    } else if (lastMove == 'b') {
        lastMove = 'passw';
    }
    Game.saveMove();
    Game.moveUI();
}


function showMoveBack() {
    let btnLeft = document.getElementById('btn-left');

    if (game.moveCounter >= 2) {
        console.log(game.moveCounter);
        game.moveCounter--;
        moveNr.innerHTML=game.moveCounter;
        c.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(moves[game.moveCounter]);
        moves[game.moveCounter-1].forEach(move => move.showIntersection());
    }
}


function showMoveForw() {
    let btnRight = document.getElementById('btn-right');


    if (game.moveCounter < moves.length) {
        // console.log(game.moveCounter);
        game.moveCounter++;
        moveNr.innerHTML=game.moveCounter;
        // console.log(game.moveCounter);
        c.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(moves[game.moveCounter]);
        moves[game.moveCounter-1].forEach(move => move.showIntersection());
    }
}


function gotoMove() {
    let goto = document.getElementById('gotoMoveNr');
    console.log(goto.value);
    alert(goto.value);
    game.moveCounter -= goto.value;
    // c.clearRect(0, 0, canvas.width, canvas.height);
    moves[game.moveCounter-1].forEach(move => move.showIntersection());
}
