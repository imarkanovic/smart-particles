function Obstacle() {
    
    this.refresh = function() {
        for (var i = 0; i < obsDict.length; i++) {
        push()
            strokeWeight(2)
            fill(255)
            rect(obsDict[i][0], obsDict[i][1], (obsDict[i][2]-obsDict[i][0]), (obsDict[i][3]-obsDict[i][1]))
        pop()
        }
    }
    
}