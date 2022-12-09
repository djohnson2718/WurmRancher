import { ImagePiece } from "./imagePiece.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { CreatureDeathFadeTime, ParasiteKillTime, RelativeRotateToRadiansPerFrame, RelativeSpeedToPixelsPerFrame, relWurmBodyRotate, relWurmHeadRotate, relWurmSpeed } from "./timing.js";
import { Feeder } from "./feeder.js.js";
import { RandomXonField, RandomYonField } from "./gameControl.js";

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
const headImage = new Image();
headImage.src = "./Resources/wurm_head.png";
const bodyImage = new Image();
bodyImage.src = "./Resources/wurm_body.png";
const sight_range = 500;

export class WurmHead extends MovesToDestinationControl implements BackAttachable {

    constructor(){
        super(height, width, RelativeSpeedToPixelsPerFrame(relWurmSpeed), RelativeRotateToRadiansPerFrame(relWurmHeadRotate));
        this.PieceImage = headImage;
        //click event handler
    }

    stun_counter : number;

    get backAttachX(): number{
        return this.CenterX + radius*Math.cos(this.angle);
    }

    get backAttachY(): number{
        return this.CenterY + radius*Math.sin(this.angle);
    }
    
    Follower: WurmBodyPiece;
    
    isStunned: boolean;

    target_angle :number;

    feeder_target : Feeder = null;

    SetTargetAngle() :void{
        this.target_angle = Math.atan((this.CenterY - this.destination_y) / (this.CenterX - this.destination_x));
        if (this.target_angle < 0)
            this.target_angle += Math.PI * 2;

        if (this.CenterX - this.destination_x < 0)
            this.target_angle += Math.PI;
        if (this.target_angle >= 2 * Math.PI)
            this.target_angle -= Math.PI * 2;
    }

    Update() :void
    {
        if (this.stun_counter > 0)
        {
            this.stun_counter--;
            return;
        }
        if (this.feeder_target != null)
        {
            this.feeder_target.Dibs();
            if (this.feeder_target.eaten)
            {
                this.feeder_target = null;
                this.resting = true;
            }
            else
            {
                this.SetDestination(this.feeder_target.x, this.feeder_target.y);
                this.SetTargetAngle();
                if (Math.sqrt( (this.CenterX-this.feeder_target.CenterX)^2 + (this.CenterY-this.feeder_target.CenterY)^2) <= radius)
                {
                    //Eats(this, new EatEventData(this.feeder_target));
                    //if (theControl.SoundEffectsOn)
                    //    EatSound.Play();
                }
                    
                
            }
        } 
        
        if (this.resting){
            //this.feeder_target = GetClosestPrey<Feeder>(this, true);
            if (this.feeder_target != null && Math.sqrt( (this.CenterX-this.feeder_target.CenterX)^2 + (this.CenterY-this.feeder_target.CenterY)^2) > sight_range)
                this.feeder_target = null;
            
            if (this.feeder_target == null)
            {
                this.SetDestination(RandomXonField(), RandomYonField());
            }
        }
            
        super.Update();
    }
}

export class WurmBodyPiece extends ImagePiece implements BackAttachable //, Prey
    {

        Leader :BackAttachable;
        head :WurmHead;

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
    
        radians_per_frame = RelativeRotateToRadiansPerFrame(relWurmBodyRotate); //be careful here!!!!
        
        //public event EventHandler<EventArgs> EatenByParasite;


        fade_time_elapsed : number = 0;
        total_bites_suffered : number = 0;

        Update() :void
        {
            if (this.head.isStunned)
                return;
            this.angle += this.radians_per_frame* Math.cos(this.Leader.angle - this.angle - Math.PI / 2);

            
            if (this.total_bites_suffered > 0  && this.total_bites_suffered < ParasiteKillTime)
                this.total_bites_suffered--;

            
            this.CenterX = this.Leader.backAttachX + radius * Math.cos(this.angle);
            this.CenterY = this.Leader.backAttachY + radius * Math.sin(this.angle);

            if (this.IsEatenByParasite)
            {                
                this.fade_time_elapsed++;

                if (this.fade_time_elapsed > CreatureDeathFadeTime){}
                    //EatenByParasite(this, new EventArgs());

                //this.Opacity = (double)(Timing.CreatureDeathFadeTime - this.fade_time_elapsed) / Timing.CreatureDeathFadeTime;               
            }
           super.Update();
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

        ParasiteBite() :void
        {
            this.total_bites_suffered+=2;    //we will decrement them on update as well.            
        }
    }

//export interface EatEventData extends EventArgs {
//    creatureEaten: Feeder;
//}