import { PlaySound, RemovePlant } from "./gameControl.js";
import { Plant } from "./plant.js";
import { PreyImp } from "./prey.js";
import { apple_crunchSound } from "./resources.js";
import { EatGrassTime } from "./timing.js";
export class EdiblePlant extends Plant {
    constructor() {
        super(...arguments);
        this.bites_taken = 0;
        this.dibs = 0;
        this.eaten = false;
        //abstract get Available() : boolean;
    }
    Eat(time_step) {
        this.dibs = 166;
        if (this.eaten)
            return 0;
        this.bites_taken += time_step;
        //console.log("eating", this.bites_taken);
        if (this.bites_taken >= EatGrassTime) {
            RemovePlant(this);
            PlaySound(apple_crunchSound);
            return this.eat_value;
        }
        return 0;
    }
    get Eaten() {
        return this.bites_taken >= EatGrassTime;
    }
    Update(time_step) {
        if (this.dibs > 0) {
            this.dibs = Math.max(0, this.dibs - time_step);
        }
        super.Update(time_step);
    }
    Dibs(d) {
        this.dibs = d;
    }
}
Object.assign(EdiblePlant.prototype, PreyImp);
//# sourceMappingURL=ediblePlant.js.map