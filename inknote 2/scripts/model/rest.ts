module Inknote.Model {

    export class Rest {

        ID: string = getID();

        constructor(public length: NoteLength) {

        }

    }

} 