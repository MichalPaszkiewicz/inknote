module Inknote.Drawing {

    export class Bar extends Notation{
        ID = getID();

        x: number;
        y: number;
        width: number;
        height: number;

        order: number = 20;

        hover: boolean;
        select: boolean;
        hasError: boolean = false;

        isOver(x, y) {

            var isLeft = x < this.x + this.width;
            var isRight = x > this.x;
            var isBelow = y > this.y;
            var isAbove = y < this.y + this.height;

            return isLeft && isRight && isBelow && isAbove;

        }

        draw(ctx: CanvasRenderingContext2D) {

            ctx.beginPath();
            ctx.strokeStyle = Colours.black;
            if (this.hover) {
                ctx.strokeStyle = Colours.orange;
            }
            if (this.select) {
                ctx.strokeStyle = Colours.orange;
                ctx.lineWidth = 2;
            }
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.moveTo(this.x + this.width, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.stroke();

            // line under
            if (this.select) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + this.height + 10);
                ctx.lineTo(this.x + this.width, this.y + this.height + 10);
                ctx.stroke();
            }

            ctx.lineWidth = 1;

            if (this.hasError) {
                ctx.beginPath();

                ctx.globalAlpha = 0.2;

                ctx.fillStyle = Colours.negativeRed;

                ctx.fillRect(this.x, this.y, this.width, this.height);

                ctx.globalAlpha = 1;
            }

            return true;
        }

    }

}