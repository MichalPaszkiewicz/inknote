module Inknote.Drawing {

    export class NoteControlBackground implements IDrawable {

        ID = getID();
        x = 0;
        y = 500;
        width = 500;
        height = 100;
        order = 199;
        hover: boolean;
        select: boolean;

        isOver() {


            return false;
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            ctx.globalAlpha = 0.5;

            ctx.beginPath();

            ctx.fillStyle = Colours.black;
            ctx.strokeStyle = Colours.black;

            ctx.rect(this.x, this.y, this.width, this.height);

            ctx.fill();
            ctx.stroke();
            ctx.globalAlpha = 1;

            return true;
        }

        constructor() {

        }

    }


}