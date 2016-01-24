module Inknote.Drawing {

    export class KeyboardKey {

        hover: boolean;

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            if (this.name == "") {
                return;
            }

            ctx.beginPath();

            ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

            var grd = ctx.createLinearGradient(this.x - this.width / 2, this.y - this.height / 2, this.x + this.width / 2, this.y + this.height / 2);
            if (this.hover) {
                grd.addColorStop(0, Colours.lightBlue);
            }
            else {
                grd.addColorStop(0, Colours.darkestGray);
            }
            grd.addColorStop(1, Colours.black);
            ctx.fillStyle = grd;

            ctx.fill();

            //ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = Colours.white;
            ctx.textAlign = "center";
            ctx.font = Fonts.large;
            ctx.fillText(this.name, this.x, this.y + 5);
        }

        isOver(x: number, y: number) {

            if (this.name == "") {
                return false;
            }

            var isRight = x > this.x - this.width / 2;
            var isLeft = x < this.x + this.width / 2;
            var isDown = y > this.y - this.height / 2;
            var isUp = y < this.y + this.height / 2;

            return isRight && isLeft && isDown && isUp;

        }

        constructor(public name: string, public x: number, public y: number, public width: number, public height: number) {
           
        }
    }

    export function keysFromString(text: string, x: number, y: number, totalWidth: number, itemHeight) {

        var charArray = text.split("");
        var keys: KeyboardKey[] = [];

        var itemWidth = totalWidth / charArray.length;

        var maxWidth = 10000;
        var column = 0;

        for (var i = 0; i < charArray.length; i++) {
            keys.push(new KeyboardKey(charArray[i], x + itemWidth * column + itemWidth / 2, y + itemHeight / 2, itemWidth - 2, itemHeight - 2));
            column++;
        }

        return keys;
    }

    export function keysFromArray(array: string[], x: number, y: number, totalWidth: number, itemHeight: number) {
        var charArray = array;
        var keys: KeyboardKey[] = [];

        var itemWidth = totalWidth / charArray.length;

        var maxWidth = 10000;
        var column = 0;

        for (var i = 0; i < charArray.length; i++) {
            keys.push(new KeyboardKey(charArray[i], x + itemWidth * column + itemWidth / 2, y + itemHeight / 2, itemWidth - 2, itemHeight - 4));
            column++;
        }

        return keys;
    }


} 