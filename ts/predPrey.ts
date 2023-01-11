import { EdiblePlant } from "./ediblePlant";
import { MovesToDestinationControl } from "./movesToDestinationControl";

export interface GrassChaser extends MovesToDestinationControl{
    PreyLost() :void;
    targetPlant :EdiblePlant;
}