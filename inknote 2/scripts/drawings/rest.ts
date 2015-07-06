module Inknote.Drawing {

    function restCommon(ctx: CanvasRenderingContext2D, rest: Rest) {
        ctx.strokeStyle = Colours.black;
        ctx.fillStyle = Colours.black;
        if (rest.hover) {
            ctx.strokeStyle = Colours.orange;
            ctx.fillStyle = Colours.orange;
        }
    }

    function drawSemiBreveRest(ctx: CanvasRenderingContext2D, x: number, y: number, height: number): void {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 2 * height, y);
        ctx.lineTo(x + 2 * height, y + height / 2);
        ctx.lineTo(x, y + height / 2);
        ctx.lineTo(x, y);
        ctx.fill();
    }

    function drawMinimRest(ctx: CanvasRenderingContext2D, x: number, y: number, height: number): void {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 2 * height, y);
        ctx.lineTo(x + 2 * height, y - height / 2);
        ctx.lineTo(x, y - height / 2);
        ctx.lineTo(x, y);
        ctx.fill();
    }

    function drawCrotchetRest(ctx: CanvasRenderingContext2D, x: number, y: number, height: number): void {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + height, y - height / 2, x, y - height);
        ctx.quadraticCurveTo(x + 2 * height, y, x + height / 2, y + height / 2);
        ctx.quadraticCurveTo(x - height, y + height, x + height / 2, y + 3 * height / 2);

        ctx.quadraticCurveTo(x - height / 2, y + 7 * height / 4, x, y + 5 * height / 2);
        ctx.quadraticCurveTo(x - 3 * height / 2, y + 6 * height / 4, x + height / 2, y + 3 * height / 2);

        ctx.quadraticCurveTo(x - 2 * height, y + height / 2, x, y);

        ctx.fill();
        ctx.stroke();
    }

    function drawQuaverRest(ctx: CanvasRenderingContext2D, x: number, y: number, height: number): void {
        ctx.beginPath();
        ctx.arc(x, y, height / 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x + height / 2, y + height, x + 3 * height / 2, y + height / 2, x + 2 * height, y);
        ctx.bezierCurveTo(x + 3 * height / 2, y + height / 2, x + height / 2, y + height, x - height / 5, y + height * 0.75 / 4);
        ctx.stroke();
        ctx.fill();

        ctx.moveTo(x + 2 * height, y);
        ctx.lineTo(x, y + height * 4);
        ctx.stroke();
    }

    function drawSemiQuaverRest(ctx: CanvasRenderingContext2D, x: number, y: number, height: number): void {
        drawQuaverRest(ctx, x, y, height);
        drawQuaverRest(ctx, x - height, y + 2 * height, height);
    }

    function drawDemiSemiQuaverRest(ctx: CanvasRenderingContext2D, x: number, y: number, height: number): void {
        drawQuaverRest(ctx, x, y, height);
        drawQuaverRest(ctx, x - height, y + 2 * height, height);
        drawQuaverRest(ctx, x + height, y - 2 * height, height);
    }

    function drawHemiDemiSemiQuaverRest(ctx: CanvasRenderingContext2D, x: number, y: number, height: number): void {
        drawQuaverRest(ctx, x, y, height);
        drawQuaverRest(ctx, x - height, y + 2 * height, height);
        drawQuaverRest(ctx, x + height, y - 2 * height, height);
        drawQuaverRest(ctx, x - height * 2, y + 4 * height, height);
    }

    /* y should be middle of second top line, ideally. */
    function drawRest(ctx: CanvasRenderingContext2D, x: number, y: number, duration, lineHeight: number): void {
        ctx.strokeStyle = Colours.black;
        ctx.fillStyle = Colours.black;
        var height = lineHeight / 2;
        if (duration.denom == 1) {
            switch (duration.num) {
                case 1:
                    drawCrotchetRest(ctx, x, y, height * 3 / 2);
                    break;
                case 2:
                    drawMinimRest(ctx, x, y + 2, height * 2);
                    break;
                case 4:
                    drawSemiBreveRest(ctx, x, y + 2, height * 2);
                    break;
            }
        }
        else {
            switch (duration.denom) {
                case 2:
                    drawQuaverRest(ctx, x, y, height);
                    break;
                case 4:
                    drawSemiQuaverRest(ctx, x, y, height);
                    break;
                case 8:
                    drawDemiSemiQuaverRest(ctx, x, y, height);
                    break;
                case 16:
                    drawHemiDemiSemiQuaverRest(ctx, x, y, height);
                    break;
            }
        }
        ctx.strokeStyle = Colours.black;
        ctx.fillStyle = Colours.black;
    }

    export class Rest extends Notation{

    }

    export class BreveRest extends Rest {

        // this is incorrect. currently draws a minim note;
        // todo: fix this.
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            ctx.beginPath();
            ctx.strokeStyle = Colours.black;
            ctx.fillStyle = Colours.black;
            ctx.rect(this.x - 5, this.y - 5, this.x + 5, this.y + 5);
            ctx.stroke();
            throw new Error("Incorrect breve rest drawing implementation");
            return true;
        }
    }

    export class SemiBreveRest extends Rest {
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            
            drawSemiBreveRest(ctx, this.x, this.y, 5);
            return true;
        }
    }

    export class MinimRest extends Rest {
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            drawMinimRest(ctx, this.x, this.y, 5);
            return true;
        }
    }

    export class CrotchetRest extends Rest {
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            drawCrotchetRest(ctx, this.x, this.y, 5);
            return true;
        }
    }

    export class QuaverRest extends Rest {
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            drawQuaverRest(ctx, this.x, this.y, 5);
            return true;
        }
    }

    export class SemiQuaverRest extends Rest {
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            drawSemiQuaverRest(ctx, this.x, this.y, 5);
            return true;
        }
    }

    export class DemiSemiQuaverRest extends Rest {
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            drawDemiSemiQuaverRest(ctx, this.x, this.y, 5);
            return true;
        }
    }

    export class HemiDemiSemiQuaverRest extends Rest {
        draw(ctx: CanvasRenderingContext2D) {
            restCommon(ctx, this);
            drawHemiDemiSemiQuaverRest(ctx, this.x, this.y, 5);
            return true;
        }
    }
} 