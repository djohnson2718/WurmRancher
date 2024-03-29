import { RemovePlant } from "./gameControl.js";
import { ImagePiece } from "./imagePiece.js";
import { SprayEffectivenessTime } from "./timing.js";
export const plant_size = 30;
export class Plant extends ImagePiece {
    constructor(indexX, indexY) {
        super(plant_size, plant_size, 0);
        this.sprayed = false;
        this.time_since_spray = 0;
        this.Layer = 10;
        this.indexX = indexX;
        this.indexY = indexY;
        this.x = indexX * plant_size;
        this.y = indexY * plant_size;
    }
    Update(time_step) {
        //console.log("updating plant");
        if (this.sprayed)
            this.time_since_spray += time_step;
        if (this.time_since_spray >= SprayEffectivenessTime)
            RemovePlant(this);
        super.Update(time_step);
    }
    Spray() {
        console.log("plant sprayed", this);
        this.sprayed = true;
        this.PieceImage = this.SprayedPic;
    }
}
export function ClosestPlantIndexX(x, y) {
    return Math.floor(x / plant_size);
}
export function ClosestPlantIndexY(x, y) {
    return Math.floor(y / plant_size);
}
export function PlantCenterPointFromIndex(i, j) {
    return [plant_size * i + plant_size / 2, plant_size * j + plant_size / 2];
}
//# sourceMappingURL=plant.js.map