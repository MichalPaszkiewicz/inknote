module Inknote.Compressed {

    export class CompressedProject implements INameable {

        ID: string;

        inknoteVersion: string;

        instruments: Compressed.Instrument[];

        colour: string = "#FFFFFF";

        composer: string;
        arrangedBy: string;
        notes: string;

        constructor(public name?: string) {

            this.ID = getID();
            this.instruments = [];

            if (!name) {
                this.name = this.ID;
            }

        }

    }

} 