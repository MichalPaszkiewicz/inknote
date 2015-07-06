module Inknote.Drawing {

    export class Background implements IDrawable {

        private static _instance: Background;

        static get Instance() {
            if (!Background._instance) {
                Background._instance = new Background();
            }

            return Background._instance;
        }

        ID = getID();
        x: number;
        y: number;
        hover: boolean;
        select: boolean;

        isOver(x: number, y: number, canvas: HTMLCanvasElement) {
            this.mouse.x = x;
            this.mouse.y = y;
            return false;
        }

        order = -10;

        mouse = { x: -100, y: -100 };

        t = 0;

        spinners = [];

        constructor() {

        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scale: number) {

            
            for (var i = 0; i < canvas.width; i += 4){
                ctx.beginPath();
                ctx.moveTo(i, 0);

                // bulge around mouse?
                //var dif = this.chase.x - i;
                //if (dif > 0 && dif < 8) dif = 8;
                //if (dif <= 0 && dif > -8) dif = -8;
                //var blah = 100 / (dif);

                //if (Math.abs(dif) < 200) {
                //    ctx.lineTo(i, this.mouse.y - Math.abs(blah) - 20);
                //    ctx.bezierCurveTo(i - blah, this.mouse.y, i - blah, this.mouse.y, i, this.mouse.y + Math.abs(blah) + 20);
                //    ctx.lineTo(i, canvas.height);
                //    ctx.
                //}
                //else {
                //}

                ctx.lineTo(i, canvas.height);
                ctx.strokeStyle = Colours.faintBlue;
                ctx.stroke();
            }
        
            this.t++;

            // signature
            ctx.save();
            ctx.beginPath();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-Math.PI / 4);
            ctx.font = Fonts.watermark;
            ctx.textAlign = "center";
            ctx.fillStyle = Colours.watermarkGray;
            ctx.fillText("with ♥ - inknote", 0, 0);
            ctx.restore();

            return true;
        }


    }

}