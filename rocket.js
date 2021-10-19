class Rocket {

    constructor() {
        this.pos = createVector(width/2, height);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        push();

        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        fill(255, 150);
        rectMode(CENTER);
        rect(0, 0, 20, 7);

        pop();
    }

}