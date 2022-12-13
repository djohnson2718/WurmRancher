import { MovesToDestinationControl } from "./movesToDestinationControl.js";

export abstract class LaserHitable extends MovesToDestinationControl{
    hit = false;
    abstract Layer: number;
    abstract Name: string;
    CheckLaserHit(x: number, y: number): void {
        console.log("in check laser hit");
        if (!this.hit && ( x >= this.x && (x - this.x) <= this.Width) &&  y  >= this.y && (y-this.y) < this.Height){
            //Play die sound
            console.log("it was a hit!");
            this.hit = true;
            //report shot event
        }

    }

    
}