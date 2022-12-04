import { GameElement } from "./gameElement.js";
import { Rancher } from "./rancher.js";
import * as timing from "./timing.js";



var theRancher: Rancher;
const playingFieldWidth = 300;
const playingFieldHeight = 500;
var soundEffectsOn: boolean;
var numberOfGoodGrass: number;
var rancherAccuracy: number;
var shotsHit: number;
var shotsFired: number;
//currentLevel: Level;
var weedRatio: number;

var game_running :boolean;

var elapsed_time : number;
var laser_cool_down_counter : number;

export var GameElements : Array<GameElement>;
export var DeadStuff : Array<GameElement>;
var NewStuff : Array<GameElement>;

var canvas : HTMLCanvasElement;
export var context : CanvasRenderingContext2D | null;

document.addEventListener("DOMContentLoaded", startGame);

function startGame(){
    canvas =  document.createElement("canvas");
    canvas.height = playingFieldHeight;
    canvas.width = playingFieldWidth;
    context = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[0]);    

    theRancher = new Rancher();

    GameElements = new Array<GameElement>();
    DeadStuff = new Array<GameElement>();
    NewStuff = new Array<GameElement>();
    
    GameElements.push(theRancher);

    game_running = true;

    setInterval(GameLoopMethod, 1000/timing.frames_per_sec);
    console.log("finished set up");
}

function InitializeGameElements() :void{
    
}

function GameLoopMethod():void{
    console.log("entered loop" + String(this.game_running));
    if (this.game_running)
    {
        console.log("in the game running");
        this.elapsed_time++;
        if (this.laser_cool_down_counter > 0)
            this.laser_cool_down_counter--;

        //current_level.Update(this);

        this.GameElements.forEach(function(element){
            element.Update();
        })

        this.DeadStuff.forEach(function (element){
            this.GameElements.Remove(element);
        });

        this.DeadStuff =[];

        this.NewStuff.forEach(function(element){
            this.GameElements.push(element);
        });

        this.NewStuff = [];
    }
}




