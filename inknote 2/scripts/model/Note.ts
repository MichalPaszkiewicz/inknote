module Inknote.Model{

    export class Note {

        value: NoteValue;

        length: NoteLength;

        octave: number;

        constructor(value: NoteValue, octave: number, length: NoteLength) {
            this.value = value;
            this.octave = octave,
            this.length = length;
        }
    }

}