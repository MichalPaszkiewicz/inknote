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

        maxSplashTime: number = 200;

        running: boolean = false;
        dropped: boolean = false;
        splashed: boolean = false;
        splashCounter: number = 0;
        finished: boolean = false;
        springBaseSize: number;

        segmentSize = 15;

        springs: Spring[] = [];
        files: DropFile[] = [];
        droplets: Droplet[] = [];

        start() {
            if (this.running == true) {
                return;
            }

            this.running = true;
            this.dropped = false;
            this.splashed = false;
            this.splashCounter = 0;
            this.finished = false;

            FrontEnd.showElement(document.getElementById("drag-drop"));

            this.canvas.width = this.canvas.parentElement.clientWidth;
            this.canvas.height = this.canvas.parentElement.clientHeight;

            var segments = Math.floor(this.canvas.width / this.segmentSize);
            this.springs = [];
            this.files = [];
            this.droplets = [];

            this.springBaseSize = this.canvas.height / 6;

            for (var i = 0; i <= segments + 1; i++) {
                this.springs.push(new Spring(i * this.segmentSize, this.springBaseSize, this.canvas.height, i));
            }

            var self = this;

            this.draw(self);
        }

        splashTime: number = 0;

        draw(self: DropCanvas) {
            if (self.running == false) {
                FrontEnd.hideElement(document.getElementById("drag-drop"));
                return;
            }

            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

            var splashes = updateFiles(self.files, self.springs, self.canvas.height - self.springBaseSize);

            for (var i = 0; i < splashes.length; i++) {
                self.splash(splashes[i].index, splashes[i].strength);
            }

            var newFiles = [];
            for (var i = 0; i < self.files.length; i++) {
                if (self.files[i].y < self.canvas.height) {
                    newFiles.push(self.files[i]);
                }
                else {
                    self.splashed = true;
                }
            }

            if (self.splashed == true) {
                self.splashCounter++;

                if (self.splashCounter > self.maxSplashTime) {
                    self.finished = true;
                    self.stop();
                }
            }

            self.files = newFiles;

            drawFiles(self.files, self.ctx);

            var newDroplets = [];

            for (var i = 0; i < self.droplets.length; i++) {
                self.droplets[i].update();
                self.droplets[i].draw(self.ctx);
                if (self.droplets[i].position.y < self.canvas.height) {
                    newDroplets.push(self.droplets[i]);
                }
            }

            self.droplets = newDroplets;

            if (self.splashTime == 0) {
                self.splash(Math.floor(Math.random() * self.springs.length), 2 * Math.random());
            }
            self.splashTime = (self.splashTime + 1) % 4;

            self.ctx.beginPath();
            self.ctx.moveTo(0, self.canvas.height);

            updateSprings(self.springs);

            for (var i = 0; i < self.springs.length; i++) {

                self.ctx.lineTo(self.springs[i].x, self.springs[i].bottomY - self.springs[i].baseY - self.springs[i].y);

            }

            self.ctx.lineTo(self.canvas.width, self.canvas.height);
            self.ctx.lineTo(0, self.canvas.height);

            self.ctx.fillStyle = Drawing.Colours.black;
            self.ctx.strokeStyle = Drawing.Colours.black;
            self.ctx.fill();
            self.ctx.stroke();

            if (self.running == true) {
                window.requestAnimationFrame(function () { self.draw(self) });
            }
            else {
                FrontEnd.hideElement(document.getElementById("drag-drop"));
            }
        }
        
        drop(x: number, y: number) {
            this.dropped = true;
            this.files.push(new DropFile(x, y));
        }

        stop() {
            if (this.dropped && !this.finished) {
                return;
            }
            this.running = false;
            FrontEnd.hideElement(document.getElementById("drag-drop"));
        }

        splash(index: number, speed: number) {
            if (index >= 0 && index < this.springs.length) {
                this.springs[index].velocity = -speed;
            }

            if (speed > 10) {
                for (var i = 0; i < Math.floor(speed / 2); i++) {
                    var pos = new Vector2(index * this.segmentSize, this.canvas.height);
                    var vel = new Vector2(10 * Math.random() - 5,  -speed * Math.random() / 4);
                    var droplet = new Droplet(pos, vel, 5 * Math.random());

                    this.droplets.push(droplet);
                }
            }
        }

    }

} 