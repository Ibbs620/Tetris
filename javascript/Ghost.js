class Ghost extends Shape{
    constructor(shape){
        super(shapeID);
        this.shape = shape;
    }

    drawGhost(){
        while(shape.canMoveDown()) shape.moveDown();
        shape.draw();
    }
}