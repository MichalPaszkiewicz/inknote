module Inknote {

    export class Rest extends Notation{

        constructor(drawFunction: (ctx: CanvasRenderingContext2D) => boolean) {

            super(drawFunction);

        }

    }

} 