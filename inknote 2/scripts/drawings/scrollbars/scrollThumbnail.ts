module Inknote.Drawing.ScrollBar {

    export class ScrollThumbnail implements IDrawable{

        ID = getID();
        x: number;
        y: number;
        width = 80;
        height = 100;
        invert = false;
        visible = false;

        hover: boolean;
        select: boolean;

        order = 201;

        click(e: MouseEvent) {
            alert("Scroll thumb");
        }

        isOver(x: number, y: number): boolean {
            var isRight = x > this.x;
            var isLeft = x < this.x + this.width;
            var isBelow = y > this.y;
            var isAbove = y < this.y + this.height;

            var result = isRight && isLeft && isBelow && isAbove;

            return result;
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            if (this.y + this.height > canvas.height) {
                this.invert = true;
            }
            else {
                this.invert = false;
            }

            var y = this.invert ? this.y - this.height : this.y;
            var height = this.height;
            var farLeft = this.x;
            ctx.strokeStyle = Colours.black;
            ctx.fillStyle = Colours.white;
            ctx.lineWidth = 2;

            if (this.invert) {
                ctx.beginPath();
                ctx.moveTo(farLeft, y);
                ctx.lineTo(farLeft, y + this.height);
                ctx.lineTo(farLeft + this.width + 10, y + this.height);
                ctx.lineTo(farLeft + this.width, y + this.height - 5);
                ctx.lineTo(farLeft + this.width, y);
                ctx.lineTo(farLeft, y);
                ctx.fill();
                ctx.stroke();
            }
            else {
                ctx.beginPath();
                ctx.moveTo(farLeft,  y);
                ctx.lineTo(farLeft + this.width + 10, y);
                ctx.lineTo(farLeft + this.width, y + 5)
                ctx.lineTo(farLeft + this.width, y + height);
                ctx.lineTo(farLeft,  y + height);
                ctx.lineTo(farLeft,  y);
                ctx.fill();
                ctx.stroke();
            }

            ctx.lineWidth = 1;

            return true;
        }



    }

} 