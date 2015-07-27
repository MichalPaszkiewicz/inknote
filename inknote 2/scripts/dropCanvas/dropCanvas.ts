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

            var segmentSize = 20;
            var segments = Math.floor(this.canvas.width / segmentSize);
            this.springs = [];

            for (var i = 0; i < 1; i++) {
                this.springs.push(new Spring((i + 1) * segmentSize, this.canvas.height / 10, this.canvas.height));
            }

            var self = this;

            this.draw(self);
        }

        draw(self: DropCanvas) {

            if (self.running == false) {
                return;
            }

            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

            for (var i = 0; i < this.springs.length; i++) {
                self.springs[i].update();
                self.springs[i].draw(self.ctx);
            }

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

    }

} 