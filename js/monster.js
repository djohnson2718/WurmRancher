import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { PredatorImp } from "./prey.js";
import { monsterDieSound, monsterImage } from "./resources.js";
import { MonsterRotate, MonsterSpeed } from "./timing.js";
var height = 50;
var width = 50;
export class Monster extends LaserDestructablePiece {
    constructor() {
        super(height, width, MonsterSpeed, MonsterRotate);
        this.Name = "Monster";
        this.Layer = 5;
        this.LaserHitSound = monsterDieSound;
        this.sightRange = Number.MAX_VALUE;
        this.preyList = ["Feeder"];
        this.foodEaten = 0; //not used
        this.PieceImage = monsterImage;
    }
}
Object.assign(Monster.prototype, PredatorImp);
//# sourceMappingURL=monster.js.map