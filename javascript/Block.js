class Block{
    constructor (x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }

    moveDown(){
        if(this.canMoveDown())this.y++;
    }

    canMoveDown(){
        return this.y != 23;
    }

    draw(){
        stroke(this.color);
        fill(this.color);
        rect(this.x * 20, this.y * 20, 20, 20);
    }
}