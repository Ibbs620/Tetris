let shape, blockMatrix;

function setup(){
    var canvas = createCanvas(10 * 20, 24 * 20);
    canvas.parent("grid");
    background(100);
    blockMatrix = new BlockMatrix();
    shape = new Shape('i', blockMatrix);
}

function draw(){
    background(100);
    shape.draw();
    blockMatrix.draw();
}

function mouseClicked(){
    if(!shape.dead){
        shape.moveDown();
    } else {
        blockMatrix.add(shape);
        shape = new Shape('i', bl);
    }
}