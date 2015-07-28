module Inknote.DropCanvas {

    export class Vector2 {
        constructor(public x, public y) {

        }

        get speed() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }

    export class Droplet {

        position: Vector2;
        velocity: Vector2;   
        
        get orientation() {
            return Math.atan2(this.velocity.y, this.velocity.x);
        }

        constructor(pos: Vector2, vel: Vector2, public r: number) {
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

            var tail = Math.min(this.velocity.speed / 2, 4 * r);

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(x, y, r, theta - Math.PI / 2, theta + Math.PI / 2);
            ctx.lineTo(x + 3 * tail * Math.cos(theta + Math.PI), y + 3 * tail * Math.sin(theta + Math.PI));
            ctx.fill();
        }

    }

} 