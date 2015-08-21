module Inknote.Model {

    export class Bar {
        ID: string = getID();

        items: (Rest | Note | Chord | Clef)[] = [];

        constructor() {

        }

    }

} 