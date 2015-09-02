module Inknote.Compressed {

    export class Instrument {

        bars: Bar[];

        v: boolean = true;

        constructor(public name: string) {
            this.bars = [];
        }

    }

} 