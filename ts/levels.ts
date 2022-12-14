import { FirstGrassEaterLevel } from "./firstGrassEaterLevel.js";
import { Level } from "./level.js";
import { Theme } from "./theme.js";

export var Levels : Array<Level>;

Levels = [
    new FirstGrassEaterLevel(new Theme()),
    new FirstGrassEaterLevel(new Theme()),
    new FirstGrassEaterLevel(new Theme())
]