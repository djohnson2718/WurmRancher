import { EdiblePlant } from "./ediblePlant.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { FeederRotate, FeederSpeed } from "./timing.js";
import { context, DistanceObjects,  RemovePiece, SetTargetPlant } from "./gameControl.js";
import { GrassChaser } from "./predPrey.js";

const height =30;
const width = 30;
const max_vision = 200;
export const max_fattened = 10;

const feederPic = new Image(height,width);
feederPic.src = "../Resources/feeder.png";

export class Feeder extends MovesToDestinationControl implements GrassChaser
{
    eaten: boolean = false;
    fattened: number = 0;
    //feederSize: number;
    dibs: number=0;
    Layer = 6;
    Name = "Feeder";
    targetPlant :EdiblePlant;

    target_plant : EdiblePlant;

    constructor (){
        super(height,width, FeederSpeed, FeederRotate);
        this.PieceImage = feederPic;
        this.target_plant = null;
    }

    Dibs() :void{
        this.dibs = 333;
    }

    Update(time_step:number):void{
        super.Update(time_step);
        if (this.dibs > 0){
            this.dibs = Math.max(0, this.dibs-time_step);
            console.log("dibbed avlue", this.dibs);
        }
        if (this.target_plant != null && DistanceObjects(this, this.target_plant) < 1)
        {
            let eats = this.target_plant.Eat(time_step);
            if (eats != 0)
            {
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
            SetTargetPlant(this, ["GoodGrass","PoisonWeed"], max_vision);
            

        context.textAlign = "center";
        if (this.fattened < 10)
            context.font= "25px sans";
        else
            context.font= "20px sans";
        context.fillStyle = "black";
        context.fillText(String(this.fattened), this.CenterX -width/1.5, this.CenterY + width/2);

    }

    Available(care_about_dibs):boolean{
        return (!care_about_dibs || this.dibs == 0);
    }

    Eat() : number{
        if (this.eaten)
            return 0;

        this.eaten = true;
        RemovePiece(this);
        return this.fattened;
    }



    PreyLost(): void {
        this.target_plant = null;
        this.resting = true;
    }

}