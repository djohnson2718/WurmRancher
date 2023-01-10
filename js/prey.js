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
export function Predator(base) {
    return class Predator_ extends base {
        PreyStolen() {
        }
    };
}
let FeederP = Prey(Feeder);
let r = new FeederP();
//# sourceMappingURL=prey.js.map