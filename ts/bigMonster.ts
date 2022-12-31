import { context, DestroyGoodThings, GrowWeedAtPoint, RandomXonField, RandomYonField, RemovePiece, Distance } from "./gameControl.js";
import { ImagePiece } from "./imagePiece.js";
import { LaserHitable } from "./laserHitable.js";
import { big_monsterImage, eyeImage, eyeShotImage } from "./resources.js";
import { BigMonsterAngryRotate, BigMonsterAngrySpeed, BigMonsterRotate, BigMonsterSpeed, BigMonsterStompTime, BigMonsterTantrumTime, BigMonsterWeedSpawnTime, CreatureDeathFadeTime } from "./timing.js";

const height = 90;
const width = 90;
const eyeHeight = 20;
const eyeWidth = 20;
const trample_radius = (Math.sqrt(2) * height / 2 *.8);

const eyeXs = [10,10,10];
const eyeYs = [10,45,80];


export class BigMonster extends LaserHitable{
    Layer = 3;
    Name = "BigMonster";
    eyesShot = [false, false, false];

    constructor(){
        super(height,width,BigMonsterSpeed/4, BigMonsterRotate);
        this.PieceImage = big_monsterImage;
    }

    get EyesLeft():number{
        let count = 0;
        for (let i =0; i < 3; i++)
            if (!this.eyesShot[i])
                count ++;
        return count;
    }

    tantrum_counter = 0;
    fading = false;
    fade_time_elapsed = 0;
    monster_counter = 0;

    Update(timeStep:number):void{
        if (this.fading){
            this.fade_time_elapsed+=timeStep;

            if (this.fade_time_elapsed > CreatureDeathFadeTime)
                RemovePiece(this);

            this.Opacity = Math.max(0,(CreatureDeathFadeTime - this.fade_time_elapsed) / CreatureDeathFadeTime);

            ImagePiece.prototype.Update.call(this,timeStep);
        }
        else{
            if (this.tantrum_counter > 0)
            {
                this.tantrum_counter = Math.max(0, this.tantrum_counter - timeStep);
                if (this.tantrum_counter == 0)
                {
                    this.pixels_per_ms= BigMonsterSpeed;
                    this.radians_per_ms =BigMonsterRotate;
                }
                if (Math.random()*timeStep/33 < .1)
                    this.SetDestination(RandomXonField(), RandomYonField());
            }
            if (this.resting)
                this.SetDestination(RandomXonField(), RandomYonField());

            this.monster_counter+= timeStep;
            
            if (this.monster_counter % BigMonsterStompTime < timeStep)  
                DestroyGoodThings(this.CenterX, this.CenterY, trample_radius);
            if (this.monster_counter % BigMonsterWeedSpawnTime < timeStep)
                GrowWeedAtPoint(this.CenterX, this.CenterY);
            super.Update(timeStep);
        }

        // draw eyes
        context.save();
        context.globalAlpha = this.Opacity;
        context.translate(this.CenterX,this.CenterY);
        context.rotate(this.angle);
        for (let i = 0; i < 3;i++){
            let eyeToDraw : HTMLImageElement;
            if (!this.eyesShot[i]) eyeToDraw = eyeImage; else eyeToDraw = eyeShotImage;
            context.drawImage(eyeToDraw,-this.Width/2+eyeXs[i] - eyeWidth/2, -this.Height/2+eyeYs[i] - eyeHeight/2, eyeWidth, eyeHeight);
        }
        context.restore();
        
    }


    CheckLaserHit(x: number, y: number): void {
        for (let i = 0; i < 3; i++){
            if (!this.eyesShot[i]){
                let eyeCenterX0 = eyeXs[i] - width/2;
                let eyeCenterY0 = eyeYs[i] - height/2;
                let rotEyeCenterX = Math.cos(this.angle)*eyeCenterX0 - Math.sin(this.angle)*eyeCenterY0 + this.CenterX;
                let rotEyeCenterY = Math.sin(this.angle)*eyeCenterX0 + Math.cos(this.angle)*eyeCenterY0 + this.CenterY;

                console.log("computed eye centers", eyeCenterX0,eyeCenterY0);
                
                if (Distance([rotEyeCenterX,rotEyeCenterY],[x,y]) < eyeWidth/2){
                    this.eyesShot[i] = true;
                    if (this.EyesLeft >0){
                        this.tantrum_counter = BigMonsterTantrumTime;
                        this.pixels_per_ms = BigMonsterAngrySpeed;
                        this.radians_per_ms = BigMonsterAngryRotate;
                    }
                    else
                        this.fading = true;
                }
            }
        }
    }

}

