var population;
let lifespan = 200;
let lifeP, target;
let cnt = 0;

function setup() {
    createCanvas(400, 400);
    population = new Population();
    lifeP = createP();
    target = createVector(width/2, height/2);
}

function draw() {
    background(0);
    population.run();
    lifeP.html(`Time: ${cnt}`);
    cnt ++;

    if(cnt == lifespan) {
        population = new Population();
        cnt = 0;
    }

    ellipse(target.x, target.y, 16, 16);
}

