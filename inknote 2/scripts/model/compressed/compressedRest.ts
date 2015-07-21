module Inknote.Compressed {

    export class CompressedRest {

        i: ItemIdentifier = ItemIdentifier.REST;

        constructor(
            public length: Model.NoteLength
            ) {

        }
    }

} 