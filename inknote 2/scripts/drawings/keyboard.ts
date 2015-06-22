module Inknote.Drawing {

    export class Keyboard implements IDrawable {

        private static _instance: Keyboard;

        static get Instance() {
            if (!Keyboard._instance) {
                Keyboard._instance = new Keyboard();
            }

            return Keyboard._instance;
        }

        ID = getID();
        draw: (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) => boolean;
        x: number;
        y: number;
        order = 200;

        isOver(x: number, y: number, canvas: HTMLCanvasElement) {

            for (var i = 0; i < this.keys.length; i++) {
                if (this.keys[i].isOver(x, y)) {
                    this.keys[i].hover = true;
                }
                else {
                    this.keys[i].hover = false;
                }
            }

            return y > canvas.height / 2;

        }

        hover: boolean;
        select: boolean;
        drawOptions: DrawOptions;
        keys: KeyboardKey[];

        click(e: MouseEvent) {

            var inst = Managers.ProjectManager.Instance;
            var proj = inst.currentProject;

            for (var i = 0; i < this.keys.length; i++) {
                if (this.keys[i].isOver(e.clientX, e.clientY - 50)) {
                    if (this.keys[i].name == "Delete") {
                        if (inst.selectID == proj.ID) {

                            proj.name = "";

                        }
                    }
                    else if (this.keys[i].name == "|<") {
                        if (inst.selectID == proj.ID) {
                            proj.name = proj.name.substr(0, proj.name.length - 1);
                        }
                    }
                    else {
                        console.log(this.keys[i].name);

                        proj.name = pascalCase(proj.name + this.keys[i].name);
                    }
                }
            }

        }

        cSize = { x: 0, y: 0 }
         
        constructor() {

            var self = this;

            self.draw = function (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) {

                if (canvas.width != self.cSize.x || canvas.height != self.cSize.y) {

                    self.cSize = { x: canvas.width, y: canvas.height };

                    self.keys = [];

                    //self.keys.push(new KeyboardKey("Delete", canvas.width - 40, canvas.height / 2 + 20, 70, 30));

                    self.keys = self.keys.concat(keysFromArray(["", "", "", "|<", "Delete"], 0, canvas.height / 2, canvas.width, canvas.height / 12));
                    self.keys = self.keys.concat(keysFromString("qwertyuiop", 0, canvas.height / 2 + canvas.height / 12, canvas.width, canvas.height / 12));
                    self.keys = self.keys.concat(keysFromString("asdfghjkl-", 0, canvas.height / 2 + 2 * canvas.height / 12, canvas.width, canvas.height / 12));
                    self.keys = self.keys.concat(keysFromString("zxcvbnm,./", 0, canvas.height / 2 + 3 * canvas.height / 12, canvas.width, canvas.height / 12));
                    self.keys = self.keys.concat(keysFromString(" ", 0, canvas.height / 2 + 4 * canvas.height / 12, canvas.width, canvas.height / 12));
                }
                else {

                }

                ctx.font = "12px Arial";
                ctx.lineWidth = 1;
                ctx.strokeStyle = Colours.black;
                

                ctx.beginPath();
                var grd = ctx.createLinearGradient(0, canvas.height / 2, canvas.width / 2, canvas.height);
                grd.addColorStop(0, Colours.darkestGray);
                grd.addColorStop(1, Colours.darkerGray);
                ctx.fillStyle = grd;
                ctx.rect(0, canvas.height / 2, canvas.width, canvas.height / 2);
                ctx.fill();



                for (var i = 0; i < self.keys.length; i++) {
                    self.keys[i].draw(ctx, canvas);
                }

                return true;
            }

        }

    }

} 