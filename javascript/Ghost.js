class Ghost{
    constructor(shape){
        this.shape = shape;
    }

    drawGhost(){
        while(shape.canMoveDown()) shape.moveDown();
        shape.draw();
    }
}