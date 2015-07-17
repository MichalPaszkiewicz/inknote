module Inknote {

    export class Notation implements IDrawable, IIdentifiable{

        private _id: string;

        // when attached, you will get id of parent item, thereby letting you e.g. select a note by clicking flat/sharp.
        get ID() {
            return this.attachedToID || this._id;
        }

        set ID(newValue: string) {
            this._id = newValue;
        }

        x: number;
        y: number;
        order = 50;
        options: DrawOptions;
        scale: number;
        hover: boolean;
        select: boolean;

        attachedToID: string;
        attached: Notation[] = [];

        // when items are attached, will hover together;
        attach(item: Notation) {
            item.attachedToID = this.ID;
            this.attached.push(item);
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            return false;
        }

        isOver(x: number, y: number) {
            var ISoverThis = Maths.isWithinRadius(x, y, this.x, this.y, 10); 

            var ISoverAttached = false;

            for (var i = 0; i < this.attached.length; i++) {
                if (this.attached[i].isOver(x,y)){
                    ISoverAttached = true;
                }
            }

            var IS = ISoverThis || ISoverAttached;

            return IS;

        }

        constructor(drawFunction?: (ctx: CanvasRenderingContext2D) => boolean) {
            this.ID = getID();
            if (drawFunction) {
                this.draw = drawFunction;
            }
        }
    }

}