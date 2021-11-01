var population;
let lifespan = 200;
let lifeP, target;
let cnt = 0;
let obstacles = []
let tmpobstacle = [-1, -1, -1, -1];

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

    showObstacles();
    target.show();
}

function mousePressed() {
    if(target.contains(mouseX, mouseY)) {
        target.picked = true;
    } else {
        tmpobstacle[0] = mouseX;
        tmpobstacle[1] = mouseY;
    }
}

function mouseDragged() {
    if(target.picked) {
        target.x = mouseX;
        target.y = mouseY;
    }
}

function mouseReleased() {
    if(target.picked) {
        target = new Target(mouseX, mouseY);
    } else {
        tmpobstacle[2] = mouseX - tmpobstacle[0];
        tmpobstacle[3] = mouseY - tmpobstacle[1];

        obstacles.push([...tmpobstacle])
    }
}

function showObstacles() {
    for(let obstacle of obstacles) {
        rect(...obstacle);
    }
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