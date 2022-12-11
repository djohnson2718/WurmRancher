import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { RelativeRotateToRadiansPerFrame, RelativeSpeedToPixelsPerFrame, relFeederRotate, relFeederSpeed } from "./timing.js";
import { context, DistanceObjects, GetClosestEdiblePlant, RandomXonField, RandomYonField, RemovePiece } from "./gameControl.js";
const height = 30;
const width = 30;
const max_vision = 200;
const max_fattened = 10;
const feederPic = new Image(height, width);
feederPic.src = "../Resources/feeder.png";
export class Feeder extends MovesToDestinationControl //implements Prey
 {
    constructor() {
        super(height, width, RelativeSpeedToPixelsPerFrame(relFeederSpeed), RelativeRotateToRadiansPerFrame(relFeederRotate));
        this.eaten = false;
        this.fattened = 0;
        //feederSize: number;
        this.dibs = 0;
        this.PieceImage = feederPic;
        this.target_plant = null;
    }
    Dibs() {
        this.dibs = 10;
    }
    Update() {
        super.Update();
        if (this.dibs > 0)
            this.dibs--;
        if (this.target_plant != null && DistanceObjects(this, this.target_plant) < 1) {
            let eats = this.target_plant.Eat();
            if (eats != 0) {
                this.fattened += eats;
                //if (EatsGrass != null)
                //    EatsGrass(this, new GameEventArgs(theControl));
            }
            if (this.fattened > max_fattened)
                this.fattened = max_fattened;
            if (this.fattened < 0)
                this.fattened = 0;
            if (this.target_plant.Eaten)
                this.target_plant = null;
        }
        if (this.target_plant == null && this.resting) // find a new destination!
         {
            this.target_plant = GetClosestEdiblePlant(this);
            if (this.target_plant != null && DistanceObjects(this.target_plant, this) > max_vision)
                this.target_plant = null;
            if (this.target_plant != null) {
                this.SetDestination(this.target_plant.CenterX, this.target_plant.CenterY);
                this.target_plant.Dibs(10);
            }
            else
                this.SetDestination(RandomXonField(), RandomYonField());
        }
        context.fillText(String(this.fattened), this.CenterX - width / 2, this.CenterY + width / 3);
    }
    Available(care_about_dibs) {
        return (!care_about_dibs || this.dibs == 0);
    }
    Eat() {
        if (this.eaten)
            return 0;
        this.eaten = true;
        RemovePiece(this);
        return this.fattened;
    }
    get Name() { return "Feeder"; }
}
//# sourceMappingURL=feeder.js.map