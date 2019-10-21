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



function setup() {
  createCanvas(windowWidth, windowHeight);
  snake_head = loadImage('./assests_images/snake_head.png')
  snake_body = loadImage('./assests_images/snake_body.png')
  eye = loadImage('./assests_images/eye.png')
  pumpkin = loadImage('./assests_images/pumpkin.png')
  //background(0, 50); ---> to drawing with line's traces
  //voice interaction
  mic = new p5.AudioIn();
}

function draw() {
  background(0, 50);

  var r =100
  var w = width/2;
  var k = height/2;
  //ellipse changing color
  if(dist(w,k,mouseX,mouseY)< r) {
   //fill(255,0,0);
   image(pumpkin, w, k, r*6)
   //text
   var myText = "Waiting 4 Halloweeeeeeen"
      textFont("VT323");
      textSize(50);
      noStroke()
      fill("DarkOrange")
      //fill("red")
      drawingContext.font = "220, VT323";
      drawingContext.textAlign = "center";
      text(myText, width / 2, height / 1.3);
 } else {
  image(pumpkin, width/2, height/2, 50, 40)
 }



  //grid of eyeballs
  for (var r = 65; r < windowWidth; r += 65) {
    for (var q = 65; q < windowHeight; q += 65) {
      var distance = dist(r, q, mouseX, mouseY);

      //the smallest is 0, the bigger is 25
      var remap = map(distance, 0, 600, 0, 25);

      if (mouseIsPressed) {
        image(eye, r, q, remap, remap)
      }

    }
  }

  //square
  //square(width/2, height/2, 500, 500, 30, 30);

  dragSegment(0, mouseX, mouseY);
  for (let i = 0; i < y.length - 1; i++) {
    dragSegment(i + 1, x[i], y[i]);
    stroke("Teal");
    strokeWeight(10);
  }
  // This is not necessary to be written:
  // for (let i = 0; i < x.length - 1; i++) {
  //   dragSegment(i + 1, x[i], y[i]);
  // }



}

//snakeee
function dragSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx); //atan = arc tangent of a value

  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;

  segment(x[i], y[i], angle);

  image(snake_head, mouseX, mouseY, 60, 50) //snake's head
  imageMode(CENTER)
  cursor(CROSS);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0); //snake belly
  image(snake_body, 0, 0, 50, 50)
  pop();
}
