module Inknote.Drawing {

    function drawSharp(ctx: CanvasRenderingContext2D, x: number, y: number, lineHeight: number) {

        ctx.beginPath();

        // up strokes
        ctx.moveTo(x - lineHeight / 5, y + lineHeight * 4 / 3);
        ctx.lineTo(x - lineHeight / 5, y - lineHeight * 6 / 5);

        ctx.moveTo(x + lineHeight / 5, y + lineHeight * 6 / 5);
        ctx.lineTo(x + lineHeight / 5, y - lineHeight * 4 / 3);

        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2;
        // side strokes
        ctx.moveTo(x - lineHeight / 2, y - lineHeight / 4);
        ctx.lineTo(x + lineHeight / 2, y - lineHeight * 3 / 4);

        ctx.moveTo(x - lineHeight / 2, y + lineHeight * 3 / 4);
        ctx.lineTo(x + lineHeight / 2, y + lineHeight / 4);

        ctx.stroke();
    }

    export class Sharp extends Notation {

        draw(ctx: CanvasRenderingContext2D): boolean {

            ctx.strokeStyle = Colours.black;
            ctx.fillStyle = Colours.black;

            if (this.hover) {
                ctx.strokeStyle = Colours.orange;
                ctx.fillStyle = Colours.orange;
            }

            drawSharp(ctx, this.x, this.y, 10);

            ctx.lineWidth = 1;

            return true;
        }

    }

} 