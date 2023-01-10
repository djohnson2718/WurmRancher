//import { relWurmHeadRotate } from "./timing.js";
import {AddCreature, RemovePiece} from "./gameControl.js";
import {BackAttachable, WurmBodyPiece, WurmHead} from "./wurmPieces.js";

export const food_per_segment = 4;

export class Wurm {
    length: number;
    head : WurmHead;
    tail : BackAttachable;

    food_eaten_since_growth : number =0;

    constructor(length:number, startX:number, startY:number){
        this.length=length;
        this.head = new WurmHead(this);
        AddCreature(this.head, startX, startY);

        let w2 = new WurmBodyPiece(this.head,this.head);
        //parasite handler
        AddCreature(w2, startX, startY);

        for (let  i = 0; i < length-2; i++){
            let w3 = new WurmBodyPiece(w2, this.head);
            //parasite handler
            AddCreature(w3, startX, startY);
            w2 = w3;
        }
        this.tail = w2;
        //head eats handler
    }

    get Length() :number{
        return this.length;
    }

    pieceEatenByParasite(w:WurmBodyPiece){
        if (w.Follower != null)
        {
            w.Follower.Leader = w.Leader;
        }
        if (w == this.tail)
            this.tail = w.Leader;

        RemovePiece(w);
        this.length--;
    }

    Grow(){
        let wp = new WurmBodyPiece(this.tail, this.head);
        AddCreature(wp, this.tail.backAttachX, this.tail.backAttachY);
        this.tail = wp;
        this.length++;
    }
    
}