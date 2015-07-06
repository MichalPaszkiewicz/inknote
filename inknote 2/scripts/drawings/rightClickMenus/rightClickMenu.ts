module Inknote.Drawing.RightClickMenus {

    export class ClickableMenuItem {
        text: string;
        click: () => void;

        constructor(text?: string, click?: () => void) {
            this.text = text;
            this.click = click;
        }
    }

    export class RightClickMenu implements IDrawable{
        items: ClickableMenuItem[];
        ID = getID();

        hover: boolean;
        select: boolean;
        x: number;
        y: number;
        width = 100;
        get height() {
            return this.items.length * 25;
        }

        order = 500;

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            ctx.beginPath();
            ctx.fillStyle = Colours.shadowGray;
            ctx.rect(this.x + 4, this.y + 3, this.width, this.height);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = Colours.white;
            ctx.strokeStyle = Colours.black;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();
            ctx.stroke();

            for (var i = 0; i < this.items.length; i++) {
                ctx.beginPath();
                var itemBottom = (i + 1) * 25 + this.y;
                var textHeight = itemBottom - 8;
                ctx.font = Fonts.standard;
                ctx.textAlign = "center";
                ctx.fillStyle = Colours.black;
                ctx.fillText(this.items[i].text, this.x + this.width / 2, textHeight);
                if (i > 0) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, itemBottom);
                    ctx.lineTo(this.x + this.width, itemBottom);
                    ctx.stroke();
                }
            }

            return true;
        }

        isOver(x: number, y: number) {
            var isRight = x > this.x;
            var isLeft = x < this.x + this.width;
            var isBelow = y > this.y;
            var isAbove = y < this.y + this.height;

            var result = isRight && isLeft && isBelow && isAbove;

            return result;
        }

        constructor() {
            this.items = [];
            this.items.push(new ClickableMenuItem("lol", function () { }));
            this.items.push(new ClickableMenuItem("ha", function () { }));
        }
    }

} 