import { FirstGrassEaterLevel } from "./firstGrassEaterLevel.js";
import { GoodGrass } from "./goodGrass.js";
import { ClosestPlantIndexX, ClosestPlantIndexY, PlantCenterPointFromIndex, plant_size } from "./plant.js";
import { Rancher } from "./rancher.js";
import { Theme } from "./theme.js";
import * as timing from "./timing.js";
import { Weed } from "./weed.js";
var theRancher;
const playingFieldWidth = 839;
const playingFieldHeight = 689;
const seedRange = 150;
const seedRadius = 50;
const sprayRange = 180;
const sprayRadius = 70;
var mouseX;
var mouseY;
var Plants = new Array();
const plant_rows = Math.floor(playingFieldHeight / plant_size) + 1; //probs these are names wrong, but its ok
const plant_cols = Math.floor(playingFieldWidth / plant_size) + 1;
var soundEffectsOn;
var numberOfGoodGrass;
var rancherAccuracy;
var shotsHit;
var shotsFired;
var infoPar;
export var CurrentLevel;
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
    context.font = "14px sans";
    infoPar = document.getElementsByTagName("Info")[0];
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    theRancher = new Rancher();
    currentTool = ToolType.Seed;
    canvas.addEventListener('mousedown', MouseDown);
    canvas.addEventListener('mousemove', MouseMove);
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    setInterval(GameLoopMethod, 1000 / timing.frames_per_sec);
    console.log("finished set up");
    LoadLevel(new FirstGrassEaterLevel(new Theme()));
    currentTool = ToolType.Seed;
}
function GameLoopMethod() {
    //console.log("entered loop" + String(game_running));
    context.clearRect(0, 0, playingFieldWidth, playingFieldHeight);
    //console.log(GameElements);
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
        if (currentTool == ToolType.Seed) {
            //console.log([mouseX,mouseY], [theRancher.CenterX, theRancher.CenterY],Distance([mouseX,mouseY], [theRancher.CenterX, theRancher.CenterY]) );
            if (Distance([mouseX, mouseY], [theRancher.CenterX, theRancher.CenterY]) < seedRange) {
                //console.log("drawing")
                context.beginPath();
                context.arc(mouseX, mouseY, seedRadius, 0, 2 * Math.PI);
                context.stroke();
            }
        }
        GameElements = GameElements.filter(function (e) { return !DeadStuff.has(e); });
        DeadStuff.clear();
        for (const element of NewStuff) {
            GameElements.push(element);
        }
        if (NewStuff.size > 0)
            GameElements.sort(function (a, b) { return b.Layer - a.Layer; });
        NewStuff.clear();
    }
}
function MouseDown(e) {
    e.preventDefault();
    if (e.button == 2) { //right
        console.log("mouse clicked" + String(e.offsetX) + " " + String(e.offsetY));
        console.log(GameElements);
        theRancher.SetDestination(e.offsetX, e.offsetY);
    }
    else if (e.button == 0) //left
     {
        //if seed selected
        if (DistanceClickToPiece(e, theRancher) > seedRange)
            return;
        //if (SoundEffectsOn)
        //    seeds_sown.Play();
        for (const I of PlantSpotsInRadius(e.offsetX, e.offsetY, seedRadius)) {
            //console.log(I);
            //console.log(Plants[I[0]][I[1]]);
            //console.log(Plants);
            //console.log(Plants[I[0]]);
            if (Plants[I[0]][I[1]] == null) {
                //console.log("planting a plant at", I[0],I[1])
                Plants[I[0]][I[1]] = new GoodGrass(I[0], I[1]);
                NewStuff.add(Plants[I[0]][I[1]]);
            }
        }
    }
}
function DistanceClickToPiece(e, p) {
    return Math.sqrt(Math.pow((e.offsetX - p.CenterX), 2) + Math.pow((e.offsetY - p.CenterY), 2));
}
function Distance(p1, p2) {
    return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
}
export function DistanceObjects(o1, o2) {
    return Math.sqrt(Math.pow((o1.CenterX - o2.CenterX), 2) + Math.pow((o1.CenterY - o2.CenterY), 2));
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
export function AddCreatureOnEdge(e) {
    let p = RandomPointOnEdge();
    AddCreature(e, p[0], p[1]);
}
function RandomPointOnEdge() {
    if (Math.random() > playingFieldHeight / (playingFieldHeight + playingFieldWidth)) {
        //do it on the side
        if (Math.random() > .5)
            return [0, Math.random() * playingFieldHeight];
        else
            return [playingFieldWidth, Math.random() * playingFieldHeight];
    }
    else {
        //on the top/bottom
        if (Math.random() > .5)
            return [Math.random() * playingFieldWidth, 0];
        else
            return [Math.random() * playingFieldWidth, playingFieldHeight];
    }
}
export function RemovePlant(p) {
    Plants[p.indexX][p.indexY] = null;
    RemovePiece(p);
}
export function RemovePiece(p) {
    DeadStuff.add(p);
    //more clean up???
}
export function ReportGrassGrow(g) {
    //tell the level, maybe???
}
var ToolType;
(function (ToolType) {
    ToolType["Spray"] = "Spray";
    ToolType["Seed"] = "Seed";
    ToolType["Laser"] = "Laser";
})(ToolType || (ToolType = {}));
var currentTool;
function MouseMove(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}
export function GetClosestPlant(to, plantTypes) {
    let closest_plant = null;
    let best_dist_so_far = 999999999;
    //may have optimization potential here
    for (let i = 0; i < plant_cols; i++)
        for (let j = 0; j < plant_rows; j++) {
            if (!(Plants[i][j] === null))
                console.log(Plants[i][j], Plants[i][j].Name, plantTypes, plantTypes.includes(Plants[i][j].Name));
            if (!(Plants[i][j] === null) && plantTypes.includes(Plants[i][j].Name)) {
                console.log("found edible");
                let g = Plants[i][j];
                if (g.Available) {
                    let dist = DistanceObjects(to, g);
                    if (dist < best_dist_so_far) {
                        best_dist_so_far = dist;
                        closest_plant = g;
                    }
                }
            }
        }
    //console.log(closest_plant, best_dist_so_far);
    return closest_plant;
}
export function GetClosestPrey(to, care_about_dibs, preyName) {
    let best_dist_so_far = 9999999;
    let closest = null;
    let f = null;
    let cur_dist;
    //console.log("looking for prey");
    for (const e of GameElements) {
        //console.log(e, e.Name,e.Name==preyName);
        if (e.Name == preyName) {
            f = e;
            //console.log("available", f.Available(care_about_dibs));
            if (f.Available(care_about_dibs)) {
                //console.log("available!")
                cur_dist = DistanceObjects(f, to);
                if (cur_dist < best_dist_so_far) {
                    //console.log("new best");
                    closest = f;
                    best_dist_so_far = cur_dist;
                }
            }
        }
    }
    //console.log("found",closest);
    return closest;
}
export function ShowVictory(message) {
    infoPar.textContent = "Victory: " + message;
}
export function ShowDefeat(message) {
    infoPar.textContent = "Defeat: " + message;
}
export function ShowMessage(message) {
    infoPar.textContent = "Message: " + message;
}
export function AddCounter(c) {
    document.body.insertBefore(c.textbox, document.body.childNodes[0]);
}
export function GrowWeed(i, j) {
    if (i < 0 || j < 0 || i >= this.plant_cols || j >= this.plant_rows)
        return;
    if (Plants[i][j] === null) {
        Plants[i][j] = new Weed(i, j);
        NewStuff.add(Plants[i][j]);
    }
}
export function GrowPoisonWeed(i, j) {
    if (i < 0 || j < 0 || i >= this.plant_cols || j >= this.plant_rows)
        return;
    if (Plants[i][j] === null) {
        //Plants[i][j] = new PoisonWeed(this, i, j);
        NewStuff.add(Plants[i][j]);
    }
}
export function GrowRandomWeed() {
    GrowWeed(Math.floor(Math.random() * plant_cols), Math.floor(Math.random() * plant_rows));
}
export function GrowRandomPoisonWeed() {
    GrowPoisonWeed(Math.floor(Math.random() * plant_cols), Math.floor(Math.random() * plant_rows));
}
function LoadLevel(level) {
    //this.GameOverLabel.Visibility = Visibility.Collapsed;
    if (CurrentLevel != null)
        CurrentLevel.Quit();
    CurrentLevel = level;
    InitializeGameElements();
    level.InitializeLevel();
    //MainBackGroundMusicME.Stop();
    //MainBackGroundMusicME.Source = level.Theme.Music;
    //theCanvas.Background = level.Theme.Background;
    //this.GrassGrow = null;
    //this.QuickObjectives.Text = level.QuickObjectives;
    game_running = true;
}
//function ClearAll() : void
//{
//    GameElements = new Array<GameElement>();
//   currentTool = ToolType.Laser;
//   elapsed_time = 0;
//   laser_cool_down_counter = 0;
//CounterGrid.Children.Clear();
//}
function InitializeGameElements() {
    GameElements = new Array();
    DeadStuff = new Set();
    NewStuff = new Set();
    elapsed_time = 0;
    for (var col = 0; col < plant_cols; col++) {
        Plants[col] = new Array();
        for (var row = 0; row < plant_rows; row++)
            Plants[col][row] = null;
    }
    if (CurrentLevel.NoUserControl) {
        theRancher = null;
    }
    else {
        theRancher = new Rancher();
        AddCreature(theRancher, playingFieldWidth / 2, playingFieldHeight / 2);
        laser_cool_down_counter = 0;
        //reset tool?
        shotsFired = 0;
        shotsHit = 0;
    }
}
//# sourceMappingURL=gameControl.js.map