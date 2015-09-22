module Inknote.Audio {

    export class Synth implements IIdentifiable {

        ID = getID();
        
        constructor(public name: string) {
            if (!name) {
                throw new Error("A synth must have a name!");
            }
        }

    }

}