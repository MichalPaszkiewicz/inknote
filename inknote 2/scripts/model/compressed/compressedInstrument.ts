module Inknote.Compressed {

    export class Instrument {

        bars: Bar[];

        constructor(public name: string) {
            this.bars = [];

            this.bars.push(new Bar());
        }

    }

} 