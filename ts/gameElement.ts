export interface GameElement {
    Update(time_step:number): void;
    Name:string;
    Layer:number;
}