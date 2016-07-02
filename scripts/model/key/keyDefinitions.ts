module Inknote.Model {

    var keyTypes = [
        new KeyType("major",
            [0, 2, 4, 5, 7, 9, 11]),
        new KeyType("melodic minor",
            [0, 2, 3, 5, 7, 8, 10]),
        new KeyType("harmonic minor",
            [0, 2, 3, 5, 7, 8, 11])
    ];

    export var C_MAJOR = new Key("C_MAJOR",
        [
            NoteValue.C, NoteValue.D, NoteValue.E,
            NoteValue.F, NoteValue.G, NoteValue.A, NoteValue.B
        ], [], []);

    function getSharpsFromNotesAndTranspose(notes: NoteValue[]): NoteValue[] {

        var aligned = Maths.alignSimilarArrayTo(notes, C_MAJOR.notesInKey);

        var sharps = [];

        for (var i = 0; i < aligned.length; i++) {
            if (aligned[i] == C_MAJOR.notesInKey[i] + 1) {
                sharps.push(C_MAJOR.notesInKey[i]);
            }
        }

        return sharps;
    }

    function getFlatsFromNotesAndTranspose(notes: NoteValue[]): NoteValue[] {

        var aligned = Maths.alignSimilarArrayTo(notes, C_MAJOR.notesInKey);

        var flats = [];

        for (var i = 0; i < aligned.length; i++) {
            if (aligned[i] == C_MAJOR.notesInKey[i] - 1) {
                flats.push(C_MAJOR.notesInKey[i]);
            }
        }

        return flats;
    }

    function getKeys(transpose?: number): Key[] {
        if (!transpose) {
            transpose = 0;
        }

        var allKeys: Key[] = [];

        for (var i = 0; i < keyTypes.length; i++) {
            var kt = keyTypes[i];

            for (var j in NoteValue) {
                if (isNaN(+j)) {
                    var allKeyNotes = [];
                    var baseNote = new Note(parseInt(NoteValue[j]), 4, 1);
                    baseNote.value = (baseNote.value + transpose) % 12;
                    for (var k = 0; k < kt.intervals.length; k++) {
                        var tempNote = getNoteOfDistance(baseNote, kt.intervals[k]);
                        allKeyNotes.push(tempNote.value);
                    }

                    allKeys.push(new Key(j + " " + kt.name, allKeyNotes, getSharpsFromNotesAndTranspose(allKeyNotes), getFlatsFromNotesAndTranspose(allKeyNotes)));
                }
            }
        }

        return allKeys;
    }

    export class KeyHolder {

        private static _instance: KeyHolder;

        static get Instance(): KeyHolder {
            if (!KeyHolder._instance) {
                KeyHolder._instance = new KeyHolder();
            }
            return KeyHolder._instance;
        }

        constructor() {

        }

        getAllKeys(transpose?: number): Key[] {
            return getKeys(transpose);
        }

    }
} 