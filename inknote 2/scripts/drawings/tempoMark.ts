module Inknote.Drawing {

    export class TempoMark implements IDrawable {

        private static _instance: TempoMark;

        static get Instance() {
            if (!TempoMark._instance) {
                TempoMark._instance = new TempoMark();
            }
            return TempoMark._instance;
        }

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