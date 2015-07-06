module Inknote.ChordNotation {

    function getStandardTextFrom(index: Model.NoteValue) {
        return [
            "C",
            "Db",
            "D",
            "Eb",
            "E",
            "F",
            "Gb",
            "G",
            "Ab",
            "A",
            "Bb",
            "B",
        ][index];
    }

    export class StandardChordNotation implements IChordable {
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
            var text = getStandardTextFrom(this.rootNote.value);

            if (this.minor) {
                text += "m";
            }

            text = text + this.annotations;

            if (this.baseNote.value != this.rootNote.value) {
                text += "/" + getStandardTextFrom(this.baseNote.value);
            }

            return text;
        }
    }

}  