module Inknote.Drawing {

    export class TimeSignature extends Notation {

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.fillStyle = Colours.black;
            if (this.hover || this.select) {
                ctx.fillStyle = Colours.orange;
            }
            ctx.font = Fonts.halfHeight;
            ctx.textAlign = "center";
            ctx.fillText(this.top + "", this.x, this.y);
            ctx.fillText(this.bottom + "", this.x, this.y + 20);
            if (this.select) {
                ctx.beginPath();
                ctx.strokeStyle = Colours.orange;
                ctx.rect(this.x - 15, this.y - 25, 30, 50);
                ctx.stroke();
            }

            return true;
        }

        constructor(public top: number, public bottom: number) {

            super();

        }

    }

} 