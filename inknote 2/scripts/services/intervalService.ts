module Inknote {

    // returns a new note that is # semitones away from note. + is higher
    export function getNoteOfDistance(note: Model.Note, semitones: number): Model.Note {

        var correctSemitones = semitones;
        while (correctSemitones < 0) {
            correctSemitones += 12;
        }

        var tempNote = new Model.Note(note.value, note.octave, note.length);

        if (Math.round(semitones) != semitones) {
            throw new Error("Number of semitones must be an integer");
        }

        tempNote.value = ((note.value + correctSemitones) % 12);

        if (semitones > 0) {
            for (var i = 1; i <= semitones; i++) {
                var norm = (note.value + i) % 12;

                if (norm == Model.NoteValue.C) {
                    tempNote.octave++;
                }
            }
        }
        if (semitones < 0) {
            for (var i = 1; i >= semitones; i--) {

                var norm = note.value + i;
                while (norm < 0) {
                    norm += 12;
                }

                if (norm == Model.NoteValue.B) {
                    tempNote.octave--;
                }
            }
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

    export function getMajorSeventh(note: Model.Note): Model.Note {
        return getNoteOfDistance(note, 11);
    }

    export function getIntervalDistance(note: Model.Note, note2: Model.Note): number {

        var distanceFromOctave = (note2.octave - note.octave) * 7;

        var note1Value = note.value;

        var norm1 = note.value < Model.NoteValue.C ? note.value + 12: note.value;
        var norm2 = note2.value < Model.NoteValue.C ? note2.value + 12: note2.value;

        var diff = norm2 - norm1;

        var distanceOfNote = 0;

        if (diff > 0) {

            for (var i = 0; i < diff; i++) {
                if (!Model.IsBlackKey((i + note1Value) % 12)) {
                    distanceOfNote++;
                }
            }
             
        }
        else {
            for (var i = 0; i > diff; i--) {
                if (!Model.IsBlackKey((i + 11 + note1Value) % 12)) {
                    distanceOfNote--;
                }
            }
        }

        return distanceFromOctave + distanceOfNote;
    }
} 