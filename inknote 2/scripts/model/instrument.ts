module Inknote.Model {

    export class Instrument {

        ID: string = getID();
        visible: boolean;
        bars: Bar[];
        synthID: string;
        synthName: string;
       
        constructor(public name: string) {
            this.bars = [];
            this.visible = true;
        }

    }

} 