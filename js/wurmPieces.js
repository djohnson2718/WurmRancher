import { ImagePiece } from "./imagePiece.js";
import { CreatureDeathFadeTime, ParasiteKillTime, WurmBodyRotate, WurmHeadRotate, WurmSpeed, WurmStunTime } from "./timing.js";
import { food_per_segment } from "./wurm.js";
import { LaserHitable } from "./laserHitable.js";
import { headImage, bodyImage, electic_buzz } from "./resources.js";
import { Predator } from "./prey.js";
const height = 30;
const width = 30;
const radius = 15;
class _WurmHead extends LaserHitable {
    //WurmEats : Event;
    constructor(wurmObject) {
        super(height, width, WurmSpeed, WurmHeadRotate);
        this.Layer = 4;
        this.Name = "Wurm Head";
        this.sightRange = 500;
        this.preyList = ["Feeder"];
        this.foodEaten = 0;
        this.PieceImage = headImage;
        this.wurmObject = wurmObject;
        this.LaserHitSound = electic_buzz;
    }
    get backAttachX() {
        return this.CenterX + radius * 0.8 * Math.cos(this.angle);
    }
    get backAttachY() {
        return this.CenterY + radius * 0.8 * Math.sin(this.angle);
    }
    Shot() {
        super.Shot();
        this.stun_counter = WurmStunTime;
    }
    //feeder_target : Feeder = null;
    SetTargetAngle() {
        this.target_angle = Math.atan((this.CenterY - this.destination_y) / (this.CenterX - this.destination_x));
        if (this.target_angle < 0)
            this.target_angle += Math.PI * 2;
        if (this.CenterX - this.destination_x < 0)
            this.target_angle += Math.PI;
        if (this.target_angle >= 2 * Math.PI)
            this.target_angle -= Math.PI * 2;
    }
    Update(time_step) {
        super.Update(time_step);
        if (this.hit) {
            this.stun_counter -= time_step;
            if (this.stun_counter <= 0) {
                this.hit = false;
                this.stun_counter = 0;
            }
            ImagePiece.prototype.Update.call(this);
            return;
        }
        this.SetTargetAngle();
        while (this.foodEaten >= food_per_segment) {
            this.foodEaten -= food_per_segment;
            this.wurmObject.Grow();
        }
    }
}
export const WurmHead = Predator(_WurmHead);
export class WurmBodyPiece extends ImagePiece {
    constructor(leader_, head_) {
        super(height, width, leader_.angle);
        this.Layer = 3;
        this.Name = "WurmBody";
        this.radians_per_ms = WurmBodyRotate; //be careful here!!!!
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
    Update(time_step) {
        if (this.head.isStunned) {
            ImagePiece.prototype.Update.call(this);
            return;
        }
        this.angle += this.radians_per_ms * time_step * Math.cos(this.Leader.angle - this.angle - Math.PI / 2);
        if (this.total_bites_suffered > 0 && this.total_bites_suffered < ParasiteKillTime)
            this.total_bites_suffered = Math.max(this.total_bites_suffered - time_step, 0);
        this.CenterX = this.Leader.backAttachX + radius * Math.cos(this.angle);
        this.CenterY = this.Leader.backAttachY + radius * Math.sin(this.angle);
        if (this.IsEatenByParasite) {
            this.fade_time_elapsed += time_step;
            if (this.fade_time_elapsed > CreatureDeathFadeTime) {
                this.head.wurmObject.pieceEatenByParasite(this);
            }
            //EatenByParasite(this, new EventArgs());
            this.Opacity = (CreatureDeathFadeTime - this.fade_time_elapsed) / CreatureDeathFadeTime;
        }
        super.Update(time_step);
    }
    get IsEatenByParasite() {
        return (this.total_bites_suffered >= ParasiteKillTime);
    }
    Available(care_about_dibs) {
        if (!care_about_dibs)
            throw new DOMException("something is wrong... everything that hunts wurm pieces cares about dibs");
        return (this.total_bites_suffered == 0);
    }
    ParasiteBite(timeStep) {
        this.total_bites_suffered += 2 * timeStep; //we will decrement them on update as well.            
    }
}
//export interface EatEventData extends EventArgs {
//    creatureEaten: Feeder;
//}
//# sourceMappingURL=wurmPieces.js.map