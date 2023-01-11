import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { FeederRotate, FeederSpeed } from "./timing.js";
import { context, DistanceObjects, RemovePiece, SetTargetPlant } from "./gameControl.js";
const height = 30;
const width = 30;
const max_vision = 200;
export const max_fattened = 10;
const feederPic = new Image(height, width);
feederPic.src = "../Resources/feeder.png";
const stealRatio = 0.9;
export class Feeder extends MovesToDestinationControl {
    constructor() {
        super(height, width, FeederSpeed, FeederRotate);
        this.eaten = false;
        this.fattened = 0;
        //feederSize: number;
        this.Layer = 6;
        this.Name = "Feeder";
        this.targetPlant = null;
        this.PieceImage = feederPic;
    }
    Update(time_step) {
        super.Update(time_step);
        if (this.targetPlant && DistanceObjects(this, this.targetPlant) < 1) {
            let eats = this.targetPlant.Eat(time_step);
            if (eats != 0)
                this.fattened += eats;
            if (this.fattened > max_fattened)
                this.fattened = max_fattened;
            if (this.fattened < 0)
                this.fattened = 0;
            if (this.targetPlant.Eaten)
                this.targetPlant = null;
        }
        if (this.targetPlant == null && this.resting) // find a new destination!
            SetTargetPlant(this, ["GoodGrass", "PoisonWeed"], max_vision);
        context.textAlign = "center";
        if (this.fattened < 10)
            context.font = "25px sans";
        else
            context.font = "20px sans";
        context.fillStyle = "black";
        context.fillText(String(this.fattened), this.CenterX - width / 1.5, this.CenterY + width / 2);
    }
    Eat() {
        if (this.eaten)
            return 0;
        this.eaten = true;
        RemovePiece(this);
        if (this.targetPlant)
            this.targetPlant.chaser = null;
        return this.fattened;
    }
    PreyLost() {
        this.targetPlant = null;
        this.resting = true;
    }
    Available(eater) {
        if (this.chaser)
            return (DistanceObjects(this, eater) < stealRatio * DistanceObjects(this, this.chaser));
        else
            return true;
    }
    DeclareChase(chaser) {
        if (this.chaser) {
            this.chaser.PreyLost();
            this.chaser = null;
        }
        this.chaser = chaser;
    }
}
//# sourceMappingURL=feeder.js.map