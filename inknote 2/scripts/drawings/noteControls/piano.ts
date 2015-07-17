module Inknote.Drawing {

    export class Piano implements IDrawable {

        ID = getID();
        x = 0;
        y = 500;
        width = 500;
        height = 100;
        order = 200;
        hover: boolean;
        select: boolean;

        octave: number = 4;

        isOver() {


            return false;
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            ctx.beginPath();

            ctx.fillStyle = Colours.white;
            ctx.strokeStyle = Colours.black;

            ctx.rect(this.x, this.y, this.width, this.height);

            ctx.fill();
            ctx.stroke();

            for (var i = 1; i < 9; i++) {
                ctx.beginPath();
                ctx.strokeStyle = Colours.black;

                ctx.moveTo(this.width * i / 9, this.y);
                ctx.lineTo(this.width * i / 9, this.y + this.height);
                ctx.stroke();

                if (i == 2 || i == 3 || i == 5 || i == 6 || i == 7) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.black;
                    ctx.rect(this.width * i / 9 - this.width / 24, this.y, this.width / 12, this.height / 2);
                    ctx.fill();
                }
            }

            return true;
        }

        constructor() {

        }

    }

} 