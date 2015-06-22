module Inknote.Drawing {

    export class Stave implements IDrawable{

        order = 10;
        ID = getID();
        hover: boolean;
        select: boolean;
        x: number;

        isOver(x: number, y: number) {
            return false;
        }

        constructor(public y: number) {


        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            
            for (var i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.strokeStyle = Colours.black;
                ctx.moveTo(30, this.y + 10 * i);
                ctx.lineTo(canvas.width - 30, this.y + 10 * i);
                ctx.stroke();
            }
            
            return true;
        }

    }

} 