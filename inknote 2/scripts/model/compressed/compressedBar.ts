module Inknote.Compressed {

    // could contain chords & notes & rests.
    // simplest way to store...?
    export class Bar {
        
        items: (CompressedNote | CompressedRest | CompressedChord) [] = [];

        constructor() {

        }

    }

} 