import { GameElement } from "./gameElement";
import { Rancher } from "./rancher";


export class GameControl {
    theRancher: Rancher;
    playingFieldWidth: number;
    playingFieldHeight: number;
    soundEffectsOn: boolean;
    numberOfGoodGrass: number;
    rancherAccuracy: number;
    shotsHit: number;
    shotsFired: number;
    //currentLevel: Level;
    weedRatio: number;

    game_running :boolean;

    elapsed_time : number;
    laser_cool_down_counter : number;

    GameElements : Array<GameElement>;
    DeadStuff : Array<GameElement>;
    NewStuff : Array<GameElement>;

    constructor(){
        //TODO
    }

    InitializeGameElements() :void{

    }

    GameLoopMethod():void{
        if (this.game_running)
        {
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
                this.GameControl.Add(element);
            });

            this.NewStuff = [];
        }
    }

    

}