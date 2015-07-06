module Inknote.Drawing {

    function drawFlat(ctx: CanvasRenderingContext2D, x: number, y: number, lineHeight: number) {
        // curvy b bit
        ctx.beginPath();
        ctx.moveTo(x - lineHeight / 2, y - lineHeight / 2);
        ctx.bezierCurveTo(
            x + lineHeight / 2, y - lineHeight / 4,
            x + lineHeight / 2, y + lineHeight / 4,
            x - lineHeight / 2, y + lineHeight / 2
            );
        ctx.bezierCurveTo(
            x, y,
            x, y,
            x - lineHeight / 2, y - lineHeight / 2
            );
        ctx.fill();

        // line
        ctx.beginPath();
        ctx.moveTo(x - lineHeight / 2, y + lineHeight / 2);
        ctx.lineTo(x - lineHeight / 2, y - lineHeight * 3 / 2);
        ctx.stroke();
    }

    export class Flat extends Notation {

        draw(ctx: CanvasRenderingContext2D): boolean {
            ctx.strokeStyle = Colours.black;
            ctx.fillStyle = Colours.black;
            if (this.hover) {
                ctx.strokeStyle = Colours.orange;
                ctx.fillStyle = Colours.orange;
            }
            drawFlat(ctx, this.x, this.y, 10);

            return true;
        }

    }

} 