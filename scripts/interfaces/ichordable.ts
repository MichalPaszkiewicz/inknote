module Inknote {

    export interface IChordable {
        baseNote: Model.Note;
        rootNote: Model.Note;
        minor: boolean;
        annotations: string;
        name: string;
    }

} 