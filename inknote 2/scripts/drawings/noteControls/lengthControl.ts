module Inknote.Drawing {

    export class LengthControlBar implements IDrawable{

        ID = getID();
        x = 0;
        y = 500;
        width = 500;
        height = 100;
        order = 200;
        hover: boolean;
        select: boolean;

        attached: IDrawable[] = [];

        isOver(x: number, y: number): boolean {
            var result = y > this.y && y < this.y + this.height;

            return result;
        }

        selectedLength: Model.NoteValue = 4;
        
        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            ctx.beginPath();
            ctx.fillStyle = Colours.white;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();

            var totalWidth = canvas.width;
            var oneEighth = totalWidth / 8;

            for (var i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.fillStyle = Colours.white;
                if (this.selectedLength == i) {
                    ctx.fillStyle = Colours.orange;
                }
                ctx.strokeStyle = Colours.black;
                ctx.rect(i * oneEighth, this.y, oneEighth, this.height);
                ctx.fill();
                ctx.stroke();

                this.attached[i].y = this.y + this.height * 3 / 4;
                this.attached[i].x = i * oneEighth + oneEighth / 2;
                this.attached[i].draw(ctx, canvas);
            }

            return true;
        }

        constructor() {
            this.attached.push(new Breve(true));
            this.attached.push(new SemiBreve(true));
            this.attached.push(new Minim(true));
            this.attached.push(new Crotchet(true));
            this.attached.push(new Quaver(true));
            this.attached.push(new SemiQuaver(true));
            this.attached.push(new DemiSemiQuaver(true));
            this.attached.push(new HemiDemiSemiQuaver(true));
        }
    }

} 