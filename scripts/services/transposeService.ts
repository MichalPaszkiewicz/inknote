module Inknote {

    // transposes specified note
    // note: transposes existing note.
    export function transposeNote(note: Model.Note, semitones: number): void {
        var tempNote = getNoteOfDistance(note, semitones);

        note.value = tempNote.value;

        note.octave = tempNote.octave;
    }

    // transposes specified chord
    // note: transposes existing chord.
    export function transposeChord(chord: Model.Chord, semitones: number): void {
        for (var i = 0; i < chord.notes.length; i++) {
            transposeNote(chord.notes[i], semitones);
        }
    }
}