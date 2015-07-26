module Inknote.Drawing {

    export class Minimise implements IDrawable {
        ID: string = getID();
        hover: boolean;
        select: boolean;
        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 0;

        order: number = 200;

        isOver(x: number, y: number) {

            var isLeft = x < this.x + this.width;
            var isRight = x > this.x;
            var isAbove = y < this.y + this.height;
            var isBelow = y > this.y;

            var result = isLeft && isRight && isAbove && isBelow;
            
            this.hover = result;

            return result;
        }

        click(e: MouseEvent) {
            if (NoteControlService.Instance.hidden) {
                NoteControlService.Instance.show();
            }
            else {
                NoteControlService.Instance.hide();
            }
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            ctx.beginPath();
            ctx.fillStyle = Colours.black;
            if (this.hover){
                ctx.fillStyle = Colours.orange;
            }
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();

            // text
            ctx.beginPath();
            ctx.fillStyle = Colours.white;
            ctx.textAlign = "center";
            ctx.font = Fonts.standard;
            ctx.textBaseline = "middle";
            if (NoteControlService.Instance.hidden) {
                ctx.fillText("+", this.x + this.width / 2, this.y + this.height / 2);
            }
            else {
                ctx.fillText("-", this.x + this.width / 2, this.y + this.height / 2);
            }
            ctx.textBaseline = "bottom";

            return true;
        }


    }

} 