module Inknote.Model {

    // key types, e.g. minor, major, defined in keyDefinitions file.
    export class KeyType {

        name: string;
        intervals: number[];
        
        constructor(name: string, intervals: number[]) {
            this.name = name;
            this.intervals = intervals;
        }

    }

}