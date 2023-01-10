import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { Predator } from "./prey.js";
import { monsterDieSound, monsterImage } from "./resources.js";
import { MonsterRotate, MonsterSpeed } from "./timing.js";
var height = 50;
var width = 50;
class _Monster extends LaserDestructablePiece {
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
export var Monster = Predator(_Monster);
//# sourceMappingURL=monster.js.map