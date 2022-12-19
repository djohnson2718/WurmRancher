import { BlazeOn, InCircles, IntroScreenBackground, RockX, SandPebblesBrownBackground, SandPebblesRedBackground, SnowBackground, SoilBeachBackground, SoilCrackedBackground, SoilMudBackground } from "./resources.js";

export class Theme{
    background : HTMLImageElement;
    music : HTMLAudioElement;

    constructor( music:HTMLAudioElement, background : HTMLImageElement,){
        this.background = background;
        this.music = music;
    }
    
}
export const Mud =new Theme(RockX, SoilMudBackground);
export const Cracked = new Theme(InCircles, SoilCrackedBackground);
export const Sand = new Theme(BlazeOn,SoilBeachBackground);
export const RedPebbles = new Theme(RockX, SandPebblesRedBackground);
export const Pebbles = new Theme(InCircles, SandPebblesBrownBackground);
export const Snow = new Theme(BlazeOn, SnowBackground);
export const Intro = new Theme(BlazeOn, IntroScreenBackground);