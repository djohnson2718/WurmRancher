import { context, RemovePiece } from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { LaserFadeTime } from "./timing.js";

export class LaserBeam implements GameElement{
    sourceX:number;
    sourceY:number;
    targetX:number;
    targetY:number;
    time = 0;
    Name = "LaserBeam";
    Layer = 1;
    constructor(sourceX:number, sourceY:number, targetX:number, targetY:number){
        this.targetX = targetX;
        this.targetY = targetY;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
    }

    Update():void{
        this.time++;
        if (this.time >= LaserFadeTime){
            RemovePiece(this);
        }
        
        context.save()
        context.globalAlpha = (LaserFadeTime - this.time)/LaserFadeTime;
        context.lineWidth = 5;
        context.strokeStyle = '#ff0000';
        context.beginPath();
        context.moveTo(this.sourceX, this.sourceY);
        context.lineTo(this.targetX, this.targetY);
        context.stroke();
        context.restore();
    }


}