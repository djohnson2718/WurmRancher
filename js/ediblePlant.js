import { DistanceObjects, PlaySound, RemovePlant } from "./gameControl.js";
import { Plant } from "./plant.js";
import { apple_crunchSound } from "./resources.js";
import { EatGrassTime } from "./timing.js";
const stealRatio = 0.9;
export class EdiblePlant extends Plant {
    constructor() {
        super(...arguments);
        this.bites_taken = 0;
        this.dibs = 0;
    }
    //eaten = false;
    Eat(time_step) {
        this.dibs = 166;
        if (this.Eaten)
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
    Available(eater) {
        if (this.chaser)
            return (DistanceObjects(this, eater) < stealRatio * DistanceObjects(this, this.chaser));
        else
            return true;
    }
    DeclareChase(eater) {
        if (this.chaser) {
            this.chaser.PreyLost();
            this.chaser = null;
        }
        this.chaser = eater;
    }
}
//# sourceMappingURL=ediblePlant.js.map