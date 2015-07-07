module Inknote.Drawing.ScrollBar {

    export class ScrollBar implements IDrawable{
        ID = getID();
        x: number;
        y = 50;
        width = 25;
        height: number;
        order = 200;
        hover: boolean;
        select: boolean;
        buttonHeight = 20;
        scrollThumbnail = new ScrollThumbnail();
        isOverTopButton: boolean;
        isOverBottomButton: boolean;
        isOverMiddle: boolean;

        click(e: MouseEvent) {
            if (e.clientY < 50 + this.y + this.buttonHeight) {
                ScrollService.Instance.up();
            }
            else if (e.clientY > 50 + this.y + this.height - this.buttonHeight) {
                ScrollService.Instance.down();
            }
            else {
                // scroll to this point.
            }
        }

        isOver(x: number, y: number): boolean{
            var isRight = x > this.x;
            var isLeft = x < this.x + this.width;
            var isBelow = y > this.y;
            var isAbove = y < this.y + this.height;

            var result = isRight && isLeft && isBelow && isAbove;

            this.isOverTopButton = false;
            this.isOverBottomButton = false;
            this.isOverMiddle = false;

            if (result) {
                if (y < this.y + this.buttonHeight){
                    this.scrollThumbnail.visible = false;
                    this.isOverTopButton = true;
                }
                else if (y > this.y + this.height - this.buttonHeight){
                    this.isOverBottomButton = true;
                    this.scrollThumbnail.visible = false;
                }
                else {
                    this.isOverMiddle = true;
                    this.scrollThumbnail.visible = true;
                    this.scrollThumbnail.y = y;
                    this.scrollThumbnail.x = this.x - 3 - this.scrollThumbnail.width;
                }
            }

            this.hover = result;

            return result;
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            this.x = canvas.width - this.width;
            this.height = canvas.height - this.y;

            ctx.beginPath();
            ctx.clearRect(this.x, this.y, this.width, this.height);

            ctx.fillStyle = Colours.lightBlue;

            if (this.isOverMiddle) {
                ctx.beginPath();
                ctx.rect(this.x, this.y + this.buttonHeight, this.width, this.height - 2 * this.buttonHeight);
                ctx.fill();
            }

            ctx.beginPath();
            ctx.strokeStyle = Colours.black;
            ctx.moveTo(this.x, this.y + this.buttonHeight);
            ctx.lineTo(this.x, canvas.height - this.buttonHeight);

            ctx.stroke();

            // top button
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.buttonHeight);
            ctx.moveTo(this.x + this.width / 2, this.y + this.buttonHeight * 2 / 3);
            ctx.lineTo(this.x + this.width / 2, this.y + this.buttonHeight * 1 / 3);
            ctx.moveTo(this.x + this.width / 2 + 3, this.y + this.buttonHeight / 2);
            ctx.lineTo(this.x + this.width / 2, this.y + this.buttonHeight * 1 / 3);
            ctx.moveTo(this.x + this.width / 2 - 3, this.y + this.buttonHeight / 2);
            ctx.lineTo(this.x + this.width / 2, this.y + this.buttonHeight * 1 / 3);
            if (this.isOverTopButton) {
                ctx.fill();
            }
            ctx.stroke();

            // bottom button
            ctx.beginPath();
            ctx.rect(this.x, canvas.height - this.buttonHeight, this.width, this.buttonHeight);
            ctx.moveTo(this.x + this.width / 2,     canvas.height - this.buttonHeight * 2 / 3);
            ctx.lineTo(this.x + this.width / 2,     canvas.height - this.buttonHeight * 1 / 3);
            ctx.moveTo(this.x + this.width / 2 + 3, canvas.height - this.buttonHeight / 2);
            ctx.lineTo(this.x + this.width / 2,     canvas.height - this.buttonHeight * 1 / 3);
            ctx.moveTo(this.x + this.width / 2 - 3, canvas.height - this.buttonHeight / 2);
            ctx.lineTo(this.x + this.width / 2,     canvas.height - this.buttonHeight * 1 / 3);
            if (this.isOverBottomButton) {
                ctx.fill();
            }
            ctx.stroke();


            return true;
        }

    }

} 