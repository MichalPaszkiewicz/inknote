module Inknote {

    export class Notation implements IDrawable, IIdentifiable{

        ID: string;
        x: number;
        y: number;
        order: number;
        options: DrawOptions;
        scale: number;
        hover: boolean;
        select: boolean;

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            return false;
        }

        isOver(x: number, y: number) {

            return Maths.isWithinRadius(x, y, this.x, this.y, 10);

        }

        constructor(drawFunction: (ctx: CanvasRenderingContext2D) => boolean) {
            this.ID = getID();
            this.order = 50;
        }
    }

}