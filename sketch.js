var a1, a2;
var t;
var maxAge;
var ageP;

var timeToComplete;
var timeToCompleteMsg;
var lastComplete = 0;

var particleN;
var particleAge = 0;

var obsDict = []

var mx, my;
var offsetX, offsetY;
var obstacleOffsetX, obstacleOffsetY;

var mDragged = false;
var tDragged = false;
var rollover = false;


var gen = 1;
var mutrate = 0.008;


function setup() {
    
    createCanvas(750,400);

    t = createVector(width-100, height/2);
    tw = 26;

    spawnHTMLContent();
    respawn();
    
    a1.mousePressed(respawn)
    a2.mousePressed(respawn)
    
}

function spawnSliders() {
    
    particleSlider = createSlider(0, 1000, 200, 10);
    particleSlider.position(250, 482);

    ageSlider = createSlider(0, 1000, 300, 1);
    ageSlider.position(250, 514);    
    
    mutSlider = createSlider(0, 0.1, 0.011, 0.0001);
    mutSlider.position(250, 550);
    
}

function spawnHTMLContent() {
    
    particleP = createP();
    ageP = createP();
    mutP = createP();
    generationP = createP();
    timeToCompleteP = createP();
    
    spawnSliders();
    addApply();
    
}

function addApply() {
    
    a1 = createButton("Apply")
    a1.position(400, 482)

    a2 = createButton("Apply")
    a2.position(400, 515)
    
}

function respawn() {
    
    particleAge = 0;
    gen = 1;
    
    maxAge = ageSlider.value();
    particleN = particleSlider.value();
    
    timeToComplete = maxAge;
    
    particle = new InitializeParticle();
    ob = new Obstacle();
    
}


function draw() {
    
    maxAge = ageSlider.value();
    mutrate = mutSlider.value();
    
    background(144)
    
    if (mDragged) {
        push()
            strokeWeight(2)
            fill(255)
            rect(mx, my, mouseX-mx, mouseY-my)
        pop()
	}
    
    if (tDragged) {
        t.x = mouseX + offsetX;
        t.y = mouseY + offsetY;
        ellipse(t.x, t.y, tw);
    }
      
    if (mouseX > (t.x - tw/2) && mouseX < (t.x + tw/2) && mouseY > (t.y - tw/2) && mouseY < (t.y + tw/2)) {
        rollover = true;
    } else {
        rollover = false;
    }
    
    push()
        if (rollover) {
            fill(255)
        } else {
            fill(76, 114, 99)
        }
        strokeWeight(2)
        ellipse(t.x, t.y, tw)
    pop()
    
    particle.run();
    ob.refresh();
    
    if (timeToComplete== maxAge) {
        timeToCompleteMsg = "Not completed yet"
    } else {
        timeToCompleteMsg = timeToComplete;
    }
    
    particleP.html("Particles: " + particleN + " / " + particleSlider.value())
    ageP.html("Age: " + particleAge + " / " + maxAge)
    mutP.html("Chance of DNA mutation: " + ((mutrate/1)*100).toFixed(1) + "%")
    generationP.html("Generation: " + gen )
    timeToCompleteP.html("Fastest time to complete: " + timeToCompleteMsg)
    
    particleAge++
    
    if (particleAge == maxAge) {
        if (lastComplete > 10) {
            mutrate *= 2;
            lastComplete = 0;
        } 
        
        particle.analyze();
        particle.selection();
        
        particleAge = 0;
        completedCount = 0;
        
        lastComplete++;
        gen++;
    }
    
}

function mousePressed() {
  if (mouseX > (t.x - tw/2) && mouseX < (t.x + tw/2) && mouseY > (t.y - tw/2) && mouseY < (t.y + tw/2)) {
      tDragged = true;
      offsetX = t.x-mouseX;
      offsetY = t.y-mouseY;
  } else {
    mDragged = true;
    mx = mouseX;
    my = mouseY;
  }
    
}

 function mouseReleased() {
  if (tDragged) {
      tDragged = false;
  } else {
      obstacleOffsetX = mouseX;
      obstacleOffsetY = mouseY;
      mDragged = false;
      noFill()
      obsDict.push([mx,my,obstacleOffsetX, obstacleOffsetY])
  }
     
}