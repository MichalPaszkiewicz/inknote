/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("getNoteOfDistance", function () {

        it("gets a note", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0)).toBeTruthy();
        });

        it("gets a note with correct length breve", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Breve);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Breve);
        });

        it("gets a note with correct length semibreve", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.SemiBreve);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.SemiBreve);
        });

        it("gets a note with correct length minim", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Minim);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Minim);
        });

        it("gets a note with correct length crotchet", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a note with correct length quaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Quaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Quaver);
        });

        it("gets a note with correct length semiquaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.SemiQuaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.SemiQuaver);
        });

        it("gets a note with correct length demisemiquaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.DemiSemiQuaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.DemiSemiQuaver);
        });

        it("gets a note with correct length hemidemisemiquaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.HemiDemiSemiQuaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.HemiDemiSemiQuaver);
        });

        it("gets note distance 0 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0).value).toBe(Model.NoteValue.A);    
        });

        it("gets note distance 0 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0).octave).toBe(4);
        });

        it("gets note distance 1 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 1).value).toBe(Model.NoteValue.Bb);
        });

        it("gets note distance 1 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 1).octave).toBe(4);
        });

        it("gets note distance 2 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 2).value).toBe(Model.NoteValue.B);
        });

        it("gets note distance 2 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 2).octave).toBe(4);
        });

        it("gets note distance 3 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 3).value).toBe(Model.NoteValue.C);
        });

        it("gets note distance 3 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 3).octave).toBe(4);
        });

        it("gets note distance 4 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 4).value).toBe(Model.NoteValue.Db);
        });

        it("gets note distance 4 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 4).octave).toBe(4);
        });

        it("gets note distance 5 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 5).value).toBe(Model.NoteValue.D);
        });

        it("gets note distance 5 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 5).octave).toBe(4);
        });

        it("gets note distance 6 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 6).value).toBe(Model.NoteValue.Eb);
        });

        it("gets note distance 6 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 6).octave).toBe(4);
        });

        it("gets note distance 7 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 7).value).toBe(Model.NoteValue.E);
        });

        it("gets note distance 7 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 7).octave).toBe(4);
        });

        it("gets note distance 8 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 8).value).toBe(Model.NoteValue.F);
        });

        it("gets note distance 8 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 8).octave).toBe(4);
        });

        it("gets note distance 9 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 9).value).toBe(Model.NoteValue.Gb);
        });

        it("gets note distance 9 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 9).octave).toBe(4);
        });

        it("gets note distance 10 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 10).value).toBe(Model.NoteValue.G);
        });

        it("gets note distance 10 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 10).octave).toBe(4);
        });

        it("gets note distance 11 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 11).value).toBe(Model.NoteValue.Ab);
        });

        it("gets note distance 11 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 11).octave).toBe(4);
        });

        it("gets note distance 12 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.A);
        });

        it("gets note distance 12 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Bb4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Bb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Bb);
        });

        it("gets note distance 12 from Bb4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Bb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from B4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.B, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.B);
        });

        it("gets note distance 12 from B4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.B, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from C4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.C);
        });

        it("gets note distance 12 from C4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Db4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Db, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Db);
        });

        it("gets note distance 12 from Db4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Db, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from D4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.D, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.D);
        });

        it("gets note distance 12 from D4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.D, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Eb4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Eb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Eb);
        });

        it("gets note distance 12 from Eb4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Eb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from E4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.E, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.E);
        });

        it("gets note distance 12 from E4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.E, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from F4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.F, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.F);
        });

        it("gets note distance 12 from F4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.F, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Gb4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Gb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Gb);
        });

        it("gets note distance 12 from Gb4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Gb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from G4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.G);
        });

        it("gets note distance 12 from G4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Ab4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Ab);
        });

        it("gets note distance 12 from Ab4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });
        // test starting from other notes.

        // test negative values.
    });

} 