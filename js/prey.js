import { DistanceObjects, GameElements, RandomXonField, RandomYonField } from "./gameControl.js";
const dibsValue = 333;
const stealRatio = 0.9;
export const PreyImp = {
    currentlyChasing: {},
    Available(predator) {
        let dist = DistanceObjects(this, predator);
        if (dist > predator.sightRange)
            return false;
        return (!(this.currentlyChasing.hasOwnProperty(predator.Name)) || dist < stealRatio * DistanceObjects(this, this.currentlyChasing[predator.Name]));
    },
    DelcareChase(predator) {
        if (this.currentlyChasing.hasOwnProperty(predator.Name))
            this.currentlyChasing[predator.Name].PreyStolen();
        this.currentlyChasing[predator.Name] = predator;
        this.zzzz();
    },
    PredatorDied(predator) {
        if (this.currentlyChasing.hasOwnProperty(predator.Name) && this.currentlyChasing[predator.Name] == predator)
            delete this.currentlyChasing[predator.Name];
    }
};
const tol = 10;
export const PredatorImp = {
    PreyStolen() {
        this.target = null;
        this.resting = true;
    },
    target: null,
    Update(time_step) {
        if (this.hit) {
            super.Update(time_step);
            return;
        }
        if (this.target) {
            if (this.target.Eaten)
                this.target = null;
            else {
                this.SetDestination(this.target.CenterX, this.target.CenterY);
                if (this.target != null && DistanceObjects(this, this.target) < tol) {
                    this.foodEaten += this.target.Eat();
                }
            }
        }
        if (this.target == null && this.resting) {
            //find new prey
            let best_dist_so_far = Number.MAX_VALUE;
            let closest = null;
            let f = null;
            let cur_dist;
            for (const e of GameElements) {
                if (e.Name in this.preyList) {
                    f = e;
                    if (f.Available(this)) {
                        cur_dist = DistanceObjects(f, this); //redundant calculation
                        if (cur_dist < best_dist_so_far) {
                            closest = f;
                            best_dist_so_far = cur_dist;
                        }
                    }
                }
            }
            if (f) {
                f.DeclareChase(this);
                this.target = f;
            }
            else
                this.SetDestination(RandomXonField(), RandomYonField());
        }
        console.log(this);
        console.log(super.Update);
        super.Update(time_step);
    },
    Shot() {
        if (this.target) {
            this.target.PredatorDied(this);
            this.target = null;
        }
    }
};
//# sourceMappingURL=prey.js.map