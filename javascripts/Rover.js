//ROVER
class Rover {
  constructor(direction='N', X=[width/2], Y=[height/2]) {
    this.direction = direction,
    this.travelLog = {
      X: X,
      Y: Y,
    }
    this.box = 10;
    this.wheelSize = 3;
    this.message = 'Rover Landed!!';
    this.heading = 0;
    this.speed = 5;
  }

  render(){
    let x = this.travelLog.X.slice().pop();
    let y = this.travelLog.Y.slice().pop();
    push();
    translate(x,y)
    rotate(this.heading);
    //body
    fill(0);
    stroke(51, 255, 51);
    rect(-5,-5,this.box,this.box*1.5,1,1);
    //wheels
    rect(this.box*0.7,this.box*-1,this.wheelSize,this.wheelSize*1.2,1);
    rect(this.box*0.7,this.box*0.2,this.wheelSize,this.wheelSize*1.2,1);
    rect(this.box*0.7,this.box*+1,this.wheelSize,this.wheelSize*1.2,1);
    rect(this.box*-1,this.box*-1,this.wheelSize,this.wheelSize*1.2,1);
    rect(this.box*-1,this.box*0.2,this.wheelSize,this.wheelSize*1.2,1);
    rect(this.box*-1,this.box*+1,this.wheelSize,this.wheelSize*1.2,1);
    //periscope
    rect(-7,-8,8,5,1,1,2);
    pop();
  }

  moveForward(){
    let x = this.travelLog.X.slice().pop();
    let y = this.travelLog.Y.slice().pop();

    if(this.hits()){
      this.message = `You hit a rock. Rover is disabled, sending another Rover in 3 seconds.`
      return setTimeout(() => {
        window.location.reload();
      }, 3000)
    }

    switch(this.direction){
      case 'N': if(this.validDirectionF()){
        x = x; y = y-this.speed; this.message = (`Moving North to ${x},${y}`)}; break;
      case 'E': if(this.validDirectionF()){
        x = x+this.speed; y = y; this.message = (`Moving East to ${x},${y}`)}; break;
      case 'S': if(this.validDirectionF()){
        x = x; y = y+this.speed; this.message = (`Moving South to ${x},${y}`)}; break;
      case 'W': if(this.validDirectionF()){
        x = x-this.speed; y = y; this.message = (`Moving West to ${x},${y}`)}; break;
      default: this.message = ("not a valid direction")
    }
    this.travelLog.X.push(x);
    this.travelLog.Y.push(y);
  }

  moveBackward(){
    let x = this.travelLog.X.slice().pop();
    let y = this.travelLog.Y.slice().pop();

    if(this.hits()){
      this.message = ("You've hit a rock, rover is disabled. Sending another Rover in 3 seconds... just bcz...")
      return setTimeout(() => {
        window.location.reload();
      }, 3000)
    }

    switch(this.direction){
      case 'N': if(this.validDirectionB()){
        x = x; y = y+this.speed; this.message = (`Moving South to ${x},${y}`)}; break;
      case 'E': if(this.validDirectionB()){
        x = x-this.speed; y = y; this.message = (`Moving West to ${x},${y}`)}; break;
      case 'S': if(this.validDirectionB()){
        x = x; y = y-this.speed; this.message = (`Moving North to ${x},${y}`)}; break;
      case 'W': if(this.validDirectionB()){
        x = x+this.speed; y = y; this.message = (`Moving East to ${x},${y}`)}; break;
      default: this.message = ("not a valid direction")
    }
    this.travelLog.X.push(x);
    this.travelLog.Y.push(y);
}

  turnRight() {
    let compass = ['N','E','S','W'];
    let i = compass.findIndex(val => val === this.direction)
    
    if(i !== 3){
      this.direction = compass[i+1];
    } else {
      this.direction = compass[0];
    }
    this.heading += PI/2;
     return this.message = (`Turned right to ${this.direction}`);
  }

  turnLeft() {
    let compass = ['N','E','S','W'];
    let i = compass.findIndex(val => val === this.direction)
    
    if(i !== 0){
      this.direction = compass[i-1];
    } else {
      this.direction = compass[3];
    }
    this.heading -= PI/2;
     return this.message = (`Turned left to ${this.direction}`);
  }

  autoPilot(str){
    str.toLowerCase().split('').forEach((el,i) => {
      setTimeout(() => {
        switch(el){
          case 'f': this.moveForward(); break;
          case 'b': this.moveBackward(); break;
          case 'r': this.turnRight(); break;
          case 'l': this.turnLeft(); break;
          default: this.message = (`${el} is not a valid move. Input must be 'F, B, L, R'.`)
        }
      }, i*300);
    });
    return this.message = (`${this.travelLog.X}, ${this.travelLog.Y}.`);
  }

  hits(){
    let x = this.travelLog.X.slice().pop();
    let y = this.travelLog.Y.slice().pop();
    for(let i=rocks.length-1; i>0; i--){
      let d = dist(x, y, rocks[i].pos.x, rocks[i].pos.y)
      if(d < this.box + rocks[i].r){
        return true;
      }
    }
    return false;
    }

  validDirectionF(){
    let x = this.travelLog.X.slice().pop();
    let y = this.travelLog.Y.slice().pop();
    if(this.direction === 'N' && y < 0+this.box*1.2){
      this.message = "Watch out, edge ahed!"
      return false
    } else if(this.direction === 'S' && y > height+this.box*1.2){
      this.message = "Watch out, edge ahed!"
      return false
    } else if(this.direction === 'W' && x < 0+this.box*1.2){
      this.message = "Watch out, edge ahed!"
      return false
    } else if(this.direction === 'E' && x > width+this.box*1.2){
      this.message = "Watch out, edge ahed!"
      return false
    } else {
      return true
    }
  }
  validDirectionB(){
    let x = this.travelLog.X.slice().pop();
    let y = this.travelLog.Y.slice().pop();
    if((this.direction === 'N' && y > height+this.box*1.2) || (this.direction === 'S' && y > height)){
      this.message = "Watch out, edge ahed!"
      return false
    } else if(this.direction === 'S' && y < 0+this.box*1.2){
      this.message = "Watch out, edge ahed!"
      return false
    } else if(this.direction === 'W' && x > width+this.box*1.2){
      this.message = "Watch out, edge ahed!"
      return false
    } else if(this.direction === 'E' && x < 0+this.box*1.2){
      this.message = "Watch out, edge ahed!"
      return false
    } else {
      return true
    }
  }
}

