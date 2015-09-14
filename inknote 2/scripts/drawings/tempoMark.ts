module Inknote.Drawing {

    export class TempoMark implements IDrawable {

        ID = getID();
        name: string;
        x = 0;
        set y(val: number) {
            return;
        }
        get y(): number {
            return -ScrollService.Instance.y;
        }
        order = 90;
        hover = false;
        select = false;

        isOver(x: number, y: number):boolean {

            return false;
        }

        draw(): boolean {



            return true;
        }

    }

} 