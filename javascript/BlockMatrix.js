class BlockMatrix {
    constructor() {
        this.deadBlocks = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]];
        this.deadBlocksColor = [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','','']];
    }

    add(shape){ //add dead shape to dead block matrix
        this.deadBlocks[shape.block1.y][shape.block1.x] = 1;
        this.deadBlocksColor[shape.block1.y][shape.block1.x] = shape.color;
        this.deadBlocks[shape.block2.y][shape.block2.x] = 1;
        this.deadBlocksColor[shape.block2.y][shape.block2.x] = shape.color;
        this.deadBlocks[shape.block3.y][shape.block3.x] = 1;
        this.deadBlocksColor[shape.block3.y][shape.block3.x] = shape.color;
        this.deadBlocks[shape.block4.y][shape.block4.x] = 1;
        this.deadBlocksColor[shape.block4.y][shape.block4.x] = shape.color;
    }

    resetGhost(){
        for(var i = 0; i < 24; i++){
            for(var j = 0; j < 10; j++){
                if(this.deadBlocks[i][j] == 2) this.deadBlocks[i][j] = 0;
            }
        }
    }

    clearLines(){ //clear completed lines and copy above blocks down
        let linesCleared = 0;
        for(var i = 23; i >= 0; i--){
            let blocks = 0;
            for(var j = 0; j < 10; j++){
                if(this.deadBlocks[i][j] == 1){
                    blocks++;
                } else {
                    break;
                }
            }
            if(blocks == 10){
                linesCleared++;
                this.copyDown(i);
            } else if (blocks == 0){
                break;
            }
        }
        return linesCleared;
    }

    copyDown(y){ //copy blocks above y down
        for(var i = y; i >= 1; i--){
            for(var j = 0; j < 10; j++){
                this.deadBlocks[i][j] = this.deadBlocks[i-1][j];
                this.deadBlocksColor[i][j] = this.deadBlocksColor[i-1][j];
            }
        }
    }

    draw(){ //draw dead blocks
        for(var i = 0; i < 24; i++){
            for(var j = 0; j < 10; j++){
                if(this.deadBlocks[i][j] == 1){
                    noStroke();
                    fill(this.deadBlocksColor[i][j]);
                    rect(j * 20, i * 20, 20, 20);
                } else if (this.deadBlocks[i][j] == 2){
                    stroke(this.deadBlocksColor[i][j]);
                    noFill();
                    rect(j * 20, i * 20, 20, 20);

                }
            }
        }
    }
}