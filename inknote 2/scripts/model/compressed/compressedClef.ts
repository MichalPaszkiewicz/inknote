module Inknote.Compressed {

    export enum CompressedClefType {
        FRENCH_VIOLIN,
        TREBLE,
        SOPRANO,
        MEZZ_SOPRANO,
        ALTO,
        TENOR,
        BARITONE,
        BASS,
        SUBBASS
    }

    export class CompressedClef {

        i: ItemIdentifier = ItemIdentifier.CLEF;

        constructor(public v: CompressedClefType) {

        }

    }

} 