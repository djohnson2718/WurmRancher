import { DistanceObjects, GameElements, RandomXonField, RandomYonField } from "./gameControl.js";
class PredDist {
}
const dibsValue = 333;
const stealRatio = 0.9;
export function Prey(base) {
    return class Prey_ extends base {
        constructor() {
            super(...arguments);
            this.currentlyChasing = {};
        }
        //dibsMap : {[name:string] : number} = {};
        Available(predator) {
            let dist = DistanceObjects(this, predator);
            if (dist > predator.sightRange)
                return false;
            return (!(this.currentlyChasing.hasOwnProperty(predator.Name)) || dist < stealRatio * DistanceObjects(this, this.currentlyChasing[predator.Name]));
        }
        DelcareChase(predator) {
            if (this.currentlyChasing.hasOwnProperty(predator.Name))
                this.currentlyChasing[predator.Name].PreyStolen();
            this.currentlyChasing[predator.Name] = predator;
        }
        PredatorDied(predator) {
            if (this.currentlyChasing.hasOwnProperty(predator.Name) && this.currentlyChasing[predator.Name] == predator)
                delete this.currentlyChasing[predator.Name];
        }
    };
}
const tol = 1;
export function Predator(base) {
    return class Predator_ extends base {
        PreyStolen() {
            this.target = null;
            this.resting = true;
        }
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
            super.Update(time_step);
        }
        Shot() {
            if (this.target) {
                this.target.PredatorDied(this);
                this.target = null;
            }
        }
    };
}
export function GetClosestPrey(to) {
    let best_dist_so_far = Number.MAX_VALUE;
    let closest = null;
    let f = null;
    let cur_dist;
    //console.log("looking for prey");
    for (const e of GameElements) {
        //console.log(e, e.Name,e.Name==preyName);
        if (e.Name in to.preyList) {
            f = e;
            //console.log("available", f.Available(care_about_dibs));
            if (f.Available(to)) {
                //console.log("available!")
                cur_dist = DistanceObjects(f, to);
                if (cur_dist < best_dist_so_far) {
                    //console.log("new best");
                    closest = f;
                    best_dist_so_far = cur_dist;
                }
            }
        }
    }
    //console.log("found",closest);
    return closest;
}
//# sourceMappingURL=prey.js.map