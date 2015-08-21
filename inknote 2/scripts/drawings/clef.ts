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

            ctx.beginPath();
            ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
            ctx.strokeStyle = "green";

            ctx.stroke();


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