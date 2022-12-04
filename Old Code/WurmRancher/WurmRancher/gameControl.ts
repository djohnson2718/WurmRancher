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

export var GameElements : Set<GameElement>;
export var DeadStuff : Set<GameElement>;
var NewStuff : Set<GameElement>;

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

    GameElements = new Set<GameElement>();
    DeadStuff = new Set<GameElement>();
    NewStuff = new Set<GameElement>();
    
    GameElements.add(theRancher);

    theRancher.Update();

    game_running = true;


    window.addEventListener('mousedown', MouseDown);

    setInterval(GameLoopMethod, 1000/timing.frames_per_sec);
    console.log("finished set up");
}

function InitializeGameElements() :void{
    
}

function GameLoopMethod():void{
    //console.log("entered loop" + String(game_running));
    context.clearRect(0,0,playingFieldWidth,playingFieldHeight);
    
    if (game_running)
    {
        //console.log("in the game running");
        this.elapsed_time++;
        if (this.laser_cool_down_counter > 0)
            this.laser_cool_down_counter--;

        //current_level.Update(this);

        for (const element of GameElements){
            //console.log("calling update" + String(element));
            element.Update();
        }

        for (const element of DeadStuff){
            GameElements.add(element);
        }

        DeadStuff.clear();

        for (const element of NewStuff){
            GameElements.delete(element);
        }

        NewStuff.clear();
    }
}

function MouseDown(e :MouseEvent){
    if (e.button == 0){ //left
        console.log("mouse clicked" + String(e.x) + " " + String(e.y));
        theRancher.SetDestination(e.x,e.y);
    }
}


