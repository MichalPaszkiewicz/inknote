 module Inknote.Drawing{

     export enum PianoKeyColour {
         WHITE,
         BLACK,
         UNASSIGNED
     }

     export class PianoKey {
         
         isOver(x: number, y: number): boolean {

             var isRight = x > this.x;
             var isLeft = x < this.x + this.width;
             var isBelow = y > this.y;
             var isAbove = y < this.y + this.height;

             return isRight && isLeft && isBelow && isAbove;

         }

         colour: PianoKeyColour = PianoKeyColour.UNASSIGNED;

         hover: boolean = false;

         constructor(
             public x: number,
             public y: number,
             public width: number,
             public height: number,
             public noteValue: Model.NoteValue) {

         }

         draw(ctx: CanvasRenderingContext2D) {

             ctx.beginPath();
             ctx.fillStyle = Colours.white;
             ctx.strokeStyle = Colours.black;

             if (this.colour == PianoKeyColour.BLACK) {
                 ctx.fillStyle = Colours.black;
             }

             if (this.hover == true) {
                 ctx.fillStyle = Colours.orange;
             }

             ctx.rect(this.x, this.y, this.width, this.height);
             ctx.fill();
             ctx.stroke();
         }
     }

     export class WhiteKey extends PianoKey {
         colour = PianoKeyColour.WHITE;
     }

     export class BlackKey extends PianoKey {
         colour = PianoKeyColour.BLACK;
     }

 }