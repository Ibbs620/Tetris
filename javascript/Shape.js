class Shape{
    constructor(shapeID, blockMatrix){
        this.shapeID = shapeID;
        this.blockMatrix = blockMatrix;
        this.dead = false;
        switch(this.shapeID){
            case('i'):
                this.color = 'cyan'
                this.block1 = new Block(3, 1, this.color);
                this.block2 = new Block(4, 1, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(6, 1, this.color);
                break;
            case('o'):
                this.color = 'yellow'
                this.block1 = new Block(5, 0, this.color);
                this.block2 = new Block(4, 0, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(4, 1, this.color);
                break;
            case('t'):
                this.color = 'purple'
                this.block1 = new Block(3, 1, this.color);
                this.block2 = new Block(4, 1, this.color);
                this.block3 = new Block(5, 1, this.color);
                this.block4 = new Block(4, 0, this.color);
                break;
            case('s'):
                this.color = 'lime'
                this.block1 = new Block(3, 1, this.color);
                this.block2 = new Block(4, 1, this.color);
                this.block3 = new Block(5, 0, this.color);
                this.block4 = new Block(4, 0, this.color);
                break;
            case('z'):
                this.color = 'red'
                this.block1 = new Block(5, 1, this.color);
                this.block2 = new Block(4, 1, this.color);
                this.block3 = new Block(4, 0, this.color);
                this.block4 = new Block(3, 0, this.color);
                break;
            case('j'):
                this.color = 'orange'
                this.block1 = new Block(3, 0, this.color);
                this.block2 = new Block(3, 1, this.color);
                this.block3 = new Block(4, 1, this.color);
                this.block4 = new Block(5, 1, this.color);
                break;
            case('l'):
                this.color = 'blue'
                this.block1 = new Block(5, 0, this.color);
                this.block2 = new Block(3, 1, this.color);
                this.block3 = new Block(4, 1, this.color);
                this.block4 = new Block(5, 1, this.color);
                break;
        }
    }

    moveDown(){
        if(this.canMoveDown()){
            this.block1.moveDown();
            this.block2.moveDown();
            this.block3.moveDown();
            this.block4.moveDown();
        } else {
            this.dead = true;
        }
    }

    moveLeft(){
        if(this.canMoveLeft()){
            this.block1.moveLeft();
            this.block2.moveLeft();
            this.block3.moveLeft();
            this.block4.moveLeft();
        }
    }

    moveRight(){
        if(this.canMoveRight()){
            this.block1.moveRight();
            this.block2.moveRight();
            this.block3.moveRight();
            this.block4.moveRight();
        }
    }

    canMoveDown(){
        return this.block1.canMoveDown() 
        && this.block2.canMoveDown() 
        && this.block3.canMoveDown() 
        && this.block4.canMoveDown()
        && this.blockMatrix.deadBlocks[this.block1.y + 1][this.block1.x] == 0
        && this.blockMatrix.deadBlocks[this.block2.y + 1][this.block2.x] == 0
        && this.blockMatrix.deadBlocks[this.block3.y + 1][this.block3.x] == 0
        && this.blockMatrix.deadBlocks[this.block4.y + 1][this.block4.x] == 0;
    }

    canMoveRight(){
        return this.block1.canMoveRight() 
        && this.block2.canMoveRight() 
        && this.block3.canMoveRight()  
        && this.block4.canMoveRight() 
        && this.blockMatrix.deadBlocks[this.block1.y][this.block1.x + 1] == 0
        && this.blockMatrix.deadBlocks[this.block2.y][this.block2.x + 1] == 0
        && this.blockMatrix.deadBlocks[this.block3.y][this.block3.x + 1] == 0
        && this.blockMatrix.deadBlocks[this.block4.y][this.block4.x + 1] == 0;
    }

    canMoveLeft(){
        return this.block1.canMoveLeft() 
        && this.block2.canMoveLeft() 
        && this.block3.canMoveLeft()  
        && this.block4.canMoveLeft() 
        && this.blockMatrix.deadBlocks[this.block1.y][this.block1.x - 1] == 0
        && this.blockMatrix.deadBlocks[this.block2.y][this.block2.x - 1] == 0
        && this.blockMatrix.deadBlocks[this.block3.y][this.block3.x - 1] == 0
        && this.blockMatrix.deadBlocks[this.block4.y][this.block4.x - 1] == 0;
    }

    draw(){
        this.block1.draw();
        this.block2.draw();
        this.block3.draw();
        this.block4.draw();
    }
}