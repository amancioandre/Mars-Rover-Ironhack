//APP GOES HERE
let width = 1200;
let height = 900;
let rocks = [];
let rovers =[];
let smallRocks = [];
let samples = [];

//GRID
function setup(){
  let canvas = createCanvas(width, height);
  canvas.parent('sketch-holder');
  // canvas.style('display','block');
  rovers.push(new Rover);
  for(let i=0; i<40; i++){
    rocks.push(new Rock);
  }
  for(let j=0; j<200; j++){
    smallRocks.push(new SmallRock);
  }
  for(let w=0; w<14; w++){
    samples.push(new Sample);
  }
  //DOM MANIPULATION
  let dir = document.querySelector("#dir")
  let cpos = document.querySelector("#cpos")
  let lpos = document.querySelector("#lpos")
  let message = document.querySelector("#message")

  document.querySelector('button').addEventListener('click',() => {
    let str = document.querySelector("#command input").value;
    rovers[0].autoPilot(str);
  })
    
}

function keyPressed(){
  if(keyCode == RIGHT_ARROW){
    rovers[0].turnRight();
  } else if(keyCode == LEFT_ARROW){
    rovers[0].turnLeft();
  } else if(keyCode == UP_ARROW){
    rovers[0].moveForward();
  } else if(keyCode == DOWN_ARROW){
    rovers[0].moveBackward();
  }
}

function draw(){
  background(0);
  smallRocks.forEach(smallRock => smallRock.render());
  rocks.forEach(rock => {
    rock.render();
  });
  samples.forEach(sample => sample.render());
  rovers.forEach(rover => rover.render());
  dir.textContent = rovers[0].direction;
  cpos.textContent = 'x: ' + 
                    rovers[0].travelLog.X[rovers[0].travelLog.X.length-1] + " " +
                    'y: ' + 
                    rovers[0].travelLog.Y[rovers[0].travelLog.Y.length-1];

  lpos.textContent = 'x: ' + 
                      rovers[0].travelLog.X[rovers[0].travelLog.X.length-2] + " " +
                      'y: ' + 
                      rovers[0].travelLog.Y[rovers[0].travelLog.Y.length-2];
  message.textContent = rovers[0].message;
}

