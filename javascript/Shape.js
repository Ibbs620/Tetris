class Shape{
    constructor(shapeID, blockMatrix){
        this.shapeID = shapeID;
        this.blockMatrix = blockMatrix;
        this.dead = false;
        switch(this.shapeID){ //initialize blocks and pivot points for rotation
            case('i'):
                this.color = 'cyan'
                this.block1 = new Block(3, 1, this.color);
                this.block2 = new Block(4, 1, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(6, 1, this.color);
                this.pivot = {x: 4.5, y: 1.5};
                break;
            case('o'):
                this.color = 'yellow'
                this.block1 = new Block(4, 1, this.color);
                this.block2 = new Block(4, 0, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(5, 0, this.color);
                this.pivot = {x: 4.5, y: 0.5};
                break;
            case('t'):
                this.color = 'purple'
                this.block1 = new Block(3, 1, this.color);
                this.block2 = new Block(4, 0, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(4, 1, this.color);
                this.pivot = {x: 4, y: 1};
                break;
            case('s'):
                this.color = 'lime'
                this.block1 = new Block(3, 1, this.color);
                this.block2 = new Block(4, 0, this.color);
                this.block3 = new Block(5, 0, this.color);
                this.block4 = new Block(4, 1, this.color);
                this.pivot = {x: 4, y: 1};
                break;
            case('z'):
                this.color = 'red'
                this.block1 = new Block(5, 1, this.color);
                this.block2 = new Block(3, 0, this.color);
                this.block3 = new Block(4, 0, this.color);
                this.block4 = new Block(4, 1, this.color);
                this.pivot = {x: 4, y: 1};
                break;
            case('j'):
                this.color = 'orange'
                this.block1 = new Block(3, 0, this.color);
                this.block2 = new Block(3, 1, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(4, 1, this.color);
                this.pivot = {x: 4, y: 1};
                break;
            case('l'):
                this.color = 'blue'
                this.block1 = new Block(5, 0, this.color);
                this.block2 = new Block(3, 1, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(4, 1, this.color);
                this.pivot = {x: 4, y: 1};
                break;
        }
    }

    moveDown(){ //move shape down if area under it is unoccupied
        if(this.canMoveDown()){
            this.block1.moveDown();
            this.block2.moveDown();
            this.block3.moveDown();
            this.block4.moveDown();
            this.pivot.y++;
        } else {
            this.dead = true;
        }
    }

    moveLeft(){ //move shape left is area beside it is unoccupied
        if(this.canMoveLeft()){
            this.block1.moveLeft();
            this.block2.moveLeft();
            this.block3.moveLeft();
            this.block4.moveLeft();
            this.pivot.x--;
        }
    }

    moveRight(){ //move shape right if area beside it is unoccupied
        if(this.canMoveRight()){
            this.block1.moveRight();
            this.block2.moveRight();
            this.block3.moveRight();
            this.block4.moveRight();
            this.pivot.x++;
        }
    }

    hardDrop(){ //Drop the shape straight down
        let score = 0;
        while(this.canMoveDown()) {
            this.moveDown();
            score += 2;
        }
        this.dead = true;
        return score;
    }
    
    canMoveDown(){ //check for blocks underneath shape
        return this.block1.canMoveDown() 
        && this.block2.canMoveDown() 
        && this.block3.canMoveDown() 
        && this.block4.canMoveDown()
        && this.blockMatrix.deadBlocks[this.block1.y + 1][this.block1.x] == 0
        && this.blockMatrix.deadBlocks[this.block2.y + 1][this.block2.x] == 0
        && this.blockMatrix.deadBlocks[this.block3.y + 1][this.block3.x] == 0
        && this.blockMatrix.deadBlocks[this.block4.y + 1][this.block4.x] == 0;
    }

    canMoveRight(){ //check for blocks to the right of shape
        return this.block1.canMoveRight() 
        && this.block2.canMoveRight() 
        && this.block3.canMoveRight()  
        && this.block4.canMoveRight() 
        && this.blockMatrix.deadBlocks[this.block1.y][this.block1.x + 1] == 0
        && this.blockMatrix.deadBlocks[this.block2.y][this.block2.x + 1] == 0
        && this.blockMatrix.deadBlocks[this.block3.y][this.block3.x + 1] == 0
        && this.blockMatrix.deadBlocks[this.block4.y][this.block4.x + 1] == 0;
    }

    canMoveLeft(){ //check for blocks to the left of shape
        return this.block1.canMoveLeft() 
        && this.block2.canMoveLeft() 
        && this.block3.canMoveLeft()  
        && this.block4.canMoveLeft() 
        && this.blockMatrix.deadBlocks[this.block1.y][this.block1.x - 1] == 0
        && this.blockMatrix.deadBlocks[this.block2.y][this.block2.x - 1] == 0
        && this.blockMatrix.deadBlocks[this.block3.y][this.block3.x - 1] == 0
        && this.blockMatrix.deadBlocks[this.block4.y][this.block4.x - 1] == 0;
    }

    rotateShape(direction){ //rotate shape after checking if can rotate
        let rotatedShape = this.createRotatedShape(direction);
        if(!this.checkShapeOverlap(rotatedShape)) {
            this.block1 = rotatedShape.block1;
            this.block2 = rotatedShape.block2;
            this.block3 = rotatedShape.block3;
            this.block4 = rotatedShape.block4;
        }
    }
 
    createRotatedShape(direction){ //clone the shape and rotate it
        let rotatedShape = new Shape(this.shapeID);
        if (this.shapeID == 'o') return; //rotated form of 'o' tetromino is always the same
        rotatedShape.block1.x = (this.block1.y - this.pivot.y) * direction  + this.pivot.x;
        rotatedShape.block1.y = (this.block1.x - this.pivot.x) * -direction  + this.pivot.y;
        rotatedShape.block2.x = (this.block2.y - this.pivot.y) * direction  + this.pivot.x;
        rotatedShape.block2.y = (this.block2.x - this.pivot.x) * -direction  + this.pivot.y;
        rotatedShape.block3.x = (this.block3.y - this.pivot.y) * direction  + this.pivot.x;
        rotatedShape.block3.y = (this.block3.x - this.pivot.x) * -direction  + this.pivot.y;
        rotatedShape.block4.x = (this.block4.y - this.pivot.y) * direction  + this.pivot.x;
        rotatedShape.block4.y = (this.block4.x - this.pivot.x) * -direction  + this.pivot.y;
        return rotatedShape;
    }

    checkShapeOverlap(shape){ // check if shape position collides with dead blocks
        if(shape.block1.x < 0 || shape.block1.x > 9 || shape.block1.y > 23 ||
           shape.block2.x < 0 || shape.block2.x > 9 || shape.block2.y > 23 ||
           shape.block3.x < 0 || shape.block3.x > 9 || shape.block3.y > 23 ||
           shape.block4.x < 0 || shape.block4.x > 9 || shape.block4.y > 23) return true;
        return this.blockMatrix.deadBlocks[shape.block1.y][shape.block1.x] == 1
        || this.blockMatrix.deadBlocks[shape.block2.y][shape.block2.x] == 1
        || this.blockMatrix.deadBlocks[shape.block3.y][shape.block3.x] == 1
        || this.blockMatrix.deadBlocks[shape.block4.y][shape.block4.x] == 1;
    }

    draw(){ //draw shape
        this.block1.draw();
        this.block2.draw();
        this.block3.draw();
        this.block4.draw();
    }
}