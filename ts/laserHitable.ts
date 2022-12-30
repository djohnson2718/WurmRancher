import { PlaySound } from "./gameControl.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";

export abstract class LaserHitable extends MovesToDestinationControl{
    hit = false;
    abstract Layer: number;
    abstract Name: string;
    LaserHitSound : HTMLAudioElement;
    Shot : Function;

    CheckLaserHit(x: number, y: number): void {
        console.log("in check laser hit");
        if (!this.hit && ( x >= this.x && (x - this.x) <= this.Width) &&  y  >= this.y && (y-this.y) < this.Height){

            if (this.LaserHitSound)
                PlaySound(this.LaserHitSound);

            console.log("it was a hit!");
            this.hit = true;
            //report shot event
            if (this.Shot)
                this.Shot();
        }

    }

    
}