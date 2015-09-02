module Inknote.Landing {

    export class Landing {

        private static _instance: Landing;

        static get Instance(): Landing {
            if (!Landing._instance) {
                Landing._instance = new Landing();
            }
            return Landing._instance;
        }

        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D
        metaballs: MetaballList;

        run() {
            if (this.metaballs.metaballs.length === 0) {
                FrontEnd.hideElement(this.canvas.parentElement);

                return;
            }

            if (this.canvas.parentElement.className.indexOf("hidden") != -1) {
                return;
            }

            this.canvas.width = this.canvas.parentElement.clientWidth;
            this.canvas.height = this.canvas.parentElement.clientHeight;

            this.metaballs.update(this.canvas.width / 2, this.canvas.height / 2);
            this.metaballs.draw(this.ctx, this.canvas);

            var self = this;

            window.requestAnimationFrame(function () {
                self.run();
            });
        }

        constructor() 
        {
            this.canvas = <HTMLCanvasElement>document.getElementById("landing-canvas");
            this.ctx = this.canvas.getContext("2d");

            if (Managers.MachineManager.Instance.machineType != Managers.MachineType.Desktop) {
                return;
            }

            this.canvas.width = this.canvas.parentElement.clientWidth;
            this.canvas.height = this.canvas.parentElement.clientHeight;

            this.metaballs = new MetaballList(20, this.canvas);

            this.run();

        }

        ended: boolean = false;

        hide() {
            if (Managers.MachineManager.Instance.machineType != Managers.MachineType.Desktop) {
                this.canvas.parentElement.className += " hidden";
            }

            this.ended = true;

            if (Managers.MachineManager.Instance.machineType == Managers.MachineType.Desktop) {
                this.metaballs.end();
                this.canvas.parentElement.className += " faded";
            }
        }

    }

} 