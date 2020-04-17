/* References:
 * Applications of matrices: https://www.youtube.com/watch?v=rowWM-MijXU
 * Matrix multiplication in code: https://www.youtube.com/watch?v=tzsgS19RRc8
 * filter image processing: https://www.youtube.com/watch?v=mmPOCGRLgeA
 * blurs and filters: https://www.youtube.com/watch?v=C_zFhWdM4ic&t=264s
 * edge detection: https://www.youtube.com/watch?v=uihBwtPIBxM
 */

let img, res;
let filters;
let origImg;

function preload() {
    img = loadImage('flower_100.jpeg');
    res = createImage(100,100);
    pixelDensity(1);

    filters = {
        blur: [
            [1/9, 1/9, 1/9],
            [1/9, 1/9, 1/9],
            [1/9, 1/9, 1/9]
        ],
        gauß: [
            [1/16, 1/8, 1/16],
            [1/8,  1/4, 1/8],
            [1/16, 1/8, 1/16]
        ],
        sharp: [
            [ 0, -1,  0],
            [-1,  5, -1],
            [ 0, -1,  0]
        ],
        sponge: [
            [ 0,  1,  0],
            [ 1,  5,  1],
            [ 0,  1,  0]
        ],
        edge: [
            [-1, -1, -1],
            [-1,  8, -1],
            [-1, -1, -1]
        ]
    }
}

function setup() {
    let cnv = createCanvas(275, 150);
    cnv.position(50, 50);
    background(220);

    // Pixel aus Bildern extrahieren und bearbeitbar machen
    img.loadPixels();
    res.loadPixels();

    // Bildformat anpassen
    origImg = getImgValueMatrix(100, 100, img.pixels);

    // Überschrift
    let heading = createP("Basic selfmade Image Filtering");
    heading.position(50, 15);

    // Knöpfe einfügen
    let BTN_blur = createButton('blur')
        .position(330, 50)
        .size(50, 25)
        .mousePressed(buttonHandler);

    let BTN_gauß = createButton('gauß')
        .position(330, 80)
        .size(50, 25)
        .mousePressed(buttonHandler);

    let BTN_sharp = createButton('sharp')
        .position(330, 110)
        .size(50, 25)
        .mousePressed(buttonHandler);

    let BTN_sponge = createButton('sponge')
        .position(330, 140)
        .size(50, 25)
        .mousePressed(buttonHandler);

    let BTN_edge = createButton('edge')
        .position(330, 170)
        .size(50, 25)
        .mousePressed(buttonHandler);

    // File input
    let input = createFileInput(handleFile);
    input.position(50, 205);
}


function draw() {
    // Bilder darstellen
    image(img, 25, 25, 100, 100);
    image(res, 150, 25);
}


function buttonHandler() {
    applyFilter(origImg, filters[this.elt.innerText]);
}


function handleFile(file) {
    if (file.type === "image") {
        img = loadImage(file.data, image => {
            image.resize(100, 100);
            image.loadPixels();
            origImg = getImgValueMatrix(100, 100, image.pixels);
        });
    }
}

function getImgValueMatrix(imgWidth, imgHeight, pxs) {
    // pxs = Pixelarray des Bildes, das p5.img.get() liefert
    // Bild-Farbwerte im Matrix-Format speichern

    let imgMatrix = [];

    for (let p = 0; p < imgHeight; p++) {
        imgMatrix.push(new Array(imgWidth));
    }

    for (let i = 0; i < imgHeight; i++) {
        for (let j = 0; j < imgWidth; j++) {
            let index = (i*imgWidth*4) + (j*4);
            imgMatrix[i][j] =  [pxs[index],
                                pxs[index+1],
                                pxs[index+2],
                                pxs[index+3]];
        }
    }

    return imgMatrix;
}

function applyFilter(imgMatrix, filterMatrix) {
    let result = [];
    for (let y = 0; y < imgMatrix.length-2; y++) {
        let line = [];
        for (let x = 0; x < imgMatrix[y].length-2; x++) {
            let sum_r = 0;
            let sum_g = 0;
            let sum_b = 0;
            let sum_a = 0;
            for (let a = y; a < y+3; a++) {
                for (let b = x; b < x+3; b++) {
                    sum_r += imgMatrix[a][b][0] * filterMatrix[a-y][b-x];
                    sum_g += imgMatrix[a][b][1] * filterMatrix[a-y][b-x];
                    sum_b += imgMatrix[a][b][2] * filterMatrix[a-y][b-x];
                    sum_a += imgMatrix[a][b][3] * filterMatrix[a-y][b-x];
                }
            }
            // line.push(Math.floor((sum_r/9 + sum_g/9 + sum_b/9 + sum_a/9)/4)); // blur: black and white
            line.push([sum_r, sum_g, sum_b, sum_a]);
        }
        result.push(line);
    }

    for (let y = 0; y < res.height-2; y++) {
        for (let x = 0; x < res.width-2; x++) {
            // res.set(x, y, color(result[y][x])); // blur: black and white
            res.set(x, y, color(result[y][x][0], result[y][x][1], result[y][x][2], result[y][x][3])); // blur: box blur
        }
    }

    res.updatePixels();
    return result;
}

function multMatrix(a, b) {
    let rowA = a.length;        //console.log("rowA: ", rowA);
    let colA = a[0].length;     //console.log("colA: ", colA);
    let rowB = b.length;        //console.log("rowB: ", rowB);
    let colB = b[0].length;     //console.log("colB: ", colB);

    if (!(colA === rowB)) {
        console.log("Diese Matrizen lassen sich nicht multiplizieren.\nEs muss gelten: Spalten(A) = Zeilen(B).");
        return null;
    } else {
        let m = [];
        for (let p = 0; p < rowA; p++) {
            m.push(new Array(colB));
        }

        for(let i = 0; i < rowA; i++) {
            for (let j = 0; j < colB; j++) {
                let sum = 0;
                for (let k = 0; k < rowB; k++) {
                    sum += (a[i][k] * b[k][j]);
                }
                m[i][j] = sum;
            }
        }
        return m;
    }
}

function printMyMatrix(m) {
    console.log(`Matrix Dimensions: ${m.length} x ${m[0].length}`);
    console.table(m);
}
