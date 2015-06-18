module Inknote {

    export class Project implements INameable {
        ID: string;
        name: string;
        pause: boolean;
        hover: boolean;
        instruments: Instrument[];

        constructor(name?: string) {
            this.pause = false;
            this.ID = getID();
            this.name = name;
            this.hover = false;
            this.instruments = [];

            if (!name) {
                this.name = "Untitled";
            }
        }
    }

}