//import { AreaEffectCircle } from "../js/areaEffectCircle.js";
import { EdiblePlant } from "./ediblePlant.js";
import { Feeder } from "./feeder.js";
import { GameElement } from "./gameElement.js";
import { GoodGrass } from "./goodGrass.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";
import { ClosestPlantIndexX, ClosestPlantIndexY, Plant, PlantCenterPointFromIndex, plant_size } from "./plant.js";
import { Rancher } from "./rancher.js";
import * as timing from "./timing.js";
import { Wurm } from "./wurm.js";


 
var theRancher: Rancher;
const playingFieldWidth = 839;
const playingFieldHeight = 689;
const seedRange = 150;
const seedRadius = 50;
const sprayRange = 180;
const sprayRadius = 70;

var mouseX : number;
var mouseY : number;

//const SeedAoEC = new AreaEffectCircle(seedRadius);
//const SprayAoEC = new AreaEffectCircle(sprayRadius);

var Plants : Array<Array<Plant>> = new Array<Array<Plant>>();
const plant_rows = Math.floor(playingFieldHeight/plant_size)+1; //probs these are names wrong, but its ok
const plant_cols = Math.floor(playingFieldWidth/plant_size)+1;

//console.log(plant_rows);
for (var col = 0;  col < plant_cols; col ++){
    Plants[col] = new Array<Plant>();
    //console.log("here is plants", Plants);
}

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
    context.font = "14px sans";
    document.body.insertBefore(canvas, document.body.childNodes[0]);    

    GameElements = new Set<GameElement>();
    DeadStuff = new Set<GameElement>();
    NewStuff = new Set<GameElement>();

    theRancher = new Rancher();

    
    
    AddCreature(theRancher,100,100);
    AddCreature(new Feeder(),200,200);
    AddCreature(new Feeder(),200,200);
    AddCreature(new Feeder(),200,200);
    AddCreature(new Feeder(),200,200);
    AddCreature(new Feeder(),200,200);
    AddCreature(new Feeder(),200,200);
    AddCreature(new Feeder(),200,200);
    //GameElements.add(SeedAoEC);
    //GameElements.add(SprayAoEC);

    new Wurm(13,200,200);

    game_running = true;

    currentTool = ToolType.Seed;


    canvas.addEventListener('mousedown', MouseDown);
    canvas.addEventListener('mousemove', MouseMove);
    canvas.addEventListener('contextmenu', function (e){e.preventDefault();})

    setInterval(GameLoopMethod, 1000/timing.frames_per_sec);
    console.log("finished set up");

    
}

function InitializeGameElements() :void{
    
}

function GameLoopMethod():void{
    //console.log("entered loop" + String(game_running));
    context.clearRect(0,0,playingFieldWidth,playingFieldHeight);

    //console.log(GameElements);

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

        

        if (currentTool == ToolType.Seed)
        {
            //console.log([mouseX,mouseY], [theRancher.CenterX, theRancher.CenterY],Distance([mouseX,mouseY], [theRancher.CenterX, theRancher.CenterY]) );
            if (Distance([mouseX,mouseY], [theRancher.CenterX, theRancher.CenterY]) < seedRange){
                //console.log("drawing")
                context.beginPath();
                context.arc(mouseX,mouseY,seedRadius,0,2*Math.PI);
                context.stroke();
            }
        }

        for (const element of DeadStuff){
            GameElements.delete(element);
        }

        DeadStuff.clear();

        for (const element of NewStuff){
            GameElements.add(element);
        }

        NewStuff.clear();
    }
}

function MouseDown(e :MouseEvent){
    e.preventDefault();
    if (e.button == 0){ //left
        console.log("mouse clicked" + String(e.offsetX) + " " + String(e.offsetY));
        theRancher.SetDestination(e.offsetX,e.offsetY);
    }
    else if (e.button == 2)//right
    {
        

        //if seed selected
        if (DistanceClickToPiece(e, theRancher) > seedRange)
            return;
        //if (SoundEffectsOn)
        //    seeds_sown.Play();

        for (const I of PlantSpotsInRadius(e.offsetX, e.offsetY, seedRadius) )               
        {
            //console.log(I);
            //console.log(Plants[I[0]][I[1]]);
            //console.log(Plants);
            //console.log(Plants[I[0]]);
            if (typeof(Plants[I[0]][I[1]]) == "undefined")
            {
                //console.log("planting a plant at", I[0],I[1])
                Plants[I[0]][I[1]] = new GoodGrass(I[0],I[1]);
                NewStuff.add(Plants[I[0]][I[1]]);
            }
        }

    }
}

function DistanceClickToPiece(e:MouseEvent, p:OnTheFieldPiece):number{
    return Math.sqrt( (e.offsetX-p.CenterX)**2 + (e.offsetY-p.CenterY)**2 );
}

function Distance(p1: Array<number>, p2:Array<number>):number{
    return Math.sqrt( (p1[0]-p2[0])**2 + (p1[1] - p2[1])**2);
}

export function DistanceObjects(o1 : OnTheFieldPiece, o2 : OnTheFieldPiece){
    return Math.sqrt( (o1.CenterX-o2.CenterX)**2 + (o1.CenterY - o2.CenterY)**2);
}

function* PlantSpotsInRadius(x:number, y:number, radius :number) {
    let half_rect_width = Math.floor(radius/plant_size) + 1;
    let cplix = ClosestPlantIndexX(x,y);
    let cpliy = ClosestPlantIndexY(x,y);
    let fromx = Math.max(cplix-half_rect_width, 0);
    let tox = Math.min(cplix + half_rect_width, plant_cols-1);
    let fromy = Math.max(cpliy - half_rect_width, 0);
    let toy = Math.min(cpliy + half_rect_width, plant_rows-1);
    for (let i = fromx; i <= tox; i++)
        for (let j = fromy; j <= toy; j++)                    
            if (Distance(PlantCenterPointFromIndex(i,j), [x,y]) < radius)
                yield [i,j];
}



export function RandomXonField(){
    return Math.floor(Math.random()*playingFieldWidth);
}

export function RandomYonField(){
    return Math.floor(Math.random()*playingFieldHeight);
}


export function AddCreature(e:OnTheFieldPiece & GameElement, startX : number, startY : number):void{
    NewStuff.add(e);
    e.CenterX = startX;
    e.CenterY = startY;
} 

export function RemovePlant(p:Plant){
    Plants[p.indexX][p.indexY] = null;
    RemovePiece(p);
}

export function RemovePiece(p:GameElement){
    DeadStuff.add(p);
    //more clean up???
}

export function ReportGrassGrow(g: GoodGrass){
    //tell the level, maybe???
}

enum ToolType{
    Spray = "Spray",
    Seed = "Seed",
    Laser = "Laser"
}

var currentTool : ToolType;

function MouseMove(e){
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}

export function GetClosestEdiblePlant(to : OnTheFieldPiece): EdiblePlant{
    let closest_plant : EdiblePlant = null;
    let best_dist_so_far = 999999999;

    //may have optimization potential here
    for (let i = 0; i < plant_cols; i++)
        for (let j = 0; j < plant_rows; j++){
            console.log(Plants[i][j]);
            if (Plants[i][j] instanceof EdiblePlant)
            {
                console.log("found edible");
                let g = (Plants[i][j] as EdiblePlant);
                if (g.Available)
                {
                    let dist = DistanceObjects(to, g);
                    if (dist < best_dist_so_far)
                    {
                        best_dist_so_far = dist;
                        closest_plant = g;
                    }
                }
            }
        }
    console.log(closest_plant, best_dist_so_far);
    return closest_plant;
}

export function GetClosestFeeder(to: OnTheFieldPiece, care_about_dibs:boolean) : Feeder{
    let best_dist_so_far = 9999999;
    let closest : Feeder = null;
    let f : Feeder  = null;
    let cur_dist : number;
    for (const e of GameElements)
    {
        if (e instanceof Feeder)
        {
            f = (e as Feeder);
            if (f.Available(care_about_dibs))
            {
                cur_dist = DistanceObjects(f, to);
                if (cur_dist < best_dist_so_far)
                {
                    closest = f;
                    best_dist_so_far = cur_dist;
                }
            }
        }
    }
    return closest;
}
