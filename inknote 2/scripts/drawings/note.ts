module Inknote {

    export class Note extends Notation {

        constructor(drawFunction: (ctx: CanvasRenderingContext2D) => boolean) {

            super(drawFunction);

        }

    }

}