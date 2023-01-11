import { ImagePiece } from "./imagePiece.js";
export class MovesToDestinationControl extends ImagePiece {
    constructor(height, width, pixels_per_ms, radians_per_ms, angle = 0) {
        super(height, width, angle);
        //init rotate
        this.pixels_per_ms = pixels_per_ms;
        this.radians_per_ms = radians_per_ms;
        this.turn_diameter = pixels_per_ms * 2 / radians_per_ms;
        this.angle = 0;
        this.resting = true;
    }
    set FacingAngleDegrees(value) {
        this.angle = value / 180 * Math.PI;
        //this.rotate.Angle = value; //TODO
    }
    set Angle(value) {
        this.angle = value;
        //this.rotate.Angle = 0; //TODO
    }
    Update(time_step) {
        //console.log(this, "dest", this.destination_x, this.destination_y, "cent", this.CenterX,this.CenterY);
        if (!this.resting) {
            let distance = Math.sqrt(Math.pow(this.CenterY - this.destination_y, 2) + Math.pow(this.CenterX - this.destination_x, 2));
            //console.log("dist", distance);
            if (distance < this.pixels_per_ms * time_step) {
                this.resting = true;
                this.CenterX = this.destination_x;
                this.CenterY = this.destination_y;
                super.Update(time_step);
                return;
            }
            let target_angle = Math.atan2(this.CenterY - this.destination_y, this.CenterX - this.destination_x);
            if (target_angle < 0)
                target_angle += Math.PI * 2;
            let diff = target_angle - this.angle;
            if (Math.abs(diff) < this.radians_per_ms * time_step) {
                this.angle = target_angle;
                this.angle_aquired = true;
            }
            else if ((2 * Math.PI - this.angle) + target_angle < this.radians_per_ms * time_step) //target_angle < radians_per_frame &&
             {
                this.angle = target_angle;
                this.angle_aquired = true;
            }
            else if (diff >= Math.PI)
                this.angle -= this.radians_per_ms * time_step;
            else if (diff <= -Math.PI)
                this.angle += this.radians_per_ms * time_step;
            else if (diff > 0)
                this.angle += this.radians_per_ms * time_step;
            else if (diff < 0)
                this.angle -= this.radians_per_ms * time_step;
            if (this.angle < 0)
                this.angle += 2 * Math.PI;
            if (this.angle > 2 * Math.PI)
                this.angle -= 2 * Math.PI;
            if (this.angle_aquired || distance >= this.turn_diameter) {
                this.CenterX -= this.pixels_per_ms * time_step * Math.cos(this.angle);
                this.CenterY -= this.pixels_per_ms * time_step * Math.sin(this.angle);
            }
        }
        //this.rotate.Angle = this.angle * 180/Math.PI;
        //console.log("in moves to dest, about to call super");
        super.Update(time_step);
    }
    SetDestination(x, y) {
        this.destination_x = x;
        this.destination_y = y;
        this.resting = false;
        //removed this line because it probably doesn't do anything
        //target_angle = Math.Atan2(this.CenterY - y,this.CenterX - x);
        this.angle_aquired = false;
    }
}
//# sourceMappingURL=movesToDestinationControl.js.map