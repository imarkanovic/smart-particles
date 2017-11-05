function DNA(child) {
    
    if (child) {
        this.genes = child;
    } else {
        this.genes = [];
        for (var i = 0; i < maxAge; i++) {
            this.v = p5.Vector.random2D()
            this.genes[i] = this.v.setMag(0.7)
        }
    }
    
    this.crossover = function(parent) {
        var child = [];
        var midpoint = random(this.genes.length);
        
        for (var i = 0; i < this.genes.length; i++) {
            if (i < midpoint) {
                child[i] = this.genes[i];
            } else {
                child[i] = parent.genes[i];
            }
        }
        return new DNA(child)
        
    }
    
    this.mutate = function() {
        for (var i = 0; i < this.genes.length; i++)
            if (random(1) <  mutrate ) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.7);          
        }
    }
    
}