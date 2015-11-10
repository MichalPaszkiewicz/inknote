module Inknote.Drawing {

    export class DrawText extends Notation {

        content: string;

        font: string;

        draw(ctx: CanvasRenderingContext2D) {

            ctx.fillStyle = Colours.black;
            if (this.select) {
                ctx.fillStyle = Colours.orange;
            }
            ctx.font = Fonts.small;

            if (this.font != null && this.font != "") {
                ctx.font = this.font;
            } 

            ctx.beginPath();
            ctx.fillText(this.content, this.x, this.y);

            return true;
        }
         
    }

} 