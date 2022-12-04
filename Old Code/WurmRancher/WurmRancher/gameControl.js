import { Rancher } from "./rancher.js";
import * as timing from "./timing.js";
export class GameControl {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.height = 500;
        this.canvas.width = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.theRancher = new Rancher(this);
        this.GameElements = new Array();
        this.DeadStuff = new Array();
        this.NewStuff = new Array();
        this.GameElements.push(this.theRancher);
        this.game_running = true;
        setInterval(this.GameLoopMethod, 1000 / timing.frames_per_sec);
        console.log("finished set up");
    }
    InitializeGameElements() {
    }
    GameLoopMethod() {
        console.log("entered loop" + String(this.game_running));
        if (this.game_running) {
            console.log("in the game running");
            this.elapsed_time++;
            if (this.laser_cool_down_counter > 0)
                this.laser_cool_down_counter--;
            //current_level.Update(this);
            this.GameElements.forEach(function (element) {
                element.Update();
            });
            this.DeadStuff.forEach(function (element) {
                this.GameElements.Remove(element);
            });
            this.DeadStuff = [];
            this.NewStuff.forEach(function (element) {
                this.GameElements.push(element);
            });
            this.NewStuff = [];
        }
    }
}
var g;
function startGame() {
    console.log("hey, starting now");
    g = new GameControl();
}
document.addEventListener("DOMContentLoaded", startGame);
//# sourceMappingURL=gameControl.js.map