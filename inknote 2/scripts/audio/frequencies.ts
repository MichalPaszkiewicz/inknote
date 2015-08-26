module Inknote.Audio {

    export function getFrequencyFromNote(note: Model.Note): number {

        var result: number;

        var noteVal = note.value;

        // case for octave 4.
        switch (noteVal) {
            case Model.NoteValue.C:
                result = 261.63;
                break;
            case Model.NoteValue.Db:
                result = 277.18;
                break;
            case Model.NoteValue.D:
                result = 293.66;
                break;
            case Model.NoteValue.Eb:
                result = 311.13;
                break;
            case Model.NoteValue.E:
                result = 329.63;
                break;
            case Model.NoteValue.F:
                result = 349.23;
                break;
            case Model.NoteValue.Gb:
                result = 369.99;
                break;
            case Model.NoteValue.G:
                result = 392.00;
                break;
            case Model.NoteValue.Ab:
                result = 415.30;
                break;
            case Model.NoteValue.A:
                result = 440.00;
                break;
            case Model.NoteValue.Bb:
                result = 466.16;
                break;
            case Model.NoteValue.B:
                result = 493.88;
                break;
        }

        var octave = note.octave;

        result *= Math.pow(2, octave - 4);

        return result;
    }

}