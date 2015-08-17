module Inknote.Compressed {

    export class Instrument {

        bars: Bar[];

        constructor(public name: string) {
            this.bars = [];
        }

    }

} 