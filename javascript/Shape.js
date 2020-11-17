class Shape{
    constructor(shapeID, deadBlocks){
        this.shapeID = shapeID;
        this.blockMatrix = deadBlocks;
        this.dead = false;
        switch(this.shapeID){
            case('i'):
                this.block1 = new Block(3, 1, 'cyan');
                this.block2 = new Block(4, 1, 'cyan');
                this.block3 = new Block(5, 1, 'cyan');
                this.block4 = new Block(6, 1, 'cyan');
                break;
            case('o'):
                this.block1 = new Block(5, 0, 'yellow');
                this.block2 = new Block(4, 0, 'yellow');
                this.block3 = new Block(5, 1, 'yellow');
                this.block4 = new Block(4, 1, 'yellow');
                break;
            case('t'):
                break;
            case('s'):
                break;
            case('z'):
                break;
            case('j'):
                break;
            case('l'):
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

    draw(){
        this.block1.draw();
        this.block2.draw();
        this.block3.draw();
        this.block4.draw();
    }
}