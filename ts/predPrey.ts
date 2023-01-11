import { EdiblePlant } from "./ediblePlant";
import { MovesToDestinationControl } from "./movesToDestinationControl";
import { OnTheFieldPiece } from "./OnTheFieldPiece";

export interface GrassChaser extends MovesToDestinationControl{
    PreyLost() :void;
    targetPlant :EdiblePlant;
}

export interface Predator extends MovesToDestinationControl{
    PreyLost():void;
    sightRange : number;
    target : OnTheFieldPiece;
}

export interface Prey<T extends Predator> extends OnTheFieldPiece{
    Available(chaser:T);
    DeclareChase(chaser:T);
}