import { FirstGrassEaterLevel } from "./firstGrassEaterLevel.js";
import { Level } from "./level.js";
import { MonsterLevel } from "./monsterLevel.js";
import { ParasiteLevel } from "./parasiteLevel.js";
import { Cracked, Pebbles, RedPebbles, Snow, Theme } from "./theme.js";
import { WeedLevel } from "./weedLevel.js";

export var Levels : Array<Level>;

Levels = [
    new FirstGrassEaterLevel(RedPebbles),
    new MonsterLevel(Pebbles),
    new WeedLevel(Snow),
    new ParasiteLevel(Cracked)
]