module Inknote.Drawing {

    export class DrawText extends Notation {

        content: string;

        draw(ctx: CanvasRenderingContext2D) {

            ctx.fillStyle = Colours.black;
            ctx.font = Fonts.small;

            ctx.beginPath();
            ctx.fillText(this.content, this.x, this.y);

            return true;
        }
         
    }

} 