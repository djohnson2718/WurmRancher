import { EdiblePlant } from "./ediblePlant";
import { MovesToDestinationControl } from "./movesToDestinationControl";
import { OnTheFieldPiece } from "./OnTheFieldPiece";

export interface GrassChaser extends MovesToDestinationControl{
    PreyLost() :void;
    targetPlant :EdiblePlant;
}

export interface Predator extends OnTheFieldPiece{
    PreyLost():void;
    sightRange : number;
}

export interface Prey<T extends Predator> extends OnTheFieldPiece{
    Available(chaser:T);
}