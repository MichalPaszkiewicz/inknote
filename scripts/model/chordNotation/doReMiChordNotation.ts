module Inknote.ChordNotation {

    function getDoReMiTextFrom(index: Model.NoteValue) {
        return [
            "Do",
            "Di",
            "Re",
            "Ri",
            "Me",
            "Mi",
            "Fa",
            "Fi",
            "Sol",
            "Si",
            "La",
            "Li",
            "Te",
            "Ti"
        ][index];
    }

    export class DoReMiChordNotation implements IChordable {

        baseNote: Model.Note;
        rootNote: Model.Note;
        minor: boolean;
        annotations: string;

        constructor(baseNote: Model.Note, rootNote: Model.Note, minor: boolean, annotations: string) {
            this.baseNote = baseNote;
            this.rootNote = rootNote;
            this.minor = minor;
            this.annotations = annotations;
        }

        get name(): string {
            // note: low priority.
            // todo: finish naming system;
            throw new Error("Not implemented");
            return;
        }

    }

} 