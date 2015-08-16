module Inknote.Model {

    export class Instrument {

        ID: string = getID();
        visible: boolean;
        bars: Bar[];

        constructor(public name: string) {
            this.bars = [];
            this.visible = true;
        }

    }

} 