let shape, blockMatrix;
let shapeIDs = ['i', 'j', 'l', 'o', 's', 'z', 't'];
let currentPiece = 0;
let currentFrame = 0;
let fallSpeed = 60;
let move = 0;
let moveSpeed = 15;
let level = 20;
let score = 0;
let totalLines = 0;
let currentLines = 0;
//variables

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
//prevents arrow key and spacebar scrolling

function setup(){
    var canvas = createCanvas(10 * 20, 24 * 20);
    canvas.parent("grid");
    background(100);
    //setup canvas
    blockMatrix = new BlockMatrix();
    shuffle(shapeIDs, true);
    shape = new Shape(shapeIDs[currentPiece], blockMatrix, false);
    currentPiece++;
    //setup game elements
}

function draw(){
    background(100);

    if(!shape.canMoveDown()){
        fallSpeed = 60 - (level - 1);
        if(move > 0){
            fallSpeed *= 3;
        }
    } else if(keyIsDown(DOWN_ARROW)){
        fallSpeed = 2;
        //soft drop when down key held 
    } else {
        fallSpeed = 60 - (level - 1) * 3; 
    }
 

    if(!shape.dead && currentFrame % fallSpeed == 0) { 
        shape.moveDown();
        if(keyIsDown(DOWN_ARROW))score += 1;
    } else if(shape.dead) {
        blockMatrix.add(shape);
        shape = new Shape(shapeIDs[currentPiece], blockMatrix);
        currentPiece++;
        //add dead shape to dead blocks matrix and create new shape
        if(currentPiece == 7) { //shuffle shapeID array to prevent multiples of the same shape
            shuffle(shapeIDs, true);
            currentPiece = 0;
        }
    }
 

    if(keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)){
        move++;
    } else {
        move = 0;
        moveSpeed = 15;
    }
    if(move == moveSpeed){
        moveSpeed = 3;
        if(keyIsDown(LEFT_ARROW)){
            shape.moveLeft();
        } else if(keyIsDown(RIGHT_ARROW)){
            shape.moveRight();
        }
        move = 0;
    }
    //lets user hold down left/right arrow keys to move shape. Sensitivity increases after 0.3 seconds of a keypress._
    currentLines = blockMatrix.clearLines();
    totalLines += currentLines;
    level = Math.floor(totalLines / 10) + 1;
    if(shape.shapeID == 't' && blockMatrix.checkTSpin(shape)){
        score += (currentLines + 1) * 400;
    } else if(currentLines < 4 && currentLines > 0){
        score += (currentLines - 1) * 200 + 100;
    } else if(currentLines == 4) {
        score += 800;
    }
    shape.draw();
    blockMatrix.draw();
    currentFrame++;
    document.getElementById("score").innerHTML = score;
    document.getElementById("level").innerHTML = level;
    document.getElementById("lines").innerHTML = totalLines;
    //draw elements
}

function keyPressed(){
    if(keyCode === LEFT_ARROW && !shape.dead) shape.moveLeft();
    if(keyCode === RIGHT_ARROW && !shape.dead) shape.moveRight();
    if(keyCode === UP_ARROW && !shape.dead) shape.rotateShape(-1);
    if(keyCode === 90 && !shape.dead) shape.rotateShape(1);
    if(keyCode === 32) score += shape.hardDrop();
} //keybinds

