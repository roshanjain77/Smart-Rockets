var population;
let lifespan = 200;
let lifeP, target;
let cnt = 0;
obstracles = []

function setup() {
    createCanvas(400, 400);
    population = new Population();
    lifeP = createP();
    target = createVector(10, 10);
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

    ellipse(target.x, target.y, 16, 16);
}
