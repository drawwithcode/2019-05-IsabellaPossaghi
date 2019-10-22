//bats variables
let bats = [];
var mic;

//variables to create the composition of the snake
let x = [],
  y = [],
  segNum = 40, //numbers of segments
  segLength = 30; //distance between each part

//variables for the snake's segments (body parts)
for (let i = 0; i < segNum; i++) {
  x[i] = 0;
  y[i] = 0;
}



function preload() {
  snake_head = loadImage('./assests_images/snake_head.png')
  snake_body = loadImage('./assests_images/snake_body.png')

  bat_2 = loadImage('./assests_images/bat_2.png')

  pumpkin = loadImage('./assests_images/pumpkin.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
}

function draw() {
  //background(69, 69, 69, 70);
  colorMode(RGB);

  mic.start();
  let b = new Bats();
  bats.push(b);
  for (let z = 0; z < bats.length; z++) {
    bats[z].moving();
    bats[z].show();

  }

  var r = 100
  var w = width / 2;
  var k = height / 2;
  //ellipse changing color
  if (dist(w, k, mouseX, mouseY) < 50) {
    background(255, 69, 10, 70);
    image(pumpkin, w * random(1, 1.01), k * random(1, 1.01), 350, 300);
    //text
    var myText = "Waiting 4 Halloweeeeeeen";
    var myText_2 = "Speak loud!";
    textFont("VT323");
    textSize(50);
    stroke(0);
    fill("orange");
    //fill("red")
    drawingContext.font = "220, VT323";
    drawingContext.textAlign = "center";
    text(myText, width / 2, height / 1.3);
    text(myText_2, width / 2, height / 1.2);
  } else {
    image(pumpkin, width / 2, height / 2, 120, 100);
    background(69, 69, 69, 70);
  }

  dragSegment(0, mouseX, mouseY);
  for (let i = 0; i < y.length - 1; i++) {
    dragSegment(i + 1, x[i], y[i]);
    stroke("Teal");
    strokeWeight(10);
  }

}

class Bats {

  constructor() {
    //spawning point
    this.j = windowWidth / 2;
    this.k = windowHeight / 2;
    //mic sensibility + bats speed
    var speed = mic.getLevel() * 10;
    this.vj = random(-speed, +speed);
    this.vk = random(-speed, +speed);

  }

  moving() {
    this.j += this.vj *10;
    this.k += this.vk *10 ;
  }

  show() {
    image(bat_2, this.j, this.k , 40 * random(1, 2) , 20* random(1, 2));

  }
}

function dragSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx); //atan = arc tangent of a value

  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;

  segment(x[i], y[i], angle);

  image(snake_head, mouseX * random(1, 1.002), mouseY * random(1, 1.002), 60, 50) //snake's head
  imageMode(CENTER)
  cursor(CROSS);
}

function segment(x, y, a) {
  push();
  translate(x * random(1, 1.002), y * random(1, 1.002));
  rotate(a);
  line(0, 0, segLength, 0); //snake belly
  image(snake_body, 0, 0, 50, 50)
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
