import { DestroyGoodThings, GrowWeedAtPoint, RandomXonField, RandomYonField, RemovePiece } from "./gameControl";
import { LaserHitable } from "./laserHitable.js";
import { big_monsterImage } from "./resources";
import { BigMonsterRotate, BigMonsterSpeed, BigMonsterStompTime, BigMonsterWeedSpawnTime, CreatureDeathFadeTime } from "./timing";
const height = 90;
const width = 90;
const trample_radius = (Math.sqrt(2) * height / 2 * .8);
export class BigMonster extends LaserHitable {
    constructor() {
        super(height, height, BigMonsterSpeed, BigMonsterRotate);
        this.Layer = 3;
        this.Name = "BigMonster";
        this.eyesShot = [false, false, false];
        this.tantrum_counter = 0;
        this.fading = false;
        this.fade_time_elapsed = 0;
        this.monster_counter = 0;
        this.PieceImage = big_monsterImage;
    }
    get EyesLeft() {
        let count = 0;
        for (let i = 0; i < 3; i++)
            if (!this.eyesShot[i])
                count++;
        return count;
    }
    Update(timeStep) {
        if (this.fading) {
            this.fade_time_elapsed++;
            if (this.fade_time_elapsed > CreatureDeathFadeTime)
                RemovePiece(this);
            this.Opacity = (CreatureDeathFadeTime - this.fade_time_elapsed) / CreatureDeathFadeTime;
        }
        else {
            if (this.tantrum_counter > 0) {
                this.tantrum_counter = Math.max(0, this.tantrum_counter - timeStep);
                if (this.tantrum_counter == 0) {
                    this.pixels_per_ms = BigMonsterSpeed;
                    this.radians_per_ms = BigMonsterRotate;
                }
                if (Math.random() * timeStep / 33 < .1)
                    this.SetDestination(RandomXonField(), RandomYonField());
            }
            if (this.resting)
                this.SetDestination(RandomXonField(), RandomYonField());
            this.monster_counter += timeStep;
            if (this.monster_counter % BigMonsterStompTime < timeStep)
                DestroyGoodThings(this.CenterX, this.CenterY, trample_radius);
            if (this.monster_counter % BigMonsterWeedSpawnTime < timeStep)
                GrowWeedAtPoint(this.CenterX, this.CenterY);
            super.Update(timeStep);
            // draw eyes
        }
    }
    CheckLaserHit(x, y) {
    }
}
//# sourceMappingURL=bigMonster.js.map