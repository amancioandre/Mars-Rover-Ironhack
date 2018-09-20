class Rock {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.r = random(5,30);
        this.vertices = floor(random(5,15));
        this.offset = Array.from({length: this.vertices}, () => random(-5,5))
    }

    render(){
        push();
        stroke(255, 176, 0);
        fill(0);
        translate(this.pos.x, this.pos.y);
        beginShape();
        for(let i=0;i<this.vertices;i++){
            let angle = map(i, 0, this.vertices, 0, TWO_PI);
            let r = this.r + this.offset[i];
            let x = r*cos(angle);
            let y = r*sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }
}

class SmallRock { 
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.size = random(1,4);
    }

    render(){
        push();
        stroke(255, 176, 0);
        strokeWeight(this.size);        
        point(this.pos.x, this.pos.y);
        noFill();
        pop();
    }
}