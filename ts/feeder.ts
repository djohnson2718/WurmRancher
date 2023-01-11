import { EdiblePlant } from "./ediblePlant.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { FeederRotate, FeederSpeed } from "./timing.js";
import { context, DistanceObjects,  RemovePiece, SetTargetPlant } from "./gameControl.js";
import { GrassChaser, Predator, Prey } from "./predPrey.js";
import { WurmHead } from "./wurmPieces.js";
import { Monster } from "./monster.js";

const height =30;
const width = 30;
const max_vision = 200;
export const max_fattened = 10;

const feederPic = new Image(height,width);
feederPic.src = "../Resources/feeder.png";
const stealRatio = 0.9;

export class Feeder extends MovesToDestinationControl implements GrassChaser, Prey<WurmHead>, Prey<Monster>
{
    eaten: boolean = false;
    fattened: number = 0;
    //feederSize: number;

    Layer = 6;
    Name = "Feeder";
    targetPlant :EdiblePlant = null;



    constructor (){
        super(height,width, FeederSpeed, FeederRotate);
        this.PieceImage = feederPic;
    }



    Update(time_step:number):void{
        super.Update(time_step);
        
        if (this.targetPlant && DistanceObjects(this, this.targetPlant) < 1)
        {
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
            SetTargetPlant(this, ["GoodGrass","PoisonWeed"], max_vision);
            

        context.textAlign = "center";
        if (this.fattened < 10)
            context.font= "25px sans";
        else
            context.font= "20px sans";
        context.fillStyle = "black";
        context.fillText(String(this.fattened), this.CenterX -width/1.5, this.CenterY + width/2);

    }


    Eat() : number{
        if (this.eaten)
            return 0;
        this.eaten = true;
        RemovePiece(this);
        if (this.targetPlant)
            this.targetPlant.chaser = null;
        return this.fattened;
    }



    PreyLost(): void {
        this.targetPlant = null;
        this.resting = true;
    }

    chaser:Predator;

    Available(eater : Predator) :boolean{
        if (this.chaser)
            return (DistanceObjects(this,eater) < stealRatio * DistanceObjects(this, this.chaser))
        else
            return true;
    }

    DeclareChase(chaser:Predator) {
        if (this.chaser){
            this.chaser.PreyLost();
            this.chaser=null;
        }
        this.chaser = chaser;    
    }



}