module Inknote.Model {

    export class Instrument {

        visible: boolean;
        bars: Bar[];

        constructor(public name: string) {
            this.bars = [];
            this.visible = true;
        }

    }

} 