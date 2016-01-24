module Inknote.Compressed {

    export class CompressedRest {

        i: ItemIdentifier = ItemIdentifier.REST;

        constructor(
            public l: Model.NoteLength
            ) {

        }
    }

} 