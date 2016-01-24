module Inknote.Drawing {

    function drawNatural(ctx: CanvasRenderingContext2D, x: number, y: number, lineHeight: number) {

        ctx.beginPath();

        // up strokes
        ctx.moveTo(x - lineHeight / 4, y + lineHeight * 3 / 4);
        ctx.lineTo(x - lineHeight / 4, y - lineHeight * 3 / 2);

        ctx.moveTo(x + lineHeight / 4, y + lineHeight * 3 / 2);
        ctx.lineTo(x + lineHeight / 4, y - lineHeight * 3 / 4);

        ctx.stroke();

        ctx.beginPath();

        ctx.lineWidth = 2;
        // side strokes
        ctx.moveTo(x - lineHeight / 4, y - lineHeight / 4);
        ctx.lineTo(x + lineHeight / 4, y - lineHeight * 3 / 4);

        ctx.moveTo(x - lineHeight / 4, y + lineHeight * 3 / 4);
        ctx.lineTo(x + lineHeight / 4, y + lineHeight / 4);

        ctx.stroke();
    }

    export class Natural extends Notation {

        draw(ctx: CanvasRenderingContext2D): boolean {

            ctx.strokeStyle = Colours.black;
            ctx.fillStyle = Colours.black;

            if (this.select) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
                ctx.strokeStyle = Colours.orange;
                ctx.fillStyle = Colours.orange;
                ctx.stroke();
            }

            if (this.hover) {
                ctx.strokeStyle = Colours.orange;
                ctx.fillStyle = Colours.orange;
            }

            drawNatural(ctx, this.x, this.y, 10);

            ctx.lineWidth = 1;

            return true;
        }

    }

}  