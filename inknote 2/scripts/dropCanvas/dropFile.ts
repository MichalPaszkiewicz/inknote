module Inknote.DropCanvas {

    export class DropFile {

        tilt: number = Math.random() * 2 * Math.PI;

        constructor(public x: number, public y: number) {

        }

        draw(ctx: CanvasRenderingContext2D) {
            var self = this;

            ctx.translate(self.x, self.y);
            ctx.rotate(self.tilt);
            ctx.translate(-self.x, -self.y);

            var grd = ctx.createLinearGradient(self.x - 50, self.y - 50, self.x + 50, self.y + 50);

            var fold = 20;

            grd.addColorStop(0, Drawing.Colours.tan);

            grd.addColorStop(1, Drawing.Colours.peach);

            ctx.fillStyle = grd;

            ctx.beginPath();
            ctx.moveTo(self.x - 50, self.y + 50);
            ctx.lineTo(self.x + 50, self.y + 50);
            ctx.lineTo(self.x + 50, self.y - 50);
            ctx.lineTo(self.x - fold, self.y - 50);
            ctx.lineTo(self.x - 50, self.y - fold);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(self.x - (fold + 4), self.y - 45);
            ctx.lineTo(self.x - 45, self.y - 45);
            ctx.lineTo(self.x - 45, self.y - (fold + 4));
            ctx.strokeStyle = Drawing.Colours.black;
            ctx.fillStyle = Drawing.Colours.white;
            ctx.fill();
            ctx.stroke();

            ctx.translate(self.x, self.y);
            ctx.rotate(-self.tilt);
            ctx.translate(-self.x, -self.y);
        }

        velocity = 0;
        acceleration = GRAVITY;
        removeThis: boolean = false;

        getClosestSpring(springs: Spring[]): Spring {
            var closestSpring: Spring = null;
            var dist = Infinity;

            for (var i = 0; i < springs.length; i++) {
                var tempDist = Math.abs(springs[i].x - this.x);
                if (tempDist < dist) {
                    closestSpring = springs[i];
                    dist = tempDist;
                }
            }

            return closestSpring;
        }

        update(springTop: number): boolean {
            var willSplash = false;
            this.y += this.velocity;
            this.velocity += this.acceleration;
            this.tilt += 0.01;

            if (springTop < this.y) {
                willSplash = true;
            }

            if (this.removeThis) {
                willSplash = false;
            }

            if (willSplash) {
                this.removeThis = true;
            }

            return willSplash;
        }

    }

    export class Splash {
        constructor(public index: number, public strength: number) {
        }
    }

    export function updateFiles(files: DropFile[], springs: Spring[], springTop: number): Splash[] {
        var splashes = [];

        for (var i = 0; i < files.length; i++) {
            var willSplash = files[i].update(springTop);

            if (willSplash) {
                var spring = files[i].getClosestSpring(springs);

                splashes.push(new Splash(spring.index, 5 * files[i].velocity));
            }
        }

        return splashes;
    }

    export function drawFiles(files: DropFile[], ctx: CanvasRenderingContext2D) {
        for (var i = 0; i < files.length; i++) {
            files[i].draw(ctx);
        }
    }

} 