import { BigMonsterLevel } from "./bigMonsterLevel.js";
import { BigWurmContest } from "./bigWurmContest.js";
import { DoubleWurmLevel } from "./doubleWurmLevel.js";
import { FeederLevel } from "./feederLevel.js";
import { FirstGrassEaterLevel } from "./firstGrassEaterLevel.js";
import { MonsterLevel } from "./monsterLevel.js";
import { ParasiteLevel } from "./parasiteLevel.js";
import { PoisonWeedLevel } from "./poisonWeedLevel.js";
import { ProtectTheGrassLevel } from "./protectTheGrassLevel.js";
import { SharpShooterLevel } from "./sharpShooterLevel.js";
import { Cracked, Mud, Pebbles, RedPebbles, Sand, Snow } from "./theme.js";
import { WeedLevel } from "./weedLevel.js";
export var Levels;
Levels = [
    new FirstGrassEaterLevel(RedPebbles),
    new MonsterLevel(Pebbles),
    new WeedLevel(Snow),
    new ParasiteLevel(Cracked),
    new ProtectTheGrassLevel(Mud),
    new PoisonWeedLevel(Sand),
    new BigMonsterLevel(RedPebbles),
    new SharpShooterLevel(Pebbles),
    new DoubleWurmLevel(Snow),
    new FeederLevel(Cracked),
    new BigWurmContest(Mud)
];
//# sourceMappingURL=levels.js.map