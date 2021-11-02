class Rocket {

    constructor(dna) {
        this.pos = createVector(width/2, height);
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
        if(d < 10) {
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
        this.fitness = 1 / (d + 0.01) + (lifespan - this.time);

        if(this.obstaclestuck) {
            this.fitness /= 3;
        }
        if(this.wallstuck) {
            this.fitness /= 1.5;
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