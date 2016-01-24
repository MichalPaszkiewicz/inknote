module Inknote.Compressed {

    export class CompressedChord {

        i: ItemIdentifier = ItemIdentifier.CHORD;

        constructor(public notes: CompressedNote[]) {

        }
    }

} 