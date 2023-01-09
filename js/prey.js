import { Feeder } from "./feeder.js";
import { DistanceObjects } from "./gameControl.js";
class PredDist {
}
export function Prey(base) {
    return class Prey_ extends base {
        constructor() {
            super(...arguments);
            this.predatorMap = {};
        }
        Available(care_about_dibs) {
            return true;
        }
        CheckToChase(predator) {
            let dist = DistanceObjects(this, predator);
            if (this.predatorMap.hasOwnProperty(predator.Name))
                if (dist < this.predatorMap[predator.Name].dist) {
                    this.predatorMap[predator.Name].predator.PreyStolen();
                    this.predatorMap[predator.Name] = { "dist": dist, "predator": predator };
                }
                else
                    this.predatorMap[predator.Name] = { "dist": dist, "predator": predator };
        }
        Update(time_step) {
            super.Update(time_step);
            this.predatorMap = {};
        }
        ;
    };
}
const tol = 1;
export function Predator(base) {
    return class Predator_ extends base {
        PreyStolen() {
        }
        Update(time_step) {
            if (this.hit) {
                super.Update(time_step);
                return;
            }
            if (this.target != null && DistanceObjects(this, this.target) < tol) {
                this.target.Eat();
                if (this.taraget.Eaten)
                    this.target = null;
            }
            if (this.target == null && this.resting) {
                //request to chase closest available
            }
            super.Update(time_step);
        }
    };
}
export function GetClosestPrey(to, preyNames) {
    let best_dist_so_far = Number.MAX_VALUE;
    let closest = null;
    let f = null;
    let cur_dist;
    //console.log("looking for prey");
    for (const e of GameElements) {
        //console.log(e, e.Name,e.Name==preyName);
        if (e.Name == preyName) {
            f = e;
            //console.log("available", f.Available(care_about_dibs));
            if (f.Available(care_about_dibs)) {
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
let FeederP = Prey(Feeder);
let r = new FeederP();
//# sourceMappingURL=prey.js.map