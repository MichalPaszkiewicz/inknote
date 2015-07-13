module Inknote.Plugins.Compressed {

    export class InknkotePlugin{
        ID: string = getID();

        active: boolean;

        onSave: () => void;
        allowOnSave: boolean = true;

        onDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
        allowOnDraw: boolean = true;

        URL: string;

        description: string;

        constructor(public name: string) {

        } 
    }

}