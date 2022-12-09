import { MovesToDestinationControl } from "./movesToDestinationControl.js";

export class Feeder extends MovesToDestinationControl //implements Prey
{
    max_size: number;
    eaten: boolean;
    size: number;
    feederSize: number;
    dibs: number;

    Dibs() :void{
        this.dibs = 10;
    }

}