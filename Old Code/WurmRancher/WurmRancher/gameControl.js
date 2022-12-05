import { Rancher } from "./rancher.js";
import * as timing from "./timing.js";
import { Wurm } from "./wurm.js";
var theRancher;
const playingFieldWidth = 839;
const playingFieldHeight = 689;
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