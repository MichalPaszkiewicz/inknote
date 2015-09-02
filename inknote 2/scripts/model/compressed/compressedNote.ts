module Inknote.Compressed {

    export class CompressedNote {

        i: ItemIdentifier = ItemIdentifier.NOTE;

        constructor(
            public v: Model.NoteValue,
            public o: number,
            public l: Model.NoteLength
            ) {

        }
    }

}