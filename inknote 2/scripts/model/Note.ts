module Inknote.Model{

    export enum AccidentalType {
        Sharp,
        Flat,
        Natural,
        DoubleSharp,
        DoubleFlat,
    }

    export class Note {

        ID: string = getID();

        value: NoteValue;

        length: NoteLength;

        octave: number;

        accidentalType: AccidentalType;

        constructor(value: NoteValue, octave: number, length: NoteLength) {
            this.value = value;
            this.octave = octave;

            if(length === null || length === undefined) {
                length = NoteLength.Crotchet;
            }

            this.length = length;
        }
    }

}