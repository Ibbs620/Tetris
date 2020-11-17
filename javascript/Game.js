let shape, blockMatrix;
let shapeIDs = ['i', 'o', 'l', 'j', 't', 'z', 's'];
let currentPiece = 0;
let maxPiece;

function setup(){
    var canvas = createCanvas(10 * 20, 24 * 20);
    canvas.parent("grid");
    background(100);
    frameRate(30);
    blockMatrix = new BlockMatrix();
    shape = new Shape(shapeIDs[currentPiece], blockMatrix);
    currentPiece++;
    maxPiece = int(random(3,6));
}

function draw(){
    background(100);
    if(!shape.dead) shape.moveDown();
    else {
        blockMatrix.add(shape);
        shape = new Shape(shapeIDs[currentPiece], blockMatrix);
        currentPiece++;
        if(currentPiece == maxPiece) {
            shuffle(shapeIDs, true);
            currentPiece = 0;
            maxPiece = int(random(3,6));
        }
    }
    shape.draw();
    blockMatrix.draw();
}

function keyPressed(){
    if(keyCode === LEFT_ARROW && !shape.dead) shape.moveLeft();
    if(keyCode === RIGHT_ARROW && !shape.dead) shape.moveRight();
}
