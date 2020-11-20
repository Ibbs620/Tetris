class Block{
    constructor (x, y, color){
        this.x = x;
        this.y = y;
        this.dead = false;
        this.color = color;
    }

    moveDown(){
        if(this.canMoveDown())this.y++;
    }

    moveRight(){
        if(this.canMoveRight()) this.x++;
    }

    moveLeft(){
        if(this.canMoveLeft()) this.x--;
    }

    canMoveDown(){
        return this.y != 23;
    }

    canMoveLeft(){
        return this.x != 0;
    }

    canMoveRight(){
        return this.x != 9;
    }

    draw(){
        noStroke();
        fill(this.color);
        rect(this.x * 20, this.y * 20, 20, 20);
    }
}