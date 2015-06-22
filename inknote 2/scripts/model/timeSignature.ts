module Inknote.Model{

    export class TimeSignature {

        constructor(public top: number, public bottom: number) {
            if (Math.round(top) != top || Math.round(bottom) != bottom) {
                throw new Error("Time signatures can only take integers");
            }
        }

    }

} 