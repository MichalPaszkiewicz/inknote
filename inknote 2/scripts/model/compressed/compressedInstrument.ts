module Inknote.Compressed {

    export class Instrument {

        bars: Bar[];
        synthID: string;
        synthName: string;

        v: boolean = true;

        constructor(public name: string) {
            this.bars = [];
        }

    }

} 