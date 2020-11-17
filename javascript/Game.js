let shape, blockMatrix;
let shapeIDs = ['i', 'o', 'l', 'j', 't', 'z', 's'];

function setup(){
    var canvas = createCanvas(10 * 20, 24 * 20);
    canvas.parent("grid");
    background(100);
    blockMatrix = new BlockMatrix();
    shape = new Shape('o', blockMatrix);
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
        shape = new Shape('i', blockMatrix);
    }
}