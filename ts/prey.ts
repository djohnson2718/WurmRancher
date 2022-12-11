import { OnTheFieldPiece } from "./OnTheFieldPiece";

export interface Prey extends OnTheFieldPiece{
    Available(care_about_dibs:boolean) : boolean;
}