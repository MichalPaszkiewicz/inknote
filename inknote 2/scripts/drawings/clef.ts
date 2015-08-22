module Inknote.Drawing {

    export class Clef extends Notation {

        lineHeight = 10;

        constructor(public drawPosition: number) {

            super();

        }

    }

    export class GClef extends Clef {

        draw(ctx: CanvasRenderingContext2D) {

            var hlh = this.lineHeight / 2;

            ctx.beginPath();
            ctx.moveTo(this.x - hlh, this.y + hlh);
            ctx.bezierCurveTo(this.x - hlh * 2, this.y - hlh, this.x - hlh, this.y - hlh * 2, this.x + hlh, this.y - hlh);
            ctx.strokeStyle = "green";

            ctx.stroke();

            return true;
        }

    }

    export class CClef extends Clef {

        draw(ctx: CanvasRenderingContext2D) {

            ctx.beginPath();
            ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
            ctx.strokeStyle = "green";

            ctx.stroke();


            return true;
        }

    }

    export class FClef extends Clef {

        draw(ctx: CanvasRenderingContext2D) {

            var hlh = this.lineHeight / 2;

            ctx.fillStyle = Colours.black;

            if (this.hover) {
                ctx.fillStyle = Colours.orange;
            }
            if (this.select) {
                ctx.fillStyle = Colours.orange;
                ctx.strokeStyle = Colours.orange;

                ctx.beginPath();

                ctx.arc(this.x, this.y, this.lineHeight, 0, 2 * Math.PI);
                ctx.stroke();
            }

            ctx.beginPath();

            ctx.arc(this.x, this.y, hlh, 0, 2 * Math.PI);
            
            var strt = hlh * Math.sin(Math.PI / 4);

            ctx.moveTo(this.x - strt, this.y + strt);
            // outer
            ctx.bezierCurveTo(this.x - hlh, this.y, this.x - 2 * hlh, this.y - this.lineHeight, this.x + hlh * 3 / 2, this.y - this.lineHeight);
            ctx.bezierCurveTo(this.x + 4 * hlh, this.y - hlh * 3 / 2, this.x + 4 * hlh, this.y + 2 * hlh, this.x, this.y + 2 * this.lineHeight);
             
            // inner 
            ctx.bezierCurveTo(this.x + 3 * hlh, this.y + 2 * hlh, this.x + 3 * hlh, this.y, this.x + hlh * 3 / 2, this.y - this.lineHeight);
            ctx.bezierCurveTo(this.x - hlh, this.y - this.lineHeight, this.x - hlh / 2, this.y, this.x, this.y)  

           // ctx.stroke();
            ctx.fill();

            ctx.beginPath();

            ctx.arc(this.x + 4 * hlh, this.y - hlh, hlh / 2, 0, 2 * Math.PI);
            ctx.arc(this.x + 4 * hlh, this.y + hlh, hlh / 2, 0, 2 * Math.PI);

            ctx.fill();
            
            return true;
        }

    }

    export function getDrawingFromClef(clef: Model.Clef): Drawing.Clef {
        var drawing: Drawing.Clef = null;

        switch (clef.clefType) {
            case Model.ClefType.GClef:
                drawing = new Drawing.GClef(clef.drawLocation);
                break;
            case Model.ClefType.CClef:
                drawing = new Drawing.CClef(clef.drawLocation);
                break;
            case Model.ClefType.FClef:
                drawing = new Drawing.FClef(clef.drawLocation);
                break;
        }

        return drawing;

    }

} 