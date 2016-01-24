module Inknote.Model {

    // key will be an instance e.g. Bb minor.
    export class Key {
        name: string;
        notesInKey: NoteValue[];

        sharps: NoteValue[];
        flats: NoteValue[];

        constructor(name: string, notesInKey: NoteValue[], sharps: NoteValue[], flats: NoteValue[]) {
            this.name = name;
            this.notesInKey = notesInKey;
            this.sharps = sharps;
            this.flats = flats;
        }

        countSharps(): number {
            return this.sharps.length;
        }

        countFlats(): number {
            return this.flats.length;
        }

    }

} 