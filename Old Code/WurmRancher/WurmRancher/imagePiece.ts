export class ImagePiece extends OnTheFieldPiece {
    PieceImage : HTMLImageElement;

    constructor(theControl_ : GameControl, height : number, width : number, img_scr: string){
        super(theControl_, height, width);
        this.PieceImage = new Image(img_scr);
    }
}