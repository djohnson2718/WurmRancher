import { Rancher } from "./rancher.js";
import * as timing from "./timing.js";
import { Wurm } from "./wurm.js";
var theRancher;
const playingFieldWidth = 839;
const playingFieldHeight = 689;
const seedRange = 150;
const seedRadius = 50;
var Plants;
var soundEffectsOn;
var numberOfGoodGrass;
var rancherAccuracy;
var shotsHit;
var shotsFired;
//currentLevel: Level;
var weedRatio;
var game_running;
var elapsed_time;
var laser_cool_down_counter;
export var GameElements;
export var DeadStuff;
var NewStuff;
var canvas;
export var context;
document.addEventListener("DOMContentLoaded", startGame);
function startGame() {
    canvas = document.createElement("canvas");
    canvas.height = playingFieldHeight;
    canvas.width = playingFieldWidth;
    context = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    GameElements = new Set();
    DeadStuff = new Set();
    NewStuff = new Set();
    theRancher = new Rancher();
    AddCreature(theRancher, 100, 100);
    new Wurm(13, 200, 200);
    game_running = true;
    canvas.addEventListener('mousedown', MouseDown);
    setInterval(GameLoopMethod, 1000 / timing.frames_per_sec);
    console.log("finished set up");
}
function InitializeGameElements() {
}
function GameLoopMethod() {
    //console.log("entered loop" + String(game_running));
    context.clearRect(0, 0, playingFieldWidth, playingFieldHeight);
    if (game_running) {
        //console.log("in the game running");
        this.elapsed_time++;
        if (this.laser_cool_down_counter > 0)
            this.laser_cool_down_counter--;
        //current_level.Update(this);
        for (const element of GameElements) {
            //console.log("calling update" + String(element));
            element.Update();
        }
        for (const element of DeadStuff) {
            GameElements.delete(element);
        }
        DeadStuff.clear();
        for (const element of NewStuff) {
            GameElements.add(element);
        }
        NewStuff.clear();
    }
}
function MouseDown(e) {
    if (e.button == 0) { //left
        console.log("mouse clicked" + String(e.offsetX) + " " + String(e.offsetY));
        theRancher.SetDestination(e.offsetX, e.offsetY);
    }
    else if (e.button == 2) //right
     {
        e.preventDefault();
        //if seed selected
        if (DistanceClickToPiece(e, theRancher) > seedRange)
            return;
        //if (SoundEffectsOn)
        //    seeds_sown.Play();
        for (const I of PlantSpotsInRadius(e.offsetX, e.offsetY, seedRadius)) {
            if (Plants[I[0]][I[1]] == null) {
                Plants[I[0]][I[1]] = new GoodGrass(this, I[0], I[1]);
                GameElements.add(Plants[I[0], I[1]]);
            }
        }
    }
}
function DistanceClickToPiece(e, p) {
    return Math.sqrt((e.offsetX - p.CenterX) ^ 2 + (e.offsetY - p.CenterY) ^ 2);
}
function Distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) ^ 2 + (p1[1] - p2[1]) ^ 2);
}
function* PlantSpotsInRadius(x, y, radius) {
    let half_rect_width = Math.floor(radius / plant_size) + 1;
    let cplix = ClosestPlantIndexX(x, y);
    let cpliy = ClosestPlantIndexY(x, y);
    let fromx = Math.max(cplix - half_rect_width, 0);
    let tox = Math.min(cplix + half_rect_width, plant_cols - 1);
    let fromy = Math.max(cpliy - half_rect_width, 0);
    let toy = Math.min(cpliy + half_rect_width, plant_rows - 1);
    for (let i = fromx; i <= tox; i++)
        for (let j = fromy; j <= toy; j++)
            if (Distance(PlantCenterPointFromIndex(i, j), [x, y]) < radius)
                yield [i, j];
}
export function RandomXonField() {
    return Math.floor(Math.random() * playingFieldWidth);
}
export function RandomYonField() {
    return Math.floor(Math.random() * playingFieldHeight);
}
export function AddCreature(e, startX, startY) {
    NewStuff.add(e);
    e.CenterX = startX;
    e.CenterY = startY;
}
//# sourceMappingURL=gameControl.js.map