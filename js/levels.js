import { FirstGrassEaterLevel } from "./firstGrassEaterLevel.js";
import { MonsterLevel } from "./monsterLevel.js";
import { ParasiteLevel } from "./parasiteLevel.js";
import { ProtectTheGrassLevel } from "./protectTheGrassLevel.js";
import { Cracked, Mud, Pebbles, RedPebbles, Snow } from "./theme.js";
import { WeedLevel } from "./weedLevel.js";
export var Levels;
Levels = [
    new FirstGrassEaterLevel(RedPebbles),
    new MonsterLevel(Pebbles),
    new WeedLevel(Snow),
    new ParasiteLevel(Cracked),
    new ProtectTheGrassLevel(Mud)
];
//# sourceMappingURL=levels.js.map