import { RemovePlant } from "./gameControl.js";
import { ImagePiece } from "./imagePiece.js";
import { SprayEffectivenessTime } from "./timing.js";


export const plant_size = 30;

export abstract class Plant extends ImagePiece {
    
    indexX: number;
    indexY: number;
    sprayed: boolean = false;
    time_since_spray = 0;
    Layer = 10;

    constructor(indexX:number, indexY:number){
        super(plant_size,plant_size,0);
        this.indexX=indexX;
        this.indexY=indexY;
        this.x = indexX*plant_size;
        this.y = indexY*plant_size;
    }

    Update(time_step:number) :void{
        //console.log("updating plant");
        if (this.sprayed)
            this.time_since_spray+=time_step;
        if (this.time_since_spray >= SprayEffectivenessTime)
            RemovePlant(this);
        super.Update(time_step);
    }

    Spray() :void{
        console.log("plant sprayed", this);
        this.sprayed = true;
        this.PieceImage = this.SprayedPic;
    }

    abstract SprayedPic: HTMLImageElement;

    abstract Name: string;

}

export function ClosestPlantIndexX(x,y) : number{
    return Math.floor(x/plant_size);
}

export function ClosestPlantIndexY(x,y) : number{
    return Math.floor(y/plant_size);
}

export function PlantCenterPointFromIndex(i : number, j :number) : Array<number> 
{
    return [plant_size * i + plant_size / 2, plant_size * j + plant_size / 2];
}
