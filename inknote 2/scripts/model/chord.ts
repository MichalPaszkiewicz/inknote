module Inknote.Model{

    export class Chord {

        ID: string = getID();

        notes: Note[];

        constructor(notes: Note[]) {
            this.notes = notes;
        }
    }

} 