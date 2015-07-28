module Inknote.DropCanvas {
    export class Spring {

        constructor(public x: number, public baseY: number, public bottomY: number, public index: number) {

        }

        y: number = 20 * Math.random() - 10;

        tension: number = 0.01;
        dampeningFactor: number = 0.0005;
        velocity: number = 1 * Math.random() - 0.5;

        get acceleration() {
            return -this.y * this.tension - this.velocity * this.dampeningFactor;
        }

        update() {
            this.y += this.velocity;
            this.velocity += this.acceleration;
        }

    }

    export function updateSprings(springs: Spring[]): void {

        for (var i = 0; i < springs.length; i++) {
            springs[i].update();
        }

        var leftDeltas = [];
        var rightDeltas = [];

        var Spread = 0.1;

        for (var i = 0; i < springs.length; i++) {

            if (i > 0) {
                leftDeltas[i] = Spread * (springs[i].y - springs[i - 1].y);
                springs[i - 1].velocity += leftDeltas[i];
            }

            if (i < springs.length - 1) {
                rightDeltas[i] = Spread * (springs[i].y - springs[i + 1].y);
                springs[i + 1].velocity += rightDeltas[i];
            }

        }

        for (var i = 0; i < springs.length; i++) {
            if (i > 0) {
                springs[i - 1].y += leftDeltas[i];
            }
            if (i < springs.length - 1) {
                springs[i + 1].y += rightDeltas[i];
            }
        }

    }
}