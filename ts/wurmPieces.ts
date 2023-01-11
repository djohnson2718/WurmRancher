import { ImagePiece } from "./imagePiece.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { CreatureDeathFadeTime, ParasiteKillTime, WurmBodyRotate, WurmHeadRotate, WurmSpeed, WurmStunTime } from "./timing.js";
import { Feeder } from "./feeder.js";
import { DistanceObjects, PlaySound, RandomXonField, RandomYonField, SetPreyTarget } from "./gameControl.js";
import { Wurm } from "./wurm.js";
import { LaserHitable } from "./laserHitable.js";
import { headImage, bodyImage, electic_buzz, dragonSound } from "./resources.js";
import { Parasite } from "./parasite.js";
import { Predator, Prey } from "./predPrey.js";

export interface BackAttachable {
    backAttachX: number;
    backAttachY: number;
    angle: number;
    Follower: WurmBodyPiece;
    //centerPointX: number;
    //centerPointY: number;
}

const height = 30;
const width = 30;
const radius = 15;



export class WurmHead extends LaserHitable implements BackAttachable, Predator {
    
    wurmObject : Wurm;
    Layer =4;
    Name= "Wurm Head";
    sightRange = 500;
    //WurmEats : Event;

    constructor(wurmObject :Wurm){
        super(height, width, WurmSpeed, WurmHeadRotate);
        this.PieceImage = headImage;
        this.wurmObject = wurmObject;
        this.LaserHitSound = electic_buzz;
    }

    stun_counter : number;

    get backAttachX(): number{
        return this.CenterX + radius*0.8*Math.cos(this.angle);
    }

    get backAttachY(): number{
        return this.CenterY + radius*0.8*Math.sin(this.angle);
    }
    
    CheckLaserHit(x: number, y: number): boolean {
        let result = super.CheckLaserHit(x,y);
        if (this.hit){
            this.stun_counter = WurmStunTime;
            this.target = null;
        }
        this.hit = false;

        return result;
    }

    Follower: WurmBodyPiece;
    
    get isStunned(): boolean{
        return this.stun_counter > 0;
    }

    target_angle :number;

    target : Feeder = null;

    SetTargetAngle() :void{
        this.target_angle = Math.atan((this.CenterY - this.destination_y) / (this.CenterX - this.destination_x));
        if (this.target_angle < 0)
            this.target_angle += Math.PI * 2;

        if (this.CenterX - this.destination_x < 0)
            this.target_angle += Math.PI;
        if (this.target_angle >= 2 * Math.PI)
            this.target_angle -= Math.PI * 2;
    }

    Update(time_step:number) :void
    {
        if (this.isStunned)
        {
            this.stun_counter-=time_step;
            ImagePiece.prototype.Update.call(this);
            return;
        }
        if (this.target != null)
        {
            //this.feeder_target.Dibs();
            if (this.target.eaten)
            {
                this.target = null;
                this.resting = true;
            }
            else
            {
                this.SetDestination(this.target.CenterX, this.target.CenterY);
                this.SetTargetAngle();
                if (DistanceObjects(this,this.target) <= radius)
                {
                    this.wurmObject.head_Eats(this);
                    //Eats(this, new EatEventData(this.feeder_target));
                    //if (theControl.SoundEffectsOn)
                    //    EatSound.Play();
                    PlaySound(dragonSound);
                }
                    
                
            }
        } 
        
        if (this.resting && this.target == null){
            SetPreyTarget(this,"Feeder");
        }
            
        super.Update(time_step);
    }

    PreyLost():void{
        this.target = null;
        this.resting = true;
    }

    
}

const stealRatio = 0.9;
export class WurmBodyPiece extends ImagePiece implements BackAttachable , Prey<Parasite>
    {
        Layer = 3;
        Name = "WurmBody";
        Leader :BackAttachable;
        head :WurmHead;

        radians_per_ms = WurmBodyRotate; //be careful here!!!!

        constructor(leader_ :BackAttachable , head_:WurmHead)
        {
            super(height,width,leader_.angle);
            this.Leader = leader_;
            this.head = head_;
            this.Leader.Follower = this;            
            this.Height = 30;
            this.Width = 30;

            this.PieceImage = bodyImage;
            
        }

        
        Follower : WurmBodyPiece;

        get backAttachX(): number{
            return this.CenterX + radius*Math.cos(this.angle);
        }
    
        get backAttachY(): number{
            return this.CenterY + radius*Math.sin(this.angle);
        }
    
        
        
        //public event EventHandler<EventArgs> EatenByParasite;


        fade_time_elapsed : number = 0;
        total_bites_suffered : number = 0;

        Update(time_step:number) :void
        {
            if (this.head.isStunned){
                ImagePiece.prototype.Update.call(this);
                return;
            }
                
            this.angle += this.radians_per_ms*time_step* Math.cos(this.Leader.angle - this.angle - Math.PI / 2);

            
            if (this.total_bites_suffered > 0  && this.total_bites_suffered < ParasiteKillTime)
                this.total_bites_suffered = Math.max(this.total_bites_suffered - time_step,0);

            
            this.CenterX = this.Leader.backAttachX + radius * Math.cos(this.angle);
            this.CenterY = this.Leader.backAttachY + radius * Math.sin(this.angle);

            if (this.IsEatenByParasite)
            {                
                this.fade_time_elapsed+=time_step;

                if (this.fade_time_elapsed > CreatureDeathFadeTime){
                    this.head.wurmObject.pieceEatenByParasite(this);
                }
                    //EatenByParasite(this, new EventArgs());
                

                this.Opacity = (CreatureDeathFadeTime - this.fade_time_elapsed) / CreatureDeathFadeTime;               
            }
           super.Update(time_step);
        }


        get IsEatenByParasite():boolean {
            return (this.total_bites_suffered >= ParasiteKillTime);
        }

        ParasiteBite(timeStep : number) :void
        {
            this.total_bites_suffered+=2*timeStep;    //we will decrement them on update as well.            
        }

        chaser : Parasite = null;
        Available(eater : Parasite) :boolean{
            if (this.chaser)
                return (DistanceObjects(this,eater) < stealRatio * DistanceObjects(this, this.chaser))
            else
                return true;
        }
    
        DeclareChase(eater:Parasite):void{
            if (this.chaser){
                this.chaser.PreyLost();
                this.chaser=null;
            }
            this.chaser = eater;
        }

        
    }

//export interface EatEventData extends EventArgs {
//    creatureEaten: Feeder;
//}