import { ImagePiece } from "./imagePiece.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { CreatureDeathFadeTime, ParasiteKillTime, RelativeRotateToRadiansPerFrame, RelativeSpeedToPixelsPerFrame, relWurmBodyRotate, relWurmHeadRotate, relWurmSpeed } from "./timing.js";
import { DistanceObjects, GetClosestPrey, RandomXonField, RandomYonField } from "./gameControl.js";
const height = 30;
const width = 30;
const radius = 15;
const headImage = new Image();
headImage.src = "../Resources/wurm_head.png";
const bodyImage = new Image();
bodyImage.src = "../Resources/wurm_body.png";
const sight_range = 500;
export class WurmHead extends MovesToDestinationControl {
    constructor(wurmObject) {
        super(height, width, RelativeSpeedToPixelsPerFrame(relWurmSpeed), RelativeRotateToRadiansPerFrame(relWurmHeadRotate));
        this.Layer = 3;
        this.feeder_target = null;
        this.PieceImage = headImage;
        this.wurmObject = wurmObject;
        //click event handler
    }
    get backAttachX() {
        return this.CenterX + radius * Math.cos(this.angle);
    }
    get backAttachY() {
        return this.CenterY + radius * Math.sin(this.angle);
    }
    SetTargetAngle() {
        this.target_angle = Math.atan((this.CenterY - this.destination_y) / (this.CenterX - this.destination_x));
        if (this.target_angle < 0)
            this.target_angle += Math.PI * 2;
        if (this.CenterX - this.destination_x < 0)
            this.target_angle += Math.PI;
        if (this.target_angle >= 2 * Math.PI)
            this.target_angle -= Math.PI * 2;
    }
    Update() {
        if (this.stun_counter > 0) {
            this.stun_counter--;
            return;
        }
        if (this.feeder_target != null) {
            this.feeder_target.Dibs();
            if (this.feeder_target.eaten) {
                this.feeder_target = null;
                this.resting = true;
            }
            else {
                this.SetDestination(this.feeder_target.CenterX, this.feeder_target.CenterY);
                this.SetTargetAngle();
                if (DistanceObjects(this, this.feeder_target) <= radius) {
                    this.wurmObject.head_Eats(this);
                    //Eats(this, new EatEventData(this.feeder_target));
                    //if (theControl.SoundEffectsOn)
                    //    EatSound.Play();
                }
            }
        }
        if (this.resting) {
            this.feeder_target = GetClosestPrey(this, true, "Feeder");
            if (this.feeder_target != null && DistanceObjects(this, this.feeder_target) > sight_range)
                this.feeder_target = null;
            if (this.feeder_target == null) {
                this.SetDestination(RandomXonField(), RandomYonField());
            }
        }
        super.Update();
    }
    get Name() { return "Wurm Head"; }
}
export class WurmBodyPiece extends ImagePiece {
    constructor(leader_, head_) {
        super(height, width, leader_.angle);
        this.Layer = 4;
        this.radians_per_frame = RelativeRotateToRadiansPerFrame(relWurmBodyRotate); //be careful here!!!!
        //public event EventHandler<EventArgs> EatenByParasite;
        this.fade_time_elapsed = 0;
        this.total_bites_suffered = 0;
        this.Leader = leader_;
        this.head = head_;
        this.Leader.Follower = this;
        this.Height = 30;
        this.Width = 30;
        this.PieceImage = bodyImage;
    }
    get backAttachX() {
        return this.CenterX + radius * Math.cos(this.angle);
    }
    get backAttachY() {
        return this.CenterY + radius * Math.sin(this.angle);
    }
    Update() {
        if (this.head.isStunned)
            return;
        this.angle += this.radians_per_frame * Math.cos(this.Leader.angle - this.angle - Math.PI / 2);
        if (this.total_bites_suffered > 0 && this.total_bites_suffered < ParasiteKillTime)
            this.total_bites_suffered--;
        this.CenterX = this.Leader.backAttachX + radius * Math.cos(this.angle);
        this.CenterY = this.Leader.backAttachY + radius * Math.sin(this.angle);
        if (this.IsEatenByParasite) {
            this.fade_time_elapsed++;
            if (this.fade_time_elapsed > CreatureDeathFadeTime) { }
            //EatenByParasite(this, new EventArgs());
            //this.Opacity = (double)(Timing.CreatureDeathFadeTime - this.fade_time_elapsed) / Timing.CreatureDeathFadeTime;               
        }
        super.Update();
    }
    get IsEatenByParasite() {
        return (this.total_bites_suffered >= ParasiteKillTime);
    }
    Available(care_about_dibs) {
        if (!care_about_dibs)
            throw new DOMException("something is wrong... everything that hunts wurm pieces cares about dibs");
        return (this.total_bites_suffered == 0);
    }
    ParasiteBite() {
        this.total_bites_suffered += 2; //we will decrement them on update as well.            
    }
    get Name() { return "Wurm Body"; }
}
//export interface EatEventData extends EventArgs {
//    creatureEaten: Feeder;
//}
//# sourceMappingURL=wurmPieces.js.map