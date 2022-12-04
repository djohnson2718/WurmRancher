import { Rancher } from "./rancher.js";
import * as timing from "./timing.js";
var theRancher;
const playingFieldWidth = 300;
const playingFieldHeight = 500;
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
    theRancher = new Rancher();
    GameElements = new Set();
    DeadStuff = new Set();
    NewStuff = new Set();
    GameElements.add(theRancher);
    theRancher.Update();
    game_running = true;
    setInterval(GameLoopMethod, 1000 / timing.frames_per_sec);
    console.log("finished set up");
}
function InitializeGameElements() {
}
function GameLoopMethod() {
    //console.log("entered loop" + String(game_running));
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
            GameElements.add(element);
        }
        DeadStuff.clear();
        for (const element of NewStuff) {
            GameElements.delete(element);
        }
        NewStuff.clear();
    }
}
//# sourceMappingURL=gameControl.js.map