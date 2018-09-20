class Sample {
    constructor() {
        this.pos = createVector(random(width), random(height));
    }

    render(){
        push();
        stroke(random(64, 84), random(134,200), random(180,247));
        strokeWeight(random(0,2));
        point(this.pos.x, this.pos.y);
        pop();
    }
}