module Inknote.Drawing {

    export class LedgerLine extends Notation {

        order = 45;

        draw(ctx: CanvasRenderingContext2D):boolean {
            ctx.beginPath;

            ctx.lineWidth = 1;

            ctx.strokeStyle = Colours.black;

            if (this.hover || this.select) {
                ctx.strokeStyle = Colours.orange;
            }

            ctx.moveTo(this.x - 10, this.y);
            ctx.lineTo(this.x + 10, this.y);

            ctx.stroke();

            return true;
        }

        constructor(x: number, y: number) {
            super();
            this.x = x;
            this.y = y;
        }

    }

} 