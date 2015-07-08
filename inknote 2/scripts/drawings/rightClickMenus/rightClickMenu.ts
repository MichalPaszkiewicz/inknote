module Inknote.Drawing.RightClickMenus {

    export class ClickableMenuItem {
        text: string;
        click: () => void;
        hover: boolean;

        constructor(text?: string, click?: () => void) {
            this.text = text;
            this.click = click;
        }
    }

    export class RightClickMenu implements IDrawable {
        items: ClickableMenuItem[] = [
            new ClickableMenuItem("lol", function () { alert("lol"); }),
            new ClickableMenuItem("Plugins", function () {
                Modal.toggle("plugins");
            }),
            new ClickableMenuItem("Report bug", function () {
                Modal.toggle("report");
            })
        ]

        ID = getID();

        hover: boolean;
        select: boolean;
        x: number;
        y: number;
        width = 100;

        get itemHeight() { return 25; }

        get height() {
            return this.items.length * this.itemHeight;
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

                if (this.items[i].hover) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.orange;
                    ctx.rect(this.x, i * 25 + this.y, this.width, this.itemHeight);
                    ctx.fill();
                }

                ctx.beginPath();
                var itemBottom = (i + 1) * 25 + this.y;
                var textHeight = itemBottom - 8;
                ctx.font = Fonts.standard;
                ctx.textAlign = "center";
                ctx.fillStyle = Colours.black;
                ctx.fillText(this.items[i].text, this.x + this.width / 2, textHeight);
                if (i < this.items.length - 1) {
                    ctx.beginPath();
                    ctx.strokeStyle = Colours.gray;
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


            var itemNo = Math.floor((y - this.y) / this.itemHeight);

            for (var i = 0; i < this.items.length; i++) {
                if (result && i == itemNo) {
                    this.items[i].hover = true;
                }
                else {
                    this.items[i].hover = false;
                }
            }
        

            return result;
        }

        click(e: MouseEvent) {
            var x = e.clientX;
            var y = e.clientY - 50;

            var itemNo = Math.floor((y - this.y) / this.itemHeight);

            this.items[itemNo].click();

            
        }

        constructor() {

        }
    }

} 