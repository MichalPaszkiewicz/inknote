module Inknote.DropCanvas {
    export class Spring {

        constructor(public x: number, public baseY: number, public bottomY: number) {

        }

        y: number = 30;

        tension: number = 0.01;
        velocity: number = 0;

        get acceleration() {
            return -this.y * this.tension;
        }

        update() {
            this.y += this.velocity;
            this.velocity += this.acceleration;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.strokeStyle = Inknote.Drawing.Colours.black;
            ctx.moveTo(this.x, this.bottomY - this.baseY - this.y);
            ctx.lineTo(this.x, this.bottomY);
            ctx.stroke();
        }



    }
}