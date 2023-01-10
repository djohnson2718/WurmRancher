import { Feeder } from "./feeder.js";
import { DistanceObjects, PlaySound, RandomXonField, RandomYonField } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { Predator, PredatorImp } from "./prey.js";
import { monsterDieSound, monsterEatSound, monsterImage } from "./resources.js";
import { MonsterRotate, MonsterSpeed } from "./timing.js";


var height = 50;
var width = 50;


export class Monster extends LaserDestructablePiece{
    Name = "Monster";
    Layer = 5;
    LaserHitSound = monsterDieSound;
    sightRange = Number.MAX_VALUE;
    preyList = ["Feeder"];
    foodEaten : number = 0; //not used

    constructor(){
        super(height,width,MonsterSpeed, MonsterRotate);
        this.PieceImage = monsterImage;
        
    }
}

export interface Monster extends Predator{}

Object.assign(Monster.prototype, PredatorImp);
