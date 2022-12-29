import { FirstGrassEaterLevel } from "./firstGrassEaterLevel.js";
import { MonsterLevel } from "./monsterLevel.js";
import { ParasiteLevel } from "./parasiteLevel.js";
import { Cracked, Pebbles, RedPebbles, Snow } from "./theme.js";
import { WeedLevel } from "./weedLevel.js";
export var Levels;
Levels = [
    new FirstGrassEaterLevel(RedPebbles),
    new MonsterLevel(Pebbles),
    new WeedLevel(Snow),
    new ParasiteLevel(Cracked)
];
//# sourceMappingURL=levels.js.map