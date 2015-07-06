module Inknote {

    // returns a new note that is # semitones away from note. + is higher
    export function getNoteOfDistance(note: Model.Note, semitones: number): Model.Note {

        var tempNote = new Model.Note(note.value, note.octave, note.length);

        if (Math.round(semitones) != semitones) {
            throw new Error("Number of semitones must be an integer");
        }

        tempNote.value = (note.value + semitones % 12);
        if (semitones > 0) {
            tempNote.octave = note.octave + Math.floor(semitones / 12);
        }
        if (semitones < 0) {
            tempNote.octave = note.octave + Math.ceil(semitones / 12);
        }

        return tempNote;
    }

    export function getThird(note: Model.Note): Model.Note {
        return getNoteOfDistance(note, 4);
    }

    export function getMajorThird(note: Model.Note): Model.Note {
        return getThird(note);
    }

    export function getMinorThird(note: Model.Note): Model.Note {
        return getNoteOfDistance(note, 3);
    }

    export function getFlatFifth(note: Model.Note): Model.Note {
        return getNoteOfDistance(note, 6);
    }

    export function getFifth(note: Model.Note): Model.Note {
        return getNoteOfDistance(note, 7);
    }

    export function getSeventh(note: Model.Note): Model.Note {
        return getNoteOfDistance(note, 10);
    }

    export function getMajorSeventh(note: Model.Note): Model.Note{
        return getNoteOfDistance(note, 11);
    }
} 