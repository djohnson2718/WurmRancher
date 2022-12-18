import { FirstGrassEaterLevel } from "./firstGrassEaterLevel.js";
import { Level } from "./level.js";
import { MonsterLevel } from "./monsterLevel.js";
import { Theme } from "./theme.js";

export var Levels : Array<Level>;

Levels = [
    new FirstGrassEaterLevel(new Theme()),
    new MonsterLevel(new Theme()),
    new FirstGrassEaterLevel(new Theme()),
    new FirstGrassEaterLevel(new Theme())
]