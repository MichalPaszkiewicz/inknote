module Inknote.Compressed {

    export class CompressedTimeSignature {

        i: Compressed.ItemIdentifier = Compressed.ItemIdentifier.TIMESIGNATURE;

        constructor(public t: number, public b: number) {

        }

    }

}