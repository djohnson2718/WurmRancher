import { RemovePlant } from "./gameControl.js";
import { Plant } from "./plant.js";
import { EatGrassTime } from "./timing.js";
export class EdiblePlant extends Plant {
    Eat() {
        this.bites_taken++;
        if (this.bites_taken >= EatGrassTime)
            RemovePlant(this);
        this.dibs = 5;
        //returns 1 if the caller should get credit for eating this.
        if (this.bites_taken == EatGrassTime) {
            //if (SoundEffectsOn)
            //    GrassEatenSound.Play();
            return this.eat_value;
        }
        else
            return 0;
    }
    get Eaten() {
        return this.bites_taken >= EatGrassTime;
    }
    Update() {
        if (this.dibs > 0) {
            this.dibs--;
        }
        super.Update();
    }
    Dibs(d) {
        this.dibs = d;
    }
}
//# sourceMappingURL=ediblePlant.js.map