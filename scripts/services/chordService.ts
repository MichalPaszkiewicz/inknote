module Inknote {

    // note: actually only checks pitches, not note length.
    export function noteIsInChord(note: Model.Note, chord: Model.Chord): boolean {
        for (var i = 0; i < chord.notes.length; i++) {
            if (notePitchesAreEqual(note, chord.notes[i])) {
                return true;
            }
        }
        return false;
    }

    export function getMajorTriad(startNote: Model.Note): Model.Chord {
        var tempNotes = [
            startNote,
            getMajorThird(startNote),
            getFifth(startNote)
        ];

        return new Model.Chord(tempNotes);
    }

    export function getMinorTriad(startNote: Model.Note): Model.Chord {
        var tempNotes = [
            startNote,
            getMinorThird(startNote),
            getFifth(startNote)
        ];

        return new Model.Chord(tempNotes);
    }

} 