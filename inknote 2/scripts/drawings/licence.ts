module Inknote.Drawing {

    export class Licence implements IDrawable {
        ID = getID();
        x: number;
        y: number;
        order = 100;
        hover: boolean;
        select: boolean;
        text: string = "Free licence";

        isOver(x: number, y: number, canvas: HTMLCanvasElement): boolean {

            var isRight = x > canvas.width - 120;
            var isLeft = x < canvas.width - 10;
            var isBelow = y > 10;
            var isAbove = y < 30;
            
            var result = isRight && isLeft && isBelow && isAbove;

            if (result) {
                this.hover = true;
            }
            else {
                this.hover = false;
            }

            return result;
        }

        click(e: MouseEvent) {
            Managers.PageManager.Current.page = Managers.Page.Licence;
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            
            ctx.fillStyle = Colours.white;
            ctx.strokeStyle = Colours.black;

            if (this.hover) {
                ctx.strokeStyle = Colours.orange;
            }

            ctx.beginPath();
            ctx.rect(canvas.width - 120,10, 110, 20);
            ctx.lineWidth = 1;

            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = Colours.black;
            ctx.font = Fonts.standard;

            ctx.beginPath();
            ctx.textAlign = "center";
            ctx.fillText(this.text, canvas.width - 65, 25); 

            if (this.hover) {
                ctx.beginPath();
                ctx.font = Fonts.small;
                ctx.textAlign = "right";
                ctx.fillText("Click to upgrade your licence", canvas.width - 10, 45);
            }

            return true;
        }
    }

} 