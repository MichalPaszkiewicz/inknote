module Inknote.Landing {

    export class Metaball {

        running: boolean = false;

        position: Maths.Vector2;
        velocity: Maths.Vector2;

        get acceleration(): number {
            if (this.running) {
                return -0.02;
            }

            return 0.002 * this.radius;
        }

        radius: number;

        constructor(pos: Maths.Vector2, vel: Maths.Vector2, r: number) {

            this.position = pos;

            this.velocity = vel;

            this.radius = r;

        }

        update(centre: Maths.Vector2) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            var acc = new Maths.Vector2(centre.x - this.position.x, centre.y - this.position.y);

            var absS = acc.abs// * acc.abs;

            var damp = 0.002;

            if (this.running) {
                this.velocity.x += acc.x * this.acceleration - this.velocity.x * damp;
                this.velocity.y += acc.y * this.acceleration - this.velocity.y * damp;
            }
            else {
                this.velocity.x += acc.x / absS * this.acceleration - this.velocity.x * damp;
                this.velocity.y += acc.y / absS * this.acceleration - this.velocity.y * damp;
            }
        }

        draw(ctx: CanvasRenderingContext2D) {

            ctx.beginPath();
            var grad = ctx.createRadialGradient(this.position.x, this.position.y, 10, this.position.x, this.position.y, this.radius);
            grad.addColorStop(0, "rgba(0,0,0,1)");
            grad.addColorStop(1, "rgba(0,0,0,0.0)");

            ctx.fillStyle = grad;
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);

            ctx.fill();
        }

    }

    export class MetaballList {

        metaballs: Metaball[];

        constructor(amount: number, canvas: HTMLCanvasElement) {

            var width = canvas.width;
            var height = canvas.height;

            var hW = width / 2;
            var hH = height / 2;

            var minLength = Math.min(width, height, 600);

            this.metaballs = [];
            for (var i = 0; i < amount; i++) {

                var x = hW + minLength * Math.random() - minLength / 2;
                var y = hH + minLength * Math.random() - minLength / 2;

                var pos = new Maths.Vector2(x, y);

                var speed = 4;

                var vx = speed * Math.random() - speed / 2;
                var vy = speed * Math.random() - speed / 2;

                var vel = new Maths.Vector2(vx, vy);

                var r = 30 + minLength / 4 * Math.random();

                var tempBall = new Metaball(pos, vel, r);
                this.metaballs.push(tempBall);
            }

        }

        ended: boolean = false;

        update(x: number, y: number) {

            var centre = new Maths.Vector2(x, y);

            for (var i = 0; i < this.metaballs.length; i++) {
                this.metaballs[i].update(centre);
            }

            if (this.ended) {
                var newBalls = [];

                for (var i = 0; i < this.metaballs.length; i++) {
                    var b = this.metaballs[i];

                    if (b.position.x + b.radius < 0 || b.position.x - b.radius > centre.x * 2 || b.position.y + b.radius < 0 || b.position.y - b.radius > centre.y * 2) {
                        //console.log("gone");
                    }
                    else {
                        newBalls.push(b);
                    }

                }

                this.metaballs = newBalls;
            }
        }

        metabalise(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            var pixels = imageData.data;

            for (var i = 0; i < pixels.length; i += 4) {
                var r = pixels[i];
                var g = pixels[i + 1];
                var b = pixels[i + 2];
                var a = pixels[i + 3];

                if (a < 180) {
                    a = 0;
                }
                else {
                    a = 255 - Math.floor((255 - a));
                    // g = a * 2 - 350;

                }

                imageData.data[i] = r;
                imageData.data[i + 1] = g;
                imageData.data[i + 2] = b;
                imageData.data[i + 3] = a;
            }

            ctx.putImageData(imageData, 0, 0);
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < this.metaballs.length; i++) {
                this.metaballs[i].draw(ctx);
            }

            this.metabalise(ctx, canvas);

        }

        end() {
            this.ended = true;
            for (var i = 0; i < this.metaballs.length; i++) {
                this.metaballs[i].running = true;
            }
        }

    }

}