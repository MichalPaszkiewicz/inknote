module Inknote.DropCanvas {

    export class DropCanvas {

        private static _instance: DropCanvas;

        static get Instance(): DropCanvas {
            if (!DropCanvas._instance) {
                DropCanvas._instance = new DropCanvas();
            }
            return DropCanvas._instance;
        }

        _canvas: HTMLCanvasElement;

        get canvas() {
            if (!this._canvas) {
                this._canvas = <HTMLCanvasElement>document.getElementById("drag-drop-canvas");
            }
            return this._canvas;
        }

        private _ctx: CanvasRenderingContext2D;

        get ctx(): CanvasRenderingContext2D {
            if (!this._ctx) {
                this._ctx = this.canvas.getContext("2d");
            }
            return this._ctx;
        }

        running: boolean = false;

        springs: Spring[] = [];

        start() {
            if (this.running == true) {
                return;
            }

            this.running = true;

            FrontEnd.showElement(document.getElementById("drag-drop"));

            this.canvas.width = this.canvas.parentElement.clientWidth;
            this.canvas.height = this.canvas.parentElement.clientHeight;

            var segmentSize = 10;
            var segments = Math.floor(this.canvas.width / segmentSize);
            this.springs = [];

            for (var i = 0; i <= segments + 1; i++) {
                this.springs.push(new Spring(i * segmentSize, this.canvas.height / 10, this.canvas.height));
            }

            var self = this;

            this.draw(self);
        }

        draw(self: DropCanvas) {

            if (self.running == false) {
                return;
            }

            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

            self.ctx.beginPath();
            self.ctx.moveTo(0, self.canvas.height);

            updateSprings(self.springs);

            for (var i = 0; i < this.springs.length; i++) {

                self.ctx.lineTo(self.springs[i].x, self.springs[i].bottomY - self.springs[i].baseY - self.springs[i].y);

            }

            self.ctx.lineTo(self.canvas.width, self.canvas.height);
            self.ctx.lineTo(0, self.canvas.height);

            self.ctx.fillStyle = Drawing.Colours.black;
            self.ctx.strokeStyle = Drawing.Colours.black;
            self.ctx.fill();
            self.ctx.stroke();

            if (self.running == true) {
                window.requestAnimationFrame(function () { self.draw(self) } );
            }
        }

        drop(x: number, y: number) {
            this.running = false;
            FrontEnd.hideElement(document.getElementById("drag-drop"));
        }

        stop() {
            this.running = false;
            FrontEnd.hideElement(document.getElementById("drag-drop"));
        }

        splash(index: number, speed: number) {
            if (index >= 0 && index < this.springs.length) {
                this.springs[index].velocity = speed;
            }
        }

    }

} 