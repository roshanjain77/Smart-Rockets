class Rocket {

    constructor(dna) {
        this.pos = startingPoint.copy();
        this.vel = createVector();
        this.acc = createVector();
        this.time = lifespan;
        this.completed = false;
        this.obstaclestuck = false;
        this.wallstuck = false;
        if(dna) this.dna = dna;
        else this.dna = new DNA();
        this.fitness = 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if(d < 30) {
            this.completed = true;
            this.time = cnt;
            this.pos = target.copy();
        }

        for(let obstacle of obstacles) {
            if(this.pos.x > obstacle[0] && this.pos.x < obstacle[0] + obstacle[2] && this.pos.y > obstacle[1] && this.pos.y < obstacle[1] + obstacle[3]) {
                this.obstaclestuck = true;
                break;
            }
        }

        if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.wallstuck = true;
        }

        this.applyForce(this.dna.genes[cnt]);

        if(!this.completed && !this.obstaclestuck && !this.wallstuck) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        } 
    }

    calcFitness() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        let d2 = dist(this.pos.x, this.pos.y, startingPoint.x, startingPoint.y);

        let reward = 0;
        if(this.completed) reward = 1000;

        this.fitness = map(d, 0, 800, 800, 0) + 1 / (d+0.01) + (lifespan - this.time)**3 + d2 + reward;

        if(this.obstaclestuck) {
            this.fitness /= 10;
        }
        if(this.wallstuck) {
            this.fitness /= map(d, 0, 800, 1.01, 10);
        }
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