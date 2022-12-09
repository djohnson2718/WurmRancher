import { AddCreature } from "./gameControl.js";
import { WurmBodyPiece, WurmHead } from "./wurmPieces.js";
const food_per_segment = 4;
export class Wurm {
    constructor(length, startX, startY) {
        this.food_eaten_since_growth = 0;
        this.length = length;
        this.head = new WurmHead();
        AddCreature(this.head, startX, startY);
        let w2 = new WurmBodyPiece(this.head, this.head);
        //parasite handler
        AddCreature(w2, startX, startY);
        for (let i = 0; i < length - 2; i++) {
            let w3 = new WurmBodyPiece(w2, this.head);
            //parasite handler
            AddCreature(w3, startX, startY);
            w2 = w3;
        }
        this.tail = w2;
        //head eats handler
    }
    get Length() {
        return this.length;
    }
}
;
//# sourceMappingURL=wurm.js.map