class Block{
    constructor (x, y, color){
        this.x = x;
        this.y = y;
        this.dead = false;
        this.color = color;
        this.ghost = false;
    }

    moveDown(){ //move block down if area under is unoccupied
        if(this.canMoveDown())this.y++;
    }

    moveRight(){//move block right if area to the right is unoccupied
        if(this.canMoveRight()) this.x++;
    }

    moveLeft(){//move block left if area to the left is unoccupied
        if(this.canMoveLeft()) this.x--;
    }

    canMoveDown(){ //check if space under is unoccupied
        return this.y != 23;
    }

    canMoveLeft(){ //check if space to the left is unoccupied
        return this.x != 0;
    }

    canMoveRight(){//check if space to the right is unoccupied
        return this.x != 9;
    }
 
    draw(){ //draw block
        if(this.ghost){   
            stroke(this.color);
            noFill();
        } else {
            noStroke();
            fill(this.color);
        }
        rect(this.x * 20, this.y * 20, 20, 20);
    }
}