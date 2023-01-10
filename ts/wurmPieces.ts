import { ImagePiece } from "./imagePiece.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { CreatureDeathFadeTime, ParasiteKillTime, WurmBodyRotate, WurmHeadRotate, WurmSpeed, WurmStunTime } from "./timing.js";
import { Feeder } from "./feeder.js";
import { DistanceObjects, PlaySound, RandomXonField, RandomYonField } from "./gameControl.js";
import { food_per_segment, Wurm } from "./wurm.js";
import { LaserHitable } from "./laserHitable.js";
import { headImage, bodyImage, electic_buzz, dragonSound } from "./resources.js";
import { Predator } from "./prey.js";

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

class _WurmHead extends LaserHitable implements BackAttachable {
    
    wurmObject : Wurm;
    Layer =4;
    Name= "Wurm Head";
    
    sightRange = 500;
    preyList = ["Feeder"];
    foodEaten = 0;
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

    Shot(): void {
        super.Shot();
        this.stun_counter = WurmStunTime;
    }

    Follower: WurmBodyPiece;
    
    //get isStunned(): boolean{
    //    return this.stun_counter > 0;
    //}

    target_angle :number;

    //feeder_target : Feeder = null;

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
        super.Update(time_step);
        if (this.hit)
        {
            this.stun_counter-=time_step;
            if (this.stun_counter <= 0){
                this.hit = false;
                this.stun_counter = 0;
            }
            ImagePiece.prototype.Update.call(this);
            return;
        }


        this.SetTargetAngle();

        while (this.foodEaten >= food_per_segment)
        {
            this.foodEaten -= food_per_segment;
            this.wurmObject.Grow();
        }

    }
}

export const WurmHead = Predator(_WurmHead);


export class WurmBodyPiece extends ImagePiece implements BackAttachable //, Prey
    {
        Layer = 3;
        Name = "WurmBody";
        Leader :BackAttachable;
        head : WurmHead;

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

        Available(care_about_dibs:boolean) : boolean 
        {
            if (!care_about_dibs)
                throw new DOMException("something is wrong... everything that hunts wurm pieces cares about dibs");
            return (this.total_bites_suffered == 0);            
        }

        ParasiteBite(timeStep : number) :void
        {
            this.total_bites_suffered+=2*timeStep;    //we will decrement them on update as well.            
        }

        
    }

//export interface EatEventData extends EventArgs {
//    creatureEaten: Feeder;
//}