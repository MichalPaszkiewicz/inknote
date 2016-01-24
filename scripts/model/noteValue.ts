module Inknote.Model {

    export function GetNoteNameFromNoteValue(value: NoteValue): string {

        switch (value) {
            case NoteValue.A:
                return "A";
            case NoteValue.Bb:
                return "Bb";
            case NoteValue.B:
                return "B";
            case NoteValue.C:
                return "C";
            case NoteValue.Db:
                return "Db";
            case NoteValue.D:
                return "D";
            case NoteValue.Eb:
                return "Eb";
            case NoteValue.E:
                return "E";
            case NoteValue.F:
                return "F";
            case NoteValue.Gb:
                return "Gb";
            case NoteValue.G:
                return "G";
            case NoteValue.Ab:
                return "Ab";

        }

    }

    export enum NoteValue {
        A,
        Bb,
        B,
        C,
        Db,
        D,
        Eb,
        E,
        F,
        Gb,
        G,
        Ab
    }

    export function IsBlackKey(noteVal: NoteValue) {
        switch (noteVal){
            case NoteValue.A:
            case NoteValue.B:
            case NoteValue.C:
            case NoteValue.D:
            case NoteValue.E:
            case NoteValue.F:
            case NoteValue.G:
                return false;
            case NoteValue.Ab:
            case NoteValue.Bb:
            case NoteValue.Db:
            case NoteValue.Eb:
            case NoteValue.Gb:
                return true;
        }
    }

    export function IsWhiteKey(noteVal: NoteValue) {
        return !IsBlackKey(noteVal);
    }

} 