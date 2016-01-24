module Inknote.DropCanvas {

    export class Droplet {

        position: Maths.Vector2;
        velocity: Maths.Vector2;   
        
        get orientation() {
            return Math.atan2(this.velocity.y, this.velocity.x);
        }

        constructor(pos: Maths.Vector2, vel: Maths.Vector2, public r: number) {
            this.position = pos;
            this.velocity = vel;
        }

        update() {
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;

            this.velocity.y += GRAVITY;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();

            var r = this.r;

            var x = this.position.x;
            var y = this.position.y;
            var theta = this.orientation;

            var tail = Math.min(this.velocity.abs / 2, 4 * r);

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(x, y, r, theta - Math.PI / 2, theta + Math.PI / 2);
            ctx.lineTo(x + 3 * tail * Math.cos(theta + Math.PI), y + 3 * tail * Math.sin(theta + Math.PI));
            ctx.fill();
        }

    }

} 