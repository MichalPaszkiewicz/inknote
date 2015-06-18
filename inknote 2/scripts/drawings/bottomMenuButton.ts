module Inknote {

    export class BottomMenuButton {

        text: string;
        x: number;
        y: number;
        width: number;
        height: number;

        hover: boolean;

        isOver(x: number, y: number) {
            var isRight = x >= this.x;
            var isLeft = x <= this.x + this.width;
            var isUp = y <= this.y + this.height;
            var isDown = y >= this.y;

            return isRight && isLeft && isUp && isDown;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();

            var grd = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
            if (this.hover) {
                grd.addColorStop(0, "lightblue");
            }
            else {
                grd.addColorStop(0, "darkgray");
            }
            grd.addColorStop(1, "white");
            ctx.fillStyle = grd;
            if (this.negative) {
                ctx.fillStyle = "rgb(255, 129, 129)";
                if (this.hover) {
                    ctx.fillStyle = "rgb(255,150,150)";
                }
            }
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();
            if (this.hover) {
                ctx.strokeStyle = "white";
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 5);
            ctx.fill();
        }

        click: () => void;

        constructor(text: string, x: number, y: number, width: number, height: number, clicker: () => void, public negative?: boolean) {

            this.text = text;
            this.x = x;
            this.y = y; 
            this.width = width;
            this.height = height;
            this.click = clicker;

        }

    }

    export function createMenuFromArray(items: any[], x: number, y: number, width: number, height: number): BottomMenuButton[]{
        var correctItems = [];
        var result = [];

        for (var i = 0; i < items.length; i++) {
            var o = items[i];
            if (!o.click || !o.text) {
                log("bad item in menu array");
                continue;
            }
            
            correctItems.push(o);
        }

        var itemCount = correctItems.length;

        var singleWidth = width / itemCount;

        var column = 0;

        for (var i = 0; i < correctItems.length; i++) {
            result.push(new BottomMenuButton(correctItems[i].text,
                column * singleWidth + singleWidth / 20, y + height / 10,
                singleWidth - 2 * singleWidth / 20, 8 * height / 10,
                correctItems[i].click, correctItems[i].negative));

            column++;
        }

        return result;
    }

} 