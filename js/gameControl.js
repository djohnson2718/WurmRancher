import { GoodGrass } from "./goodGrass.js";
import { IntroDemo } from "./introDemo.js";
import { LaserBeam } from "./laserBeam.js";
import { Levels } from "./levels.js";
import { ClosestPlantIndexX, ClosestPlantIndexY, PlantCenterPointFromIndex, plant_size } from "./plant.js";
import { PoisonWeed } from "./poisonWeed.js";
import { Rancher } from "./rancher.js";
import { laserSound } from "./resources.js";
import { Weed } from "./weed.js";
var theRancher;
const playingFieldWidth = 839;
const playingFieldHeight = 689;
const seedRange = 150;
const seedRadius = 50;
const sprayRange = 180;
const sprayRadius = 70;
const laserRange = 160;
var mouseX;
var mouseY;
var Plants = new Array();
const plant_rows = Math.floor(playingFieldHeight / plant_size) + 1; //probs these are names wrong, but its ok
const plant_cols = Math.floor(playingFieldWidth / plant_size) + 1;
var soundEffectsOn = true;
var numberOfGoodGrass;
var rancherAccuracy;
var shotsHit;
var shotsFired;
var infoPar;
var seedPar;
var sprayPar;
var laserPar;
export var CurrentLevel;
var weedRatio;
export var game_running;
//var elapsed_time : number;
var laser_cool_down_counter;
export var GameElements;
export var DeadStuff;
var NewStuff;
var NewLaserHitables;
var LaserHitables;
var DeadLaserHitables;
var LevelSelectDiv;
var LevelSelectButton;
var LevelSelectMenu;
var SideContainer;
var CounterContainer;
var canvas;
export var context;
document.addEventListener("DOMContentLoaded", startGame);
function startGame() {
    canvas = document.getElementById("playingField");
    canvas.height = playingFieldHeight;
    canvas.width = playingFieldWidth;
    context = canvas.getContext("2d");
    context.font = "14px sans";
    infoPar = document.getElementById("Info");
    seedPar = document.getElementById("seed");
    sprayPar = document.getElementById("spray");
    laserPar = document.getElementById("laser");
    LevelSelectDiv = document.getElementById("levelSelectDiv");
    LevelSelectButton = document.getElementById("levelSelect");
    LevelSelectMenu = document.getElementById("levelSelectMenu");
    SideContainer = document.getElementById("side");
    CounterContainer = document.getElementById("counter-area");
    for (const Level of Levels) {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.addEventListener("click", LevelButtonClicked(Level));
        button.textContent = Level.Name;
        let text = document.createTextNode(Level.Description);
        li.appendChild(button);
        li.appendChild(text);
        LevelSelectMenu.appendChild(li);
    }
    //document.body.insertBefore(canvas, document.body.childNodes[0]);    
    theRancher = new Rancher();
    SetToolSeed();
    canvas.addEventListener('mousedown', MouseDown);
    canvas.addEventListener('mousemove', MouseMove);
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    LevelSelectButton.addEventListener("click", SelectLevel);
    window.addEventListener('keydown', KeyPress);
    //setInterval(GameLoopMethod, 1000/timing.frames_per_sec);
    console.log("finished set up");
    LoadLevel(new IntroDemo()); //chagne to intro
}
var previousTimeStamp;
function GameLoopMethod(timestamp) {
    //console.log(timestamp, Date.now());
    if (game_running) {
        let timeStep;
        if (previousTimeStamp)
            timeStep = timestamp - previousTimeStamp;
        else
            timeStep = 0;
        console.log("Frame time", timeStep);
        previousTimeStamp = timestamp;
        context.drawImage(CurrentLevel.theme.background, 0, 0, playingFieldWidth, playingFieldHeight);
        //context.clearRect(0,0,playingFieldWidth,playingFieldHeight);
        //console.log("in the game running");
        //this.elapsed_time++;
        if (laser_cool_down_counter > 0)
            laser_cool_down_counter = Math.min(0, laser_cool_down_counter - timeStep);
        CurrentLevel.Update(timeStep);
        for (const element of GameElements) {
            //console.log("calling update" + String(element));
            //console.log(element);
            element.Update(timeStep);
        }
        for (const element of NewStuff) {
            GameElements.push(element);
        }
        if (NewStuff.size > 0) {
            GameElements.sort(function (a, b) { return b.Layer - a.Layer; });
            NewStuff.clear();
        }
        if (CurrentLevel.NoUserControl) {
            window.requestAnimationFrame(GameLoopMethod);
            return;
        }
        switch (currentTool) {
            case (ToolType.Seed):
                if (Distance([mouseX, mouseY], [theRancher.CenterX, theRancher.CenterY]) < seedRange) {
                    //console.log("drawing")
                    context.beginPath();
                    context.arc(mouseX, mouseY, seedRadius, 0, 2 * Math.PI);
                    context.stroke();
                }
                context.beginPath();
                context.arc(theRancher.CenterX, theRancher.CenterY, seedRange, 0, 2 * Math.PI);
                context.stroke();
                break;
            case ToolType.Laser:
                context.beginPath();
                context.arc(theRancher.CenterX, theRancher.CenterY, laserRange, 0, 2 * Math.PI);
                context.stroke();
                break;
            case ToolType.Spray:
                if (Distance([mouseX, mouseY], [theRancher.CenterX, theRancher.CenterY]) < sprayRange) {
                    //console.log("drawing")
                    context.beginPath();
                    context.arc(mouseX, mouseY, sprayRadius, 0, 2 * Math.PI);
                    context.stroke();
                }
                context.beginPath();
                context.arc(theRancher.CenterX, theRancher.CenterY, sprayRange, 0, 2 * Math.PI);
                context.stroke();
        }
        GameElements = GameElements.filter(function (e) { return !DeadStuff.has(e); });
        DeadStuff.clear();
        LaserHitables = LaserHitables.filter(function (e) { return !DeadLaserHitables.has(e); });
        DeadLaserHitables.clear();
        for (const element of NewLaserHitables)
            LaserHitables.push(element);
        NewLaserHitables.clear();
        window.requestAnimationFrame(GameLoopMethod);
    }
}
function MouseDown(e) {
    if (!game_running)
        return;
    e.preventDefault();
    if (e.button == 2) { //right
        console.log("mouse clicked" + String(e.offsetX) + " " + String(e.offsetY));
        //console.log(GameElements);
        theRancher.SetDestination(e.offsetX, e.offsetY);
    }
    else if (e.button == 0) //left
     {
        switch (currentTool) {
            case ToolType.Seed:
                if (DistanceClickToPiece(e, theRancher) > seedRange)
                    return;
                //if (SoundEffectsOn)
                //    seeds_sown.Play();
                for (const I of PlantSpotsInRadius(e.offsetX, e.offsetY, seedRadius)) {
                    if (Plants[I[0]][I[1]] == null) {
                        //console.log("planting a plant at", I[0],I[1])
                        Plants[I[0]][I[1]] = new GoodGrass(I[0], I[1]);
                        NewStuff.add(Plants[I[0]][I[1]]);
                    }
                }
                break;
            case ToolType.Laser:
                if (DistanceClickToPiece(e, theRancher) > laserRange)
                    return;
                NewStuff.add(new LaserBeam(theRancher.CenterX, theRancher.CenterY, e.offsetX, e.offsetY));
                PlaySound(laserSound);
                for (let ldp of LaserHitables) {
                    //console.log("check laser hits")
                    ldp.CheckLaserHit(e.offsetX, e.offsetY);
                }
                break;
            case ToolType.Spray:
                if (DistanceClickToPiece(e, theRancher) > sprayRange)
                    return;
                //play sound
                console.log("starting spray");
                for (const I of PlantSpotsInRadius(e.offsetX, e.offsetY, sprayRadius)) {
                    if (Plants[I[0]][I[1]] != null) {
                        console.log("spraying plant at", I);
                        Plants[I[0]][I[1]].Spray();
                    }
                }
                break;
        }
    }
}
function KeyPress(e) {
    console.log(e.key);
    switch (e.key) {
        case "z":
            SetToolLaser();
            break;
        case "x":
            SetToolSpray();
            break;
        case "c":
            SetToolSeed();
            break;
    }
}
function SetToolLaser() {
    currentTool = ToolType.Laser;
    laserPar.setAttribute("style", "background-color:powderblue;");
    seedPar.setAttribute("style", "background-color:white;");
    sprayPar.setAttribute("style", "background-color:white;");
}
function SetToolSeed() {
    //console.log("seeting seed");
    //console.log(seedPar);
    //console.log(currentTool);
    currentTool = ToolType.Seed;
    seedPar.setAttribute("style", "background-color:powderblue;");
    laserPar.setAttribute("style", "background-color:white;");
    sprayPar.setAttribute("style", "background-color:white;");
}
function SetToolSpray() {
    //console.log("seeting spray");
    currentTool = ToolType.Spray;
    sprayPar.setAttribute("style", "background-color:powderblue;");
    seedPar.setAttribute("style", "background-color:white;");
    laserPar.setAttribute("style", "background-color:white;");
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
    //console.log("adding creatrue", e);
    NewStuff.add(e);
    if ("CheckLaserHit" in e)
        NewLaserHitables.add(e);
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
    if ("CheckLaserHit" in p)
        DeadLaserHitables.add(p);
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
            if (!(Plants[i][j] === null) && plantTypes.includes(Plants[i][j].Name)) {
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
export function ReportVictory(message) {
    infoPar.textContent = "Victory: " + message;
    game_running = false;
}
export function ReportDefeat(message) {
    infoPar.textContent = "Defeat: " + message;
    game_running = false;
}
export function ShowMessage(message) {
    infoPar.textContent = "Message: " + message;
}
export function AddCounter(c) {
    CounterContainer.appendChild(c.textbox);
    GameElements.push(c);
    //document.body.insertBefore(c.textbox, document.body.childNodes[0]);
}
export function GrowWeed(i, j) {
    if (i < 0 || j < 0 || i >= plant_cols || j >= plant_rows)
        return;
    if (Plants[i][j] === null) {
        Plants[i][j] = new Weed(i, j);
        NewStuff.add(Plants[i][j]);
    }
}
export function GrowPoisonWeed(i, j) {
    if (i < 0 || j < 0 || i >= plant_cols || j >= plant_rows)
        return;
    if (Plants[i][j] === null) {
        Plants[i][j] = new PoisonWeed(i, j);
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
    if (CurrentLevel)
        CurrentLevel.theme.music.pause();
    CurrentLevel = level;
    InitializeGameElements();
    level.InitializeLevel();
    console.log("fininish level.init ", GameElements.length);
    level.theme.music.play();
    //canvas.setAttribute("backgroundImsage", level.theme.background);
    //MainBackGroundMusicME.Stop();
    //MainBackGroundMusicME.Source = level.Theme.Music;
    //theCanvas.Background = level.Theme.Background;
    //this.GrassGrow = null;
    //this.QuickObjectives.Text = level.QuickObjectives;
    game_running = true;
    CloseLevelMenu();
    window.requestAnimationFrame(GameLoopMethod);
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
    LaserHitables = new Array();
    DeadLaserHitables = new Set();
    NewLaserHitables = new Set();
    while (CounterContainer.firstChild) {
        CounterContainer.removeChild(CounterContainer.firstChild);
    }
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
function CloseLevelMenu() {
    LevelSelectButton.textContent = "Select Level";
    LevelSelectDiv.style.visibility = "hidden";
}
function SelectLevel(ev) {
    console.log("select level clicked");
    if (LevelSelectDiv.style.visibility == "hidden") {
        game_running = false;
        LevelSelectDiv.style.visibility = "visible";
        LevelSelectButton.textContent = "Resume";
    }
    else {
        game_running = !CurrentLevel.gameover;
        CloseLevelMenu();
        if (game_running) {
            previousTimeStamp = null;
            window.requestAnimationFrame(GameLoopMethod);
        }
    }
}
function LevelButtonClicked(Level) {
    return function (ev) {
        LoadLevel(Level);
    };
}
export function PlaySound(sound) {
    if (soundEffectsOn) {
        sound.play();
    }
}
export function WeedRatio() {
    let count = 0;
    for (let i = 0; i < plant_cols; i++)
        for (let j = 0; j < plant_rows; j++)
            if (!(Plants[i][j] === null) && Plants[i][j].Name == "Weed")
                count += 1;
    return count / plant_cols / plant_rows;
}
export function FillWithGrass() {
    for (var col = 0; col < plant_cols; col++)
        for (var row = 0; row < plant_rows; row++) {
            Plants[col][row] = new GoodGrass(col, row, true);
            NewStuff.add(Plants[col][row]);
        }
}
export function HasGoodGrass() {
    for (var col = 0; col < plant_cols; col++)
        for (var row = 0; row < plant_rows; row++)
            if (!(Plants[col][row] === null) && Plants[col][row].Name == "GoodGrass")
                return true;
    return false;
}
//# sourceMappingURL=gameControl.js.map