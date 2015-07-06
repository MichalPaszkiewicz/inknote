module Inknote {

    export function notesAreEqual(note1: Model.Note, note2: Model.Note) {
        return note1.value == note2.value
            && note1.octave == note2.octave
            && note1.length == note2.length;
    }

    export function notePitchesAreEqual(note1: Model.Note, note2: Model.Note) {
        return note1.value == note2.value
            && note1.octave == note2.octave;
    }

    export function requiredNoteSpace(note: Drawing.Note, lineHeight: number): number {
        // width of head.
        var spaceNeeded = lineHeight;

        if (note.noteLength > Model.NoteLength.Crotchet && note.stemUp) {
            spaceNeeded += lineHeight;
        }

        //padding
        spaceNeeded += lineHeight;

        return spaceNeeded;
    }

    // ID is set correctly. x and y currently not.
    // x and y to be set after getting?
    // todo: check if stem up or down.
    export function getDrawingItemFromNote(note: Model.Note) {
        var tempDrawing: Drawing.Note = null;

        var stemUp = true;

        switch (note.length) {
            case Model.NoteLength.Breve:
                tempDrawing = new Drawing.Breve(stemUp);
                break;
            case Model.NoteLength.SemiBreve:
                tempDrawing = new Drawing.SemiBreve(stemUp);
                break;
            case Model.NoteLength.Minim:
                tempDrawing = new Drawing.Minim(stemUp);
                break;
            case Model.NoteLength.Crotchet:
                tempDrawing = new Drawing.Crotchet(stemUp);
                break;
            case Model.NoteLength.Quaver:
                tempDrawing = new Drawing.Quaver(stemUp);
                break;
            case Model.NoteLength.SemiQuaver:
                tempDrawing = new Drawing.SemiQuaver(stemUp);
                break;
            case Model.NoteLength.DemiSemiQuaver:
                tempDrawing = new Drawing.DemiSemiQuaver(stemUp);
                break;
            case Model.NoteLength.HemiDemiSemiQuaver:
                tempDrawing = new Drawing.HemiDemiSemiQuaver(stemUp);
                break;
            default:
                tempDrawing = new Drawing.Crotchet(stemUp);
                break;
        }

        tempDrawing.ID = note.ID;

        return tempDrawing;
    }
} 