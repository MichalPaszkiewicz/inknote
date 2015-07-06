module Inknote.Drawing {

    export class Name implements IDrawable {

        ID = getID();
        name: string;
        x = 0;
        y = 0;
        order = 100;
        hover = false;
        select = false;

        isOver(x: number, y: number, canvas: HTMLCanvasElement) {

            return y < 100 && y > 65 && x > canvas.width / 2 - 150 && x < canvas.width / 2 + 150;

        }

        draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scale: number) => boolean;

        constructor(name: string) {
             
            this.name = name;
            this.x = 0;
            this.y = 0;

            var self = this;

            self.draw = function (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) {

                if (self.select) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.white;
                    var width = Managers.ProjectManager.Instance.currentProject.name.length * 30 + 100;
                    ctx.rect(canvas.width / 2 - width / 2, 60, width, 50);
                    ctx.strokeStyle = Colours.lightOrange;
                    ctx.lineWidth = 10;
                    ctx.stroke();
                    if (this.name.length > 0) {
                        ctx.beginPath();
                        ctx.fillStyle = Colours.black;
                        ctx.textAlign = "center";
                        ctx.fillText("Click delete to clear text", canvas.width / 2, 50);
                        ctx.fill();
                    }
                    else {
                        ctx.beginPath();
                        ctx.fillStyle = Colours.black;
                        ctx.textAlign = "center";
                        ctx.fillText("Please type a project name", canvas.width / 2, 50);
                        ctx.fill();
                    }
                }

                ctx.beginPath();
                ctx.fillStyle = Colours.orange;
                ctx.font = Fonts.title;
                ctx.textAlign = "center";
                ctx.fillText(self.name, canvas.width / 2, 100);
                ctx.fill();

                if (self.hover) {
                    ctx.beginPath();
                    ctx.rect(canvas.width / 2 - 50, 105, 100, 10);
                    ctx.fill();
                    
                    if (!self.select) {
                        ctx.beginPath();
                        ctx.font = Fonts.small;
                        ctx.fillStyle = Colours.black;
                        ctx.textAlign = "center";
                        ctx.fillText("Click to edit project name", canvas.width / 2, 50);
                        ctx.fill();
                    } 
                }

                return true;
            }
        }
    }

} 