module Inknote.Drawing {

    export class ScoreMenu implements IDrawable {

        private static _instance: ScoreMenu;

        static get Instance() {
            if (!ScoreMenu._instance) {
                ScoreMenu._instance = new ScoreMenu();
            }

            return ScoreMenu._instance;
        }

        ID = getID();
        draw: (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) => boolean;
        x: number;
        y: number;
        order = 150;
        isOver: (x: number, y: number, canvas: HTMLCanvasElement) => boolean;
        hover: boolean;
        select: boolean;
        drawOptions: DrawOptions;

        constructor() {

            var self = this;

            self.draw = function (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) {



                return true;
            }

        }

    }

} 