import { PlaySound } from "./gameControl.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";

export abstract class LaserHitable extends MovesToDestinationControl{
    hit = false;
    abstract Layer: number;
    abstract Name: string;
    LaserHitSound : HTMLAudioElement;
    ShotHandler : Function;

    CheckLaserHit(x: number, y: number): boolean {
        console.log("in check laser hit",x,y);
        if (!this.hit && ( x >= this.x && (x - this.x) <= this.Width) &&  y  >= this.y && (y-this.y) < this.Height){

            if (this.LaserHitSound)
                PlaySound(this.LaserHitSound);

            console.log("it was a hit!");
            this.hit = true;
            if (this.ShotHandler)
                this.ShotHandler();
            this.Hit();
            return true;
        }
        else return false;
    }

    Hit():void{};

    
}