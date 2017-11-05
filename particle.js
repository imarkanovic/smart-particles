var obsx;
var obsy;
var obsOffsetX;
var obsOffsetY;

function Particle(dna) {
    
    this.loc = createVector(0, height/2)
    this.vel = createVector();
    this.acc = createVector();
    
    this.width = 10;
    
    this.randColR = random(70,255);
    this.randColB = random(70, 255);
    
    this.completed = false;
    this.crashes = false;
    
    this.tte = 1 / maxAge;
    this.timedone = 1 / maxAge; 
    
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    
    this.fitness = 0;
    
    this.addForce = function() {
        this.acc.add(this.dna.genes[particleAge])
    }
    
    this.getF = function() {
        var d = dist(this.loc.x, this.loc.y, t.x, t.y)
        this.fitness = 1 / d;
        
        if (this.completed) {
            this.fitness *= 10;
        } else if (this.crashes && (d > 50))  {
            this.fitness /= 10;
        } else if (this.crashes && (d < 50))  {
            this.fitness /= 5;
        } 
    }
    
    this.refresh = function() {
        if (dist(this.loc.x, this.loc.y, t.x, t.y) < ((tw/2) + this.width/2)) { 
            this.completed = true;
            lastComplete = 0;
            this.tte = 1 / particleAge;
            if (this.tte > this.timedone) {
                this.timedone = this.tte
            }
        }
        
        if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
                this.crashes = true;
            }
        
        for (var i = 0; i < obsDict.length; i++ ) {
            if (obsDict[i][0] < obsDict[i][2]) {
                obsx = obsDict[i][0]
                obsOffsetX = obsDict[i][2]
            } else {
                obsx = obsDict[i][2]
                obsOffsetX = obsDict[i][0]
            }
            
            if (obsDict[i][1] < obsDict[i][3]) {
                obsy = obsDict[i][1]
                obsOffsetY = obsDict[i][3]
            } else {
                obsy = obsDict[i][3]
                obsOffsetY = obsDict[i][1]
            }
            
            if (this.loc.x >= (obsx-(this.width/2)) && this.loc.x <= (obsx+(obsOffsetX-obsx) + (this.width/2))) {
                if (this.loc.y >= (obsy-(this.width/2)) && this.loc.y <= (obsy+(obsOffsetY-obsy) + (this.width/2))) {
                    this.crashes = true; 
                }
            }   
        }
        
          
        if (!this.completed && !this.crashes) {

            this.addForce()
            this.vel.add(this.acc);
            this.loc.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
            
        }
    }
    
    this.show = function() {
        push()
            translate(this.loc.x, this.loc.y)
            rectMode(CENTER)
            rotate(this.vel.heading());
            strokeWeight(2);
            fill(this.randColR, 0, this.randColB)
            ellipse(0, 0, this.width)
        pop()
    }
}