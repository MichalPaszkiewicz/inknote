module Inknote.ChordNotation {

    function getUPPER_lowerTextFrom(index: Model.NoteValue) {
        return [
            "C",
            "Cis",
            "D",
            "Dis",
            "E",
            "F",
            "Fis",
            "G",
            "Gis",
            "A",
            "B",
            "H",
        ][index]
    };

    export class UPPER_lowerChordNotation implements IChordable {
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
            var text = getUPPER_lowerTextFrom(this.rootNote.value);

            if (this.minor) {
                text = text.toLowerCase();
            }

            text = text + this.annotations;

            if (this.baseNote.value != this.rootNote.value) {
                text += "/" + getUPPER_lowerTextFrom(this.baseNote.value);
            }

            return text;
        }
    }

}  