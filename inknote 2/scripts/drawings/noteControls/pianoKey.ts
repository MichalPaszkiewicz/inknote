 module Inknote.Drawing{

     export enum PianoKeyColour {
         WHITE,
         BLACK,
         UNASSIGNED
     }

     function getKeyboardKeyFromNoteValue(val: Model.NoteValue): string {
         var key = "";

         switch (val) {
             case Model.NoteValue.A:
                 key = "h";
                 break;
             case Model.NoteValue.Bb:
                 key = "u";
                 break;
             case Model.NoteValue.B:
                 key = "j";
                 break;
             case Model.NoteValue.C:
                 key = "a";
                 break;
             case Model.NoteValue.Db:
                 key = "w";
                 break;
             case Model.NoteValue.D:
                 key = "s";
                 break;
             case Model.NoteValue.Eb:
                 key = "e";
                 break;
             case Model.NoteValue.E:
                 key = "d";
                 break;
             case Model.NoteValue.F:
                 key = "f";
                 break;
             case Model.NoteValue.Gb:
                 key = "t";
                 break;
             case Model.NoteValue.G:
                 key = "g";
                 break;
             case Model.NoteValue.Ab:
                 key = "y";
                 break;
         }

         return key.toUpperCase();
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

             // key text
             if (Managers.MachineManager.Instance.machineType == Managers.MachineType.Desktop) {
                 ctx.beginPath();
                 var text = getKeyboardKeyFromNoteValue(this.noteValue);
                 ctx.textAlign = "center";
                 ctx.font = (Math.min((this.width * 12 / 20), this.height / 4)) + "px Arial";
                 if (this.colour == PianoKeyColour.WHITE) {
                     ctx.fillStyle = Colours.black;
                 }
                 else {
                     ctx.fillStyle = Colours.white;
                 }
                 ctx.fillText(text, this.x + this.width / 2, this.y + this.height - 2);

             }
         }
     }

     export class WhiteKey extends PianoKey {
         colour = PianoKeyColour.WHITE;
     }

     export class BlackKey extends PianoKey {
         colour = PianoKeyColour.BLACK;
     }

 }