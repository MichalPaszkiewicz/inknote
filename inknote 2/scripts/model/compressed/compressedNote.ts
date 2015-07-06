module Inknote.Compressed {

    export class CompressedNote {

        constructor(
            public value: Model.NoteValue,
            public octave: number,
            public length: Model.NoteLength
            ) {

        }
    }

}