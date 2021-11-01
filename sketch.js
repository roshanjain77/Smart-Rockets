var population;
let lifespan = 200;
let lifeP, target;
let cnt = 0;
obstracles = []

function setup() {
    createCanvas(400, 400);
    population = new Population();
    lifeP = createP();
    target = new Target(10, 10);
}

function draw() {
    background(0);
    population.run();
    lifeP.html(`Time: ${cnt}`);
    cnt ++;

    if(cnt == lifespan) {
        population.evaluate();
        population.selection();
        cnt = 0;
    } 

    target.show();
}

function mousePressed() {
    if(target.contains(mouseX, mouseY)) {
        console.log("ohh nooo!!");
        target.picked = true;
    }
}

function mouseDragged() {
    target = new Target(mouseX, mouseY);
}

function mouseReleased() {
    target = new Target(mouseX, mouseY);
}

class Target {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.picked = false;
    }

    contains(pointA, pointB) {
        return dist(this.x, this.y, pointA, pointB) < 16;
    }

    show() {
        ellipse(this.x, this.y, 16, 16);
    }

    copy() {
        return createVector(this.x, this.y);
    }
}