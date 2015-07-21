module Inknote.Compressed {

    export class CompressedNote {

        i: ItemIdentifier = ItemIdentifier.NOTE;

        constructor(
            public value: Model.NoteValue,
            public octave: number,
            public length: Model.NoteLength
            ) {

        }
    }

}