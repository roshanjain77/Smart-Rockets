class Population {

    constructor() {
        this.rockets = [];
        this.mattingPool = [];
        this.popsize = 100;

        for(let i=0;i<this.popsize;i++) {
            this.rockets.push(new Rocket());
        }

    }

    evaluate() {

        let maxfit = 0;
        for(let i=0; i<this.popsize;i++) {
            this.rockets[i].calcFitness();
            maxfit = max(maxfit, this.rockets[i].fitness); 
        }

        for(let i=0;i<this.popsize;i++) {
            this.rockets[i].fitness /= maxfit;
        }

        ////////// SELECTION //////////
        this.mattingPool = [];
        for(let i=0;i<this.popsize;i++) {
            let n = this.rockets[i].fitness * 100;
            for(let j=0;j<n;j++) {
                this.mattingPool.push(this.rockets[i]);
            }
        }

    }

    selection() {
        let newRockets = []
        for(let i=0;i<this.popsize;i++) {
            let parentA = random(this.mattingPool).dna;
            let parentB  = random(this.mattingPool).dna;
            let childDNA = parentA.crossover(parentB);
            childDNA.mutation();
            newRockets[i] = new Rocket(childDNA);
        }
        this.rockets = newRockets;
    }

    run() {
        for(let i=0;i<this.popsize;i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
}