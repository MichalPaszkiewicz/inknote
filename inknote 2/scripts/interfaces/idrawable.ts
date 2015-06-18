module Inknote {

    export interface IDrawable extends IIdentifiable{

        draw: (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement, scale?: number) => boolean;
        x: number;
        y: number;
        order: number;
        isOver: (x: number, y: number, canvas: HTMLCanvasElement) => boolean;
        hover: boolean;
        select: boolean;
        drawOptions?: DrawOptions;

    }

}