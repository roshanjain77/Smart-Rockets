var population;
let lifespan = 200;
let lifeP, target;
let cnt = 0;
let obstacles = [];
let tmpobstacle = [-1, -1, -1, -1];
let startingPoint;

let playerRocket;
let restartButton, lifespanE, speedS;

function setup() {
    createCanvas(400, 400);
    startingPoint = createVector(width/2, height);
    population = new Population();
    lifeP = createP();
    speedS = createSlider(1, 180, 60);
    target = new Target(10, 10);
    restartButton = createButton("Restart");
    restartButton.mousePressed(()=>{
        population = new Population();
        lifespan = int(lifespanE.value());
        cnt = 0;
    });

    lifespanE = createInput("200");
    playerRocket = new Rocket();
}

function draw() {
    background(0);

    speed = speedS.value();
    for(let i=0;i<speed;i++) {
        population.run();
        cnt ++;

        if(cnt >= lifespan) {
            population.evaluate();
            population.selection();
            cnt = 0;
            break;
        }
    }

    lifeP.html(`Time: ${cnt}`);
    showObstacles();
    target.show();
    population.show();
    // playerRocket.show(color = [100, 200, 0]);
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
    fill(200, 0, 0);
    for(let obstacle of obstacles) {
        rect(...obstacle);
    }
}

function keyIsDow() {
    if(keyCode == LEFT_ARROW) {
        playerRocket.applyForce(createVector(0.1, 0));
        playerRocket.update();
    } else if (keyCode == RIGHT_ARROW) {
        game.snake.go('right');
    } else if (keyCode == UP_ARROW) {
        game.snake.go('up');
    } else if (keyCode == DOWN_ARROW) {
        game.snake.go('down');
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
        fill(255);
        ellipse(this.x, this.y, 16, 16);
    }

    copy() {
        return createVector(this.x, this.y);
    }
}