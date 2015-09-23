module Inknote.Model {

    export class Instrument {

        ID: string = getID();
        visible: boolean;
        bars: Bar[];
        synthID: string;
        synthName: string;
        oscillatorType: Audio.SoundType = Audio.SoundType.sine;
       
        constructor(public name: string) {
            this.bars = [];
            this.visible = true;
        }

    }

} 