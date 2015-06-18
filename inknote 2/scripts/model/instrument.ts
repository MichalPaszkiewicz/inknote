module Inknote {

    export class Instrument {

        visible: boolean;
        bars: Bar[];

        constructor(public name: string) {
            this.bars = [];

            this.bars.push(new Bar());
        }

    }

} 