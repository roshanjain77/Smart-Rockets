var population;

function setup() {
    createCanvas(400, 400);
    population = new Population();
}

function draw() {
    background(0);
    population.run();
}

