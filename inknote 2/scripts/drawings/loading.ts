module Inknote {

    export class LoadingSplash implements IDrawable {

        ID = getID();
        t = 0;
        x = 0;
        y = 0;
        order = 100;
        hover = false;
        select = false;

        isOver(x: number, y: number) {

            return Maths.isWithinRadius(x, y, this.x, this.y, 10);
            
        }

        draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scale: number) => boolean;

        constructor() {

            this.x = 5;
            this.y = 7;

            var self = this;

            self.draw = function (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) {

                this.t++;

                ctx.beginPath();
                ctx.fillStyle = "rgba(0,0,0,0.2)";
                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = "orange";
                ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, 2 * Math.PI);
                ctx.fill();
                drawTextAlongArc(ctx, "Loading", canvas.width / 2, canvas.height / 2, 90, 1);
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(
                    50 * Math.sin(self.t / 100) * Math.sin(self.t / 50) + canvas.width / 2,
                    50 * Math.sin(self.t / 100) * Math.cos(self.t / 50) + canvas.height / 2,
                    10 * Math.abs(Math.sin(self.t / 100)),
                    0, 2 * Math.PI);
                ctx.arc(
                    - 50 * Math.sin(self.t / 100) * Math.sin(self.t / 50) + canvas.width / 2,
                    - 50 * Math.sin(self.t / 100) * Math.cos(- self.t / 50) + canvas.height / 2,
                    10 * Math.abs(Math.sin(self.t / 100)),
                    0, 2 * Math.PI);
                ctx.fill();

                return true;
            }
        }
    }

} 