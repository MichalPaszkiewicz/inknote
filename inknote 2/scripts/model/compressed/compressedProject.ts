module Inknote.Compressed {

    export class CompressedProject implements INameable {

        ID: string;

        instruments: Compressed.Instrument[];

        constructor(public name?) {

            this.ID = getID();

            if (!name) {
                this.name = this.ID;
            }

        }

    }

} 