module Inknote {

    export class BottomMenu implements IDrawable {

        private static _instance: BottomMenu;

        static get Instance() {
            if (!BottomMenu._instance) {
                BottomMenu._instance = new BottomMenu();
            }

            return BottomMenu._instance;
        }

        ID = getID();
        draw: (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) => boolean;
        x: number;
        y: number;
        order = 150;

        isOver(x: number, y: number, canvas: HTMLCanvasElement) {

            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].isOver(x, y)) {
                    this.buttons[i].hover = true;
                }
                else {
                    this.buttons[i].hover = false;
                }
            }

            return y > canvas.height - 100;
        }

        click(e: MouseEvent) {

            var inst = Managers.ProjectManager.Instance;
            var proj = inst.currentProject;

            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].isOver(e.clientX, e.clientY - 50)){
                    this.buttons[i].click();
                    e.preventDefault();
                }
            }

        }

        hover: boolean;
        select: boolean;
        drawOptions: DrawOptions;

        buttons: BottomMenuButton[];

        resizeButtons(canvas: HTMLCanvasElement) {

            var btns = this.buttons;

            var itemCount = btns.length;

            var singleWidth = canvas.width / itemCount;

            var column = 0;

            var height = 100;

            for (var i = 0; i < btns.length; i++) {

                btns[i].x = column * singleWidth + singleWidth / 20;
                btns[i].y = canvas.height - 100 + height / 10;
                btns[i].width = singleWidth - 2 * singleWidth / 20;
                btns[i].height = 8 * height / 10;

                column++;
            }

        }

        constructor() {

            this.buttons = [];

            var self = this;

            self.draw = function (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) {
                
                if (self.buttons.length < 1) {
                    self.buttons = createMenuFromArray([
                        {
                            text: "Open", click: function () {
                                Managers.ProjectManager.Instance.openSelectedProject();
                            }
                        },
                        {
                            text: "<", click: function () {
                                Managers.ProjectManager.Instance.previous();
                            }
                        },
                        {
                            text: ">", click: function () {
                                Managers.ProjectManager.Instance.next();
                            }
                        },
                        {
                            text: "Delete", click: function () {
                                var inst = Managers.ProjectManager.Instance;
                                inst.deleteSelectedProject();
                            }, negative: true
                        }
                    ], 0, canvas.height - 100, canvas.width, 100);
                } else {
                    this.resizeButtons(canvas);
                }

                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.rect(0, canvas.height - 100, canvas.width, 100);
                ctx.fill();

                for (var i = 0; i < self.buttons.length; i++) {
                    self.buttons[i].draw(ctx);
                }

                return true;
            }

        }

    }

} 