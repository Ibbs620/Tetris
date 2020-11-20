let shape, blockMatrix;
let shapeIDs = ['i', 'j', 'l', 't', 's', 'z', 't'];
let currentPiece = 0;
let maxPiece = 3;
let currentFrame = 0;
let fallSpeed = 100;
let move = 0;
let moveSpeed = 10;

function setup(){
    var canvas = createCanvas(10 * 20, 24 * 20);
    canvas.parent("grid");
    background(100);
    frameRate(30);
    blockMatrix = new BlockMatrix();
    shape = new Shape(shapeIDs[currentPiece], blockMatrix);
    shuffle(shapeIDs, true);
    currentPiece++;
}

function draw(){
    background(100);
    if(!shape.dead && currentFrame % fallSpeed == 0) {
        shape.moveDown();
    } else if(shape.dead) {
        blockMatrix.add(shape);
        shape = new Shape(shapeIDs[currentPiece], blockMatrix);
        currentPiece++;
        if(currentPiece == maxPiece) {
            shuffle(shapeIDs, true);
            currentPiece = 0;
            maxPiece = int(random(3,6));
        }
    }
    
    if(keyIsDown(DOWN_ARROW)){
        fallSpeed = 20;
    } else {
        fallSpeed = 10;
    }

    if(keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)){
        move++;
    } else {
        move = 0;
        moveSpeed = 10;
    }
    if(move == moveSpeed){
        moveSpeed = 2;
        if(keyIsDown(LEFT_ARROW)){
            shape.moveLeft();
        } else if(keyIsDown(RIGHT_ARROW)){
            shape.moveRight();
        }
        move = 0;
    }

    shape.draw();
    blockMatrix.draw();
    currentFrame++;
}

function keyPressed(){
    if(keyCode === LEFT_ARROW && !shape.dead) shape.moveLeft();
    if(keyCode === RIGHT_ARROW && !shape.dead) shape.moveRight();
    if(keyCode === UP_ARROW && !shape.dead) shape.rotateShape(-1);
    if(keyCode === 90 && !shape.dead) shape.rotateShape(1);
    if(keyCode === 32) shape.hardDrop();
}
