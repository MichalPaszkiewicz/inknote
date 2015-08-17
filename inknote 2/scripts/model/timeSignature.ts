module Inknote.Model{

    export class TimeSignature {

        constructor(public top: number, public bottom: number) {
            if (Math.round(top) != top || Math.round(bottom) != bottom || top == 0 || bottom == 0) {
                throw new Error("Time signatures can only take integers");
            } 
        }

    }

} 