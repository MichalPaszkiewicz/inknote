/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("note AccidentalType enum", function () {
        it("has sharp value in correct place", function () {
            expect(Model.AccidentalType.Sharp).toBe(0);
        });

        it("has flat value in correct place", function () {
            expect(Model.AccidentalType.Flat).toBe(1);
        });

        it("has natural value in correct place", function () {
            expect(Model.AccidentalType.Natural).toBe(2);
        });

        it("has doubleSharp value in correct place", function () {
            expect(Model.AccidentalType.DoubleSharp).toBe(3);
        });

        it("has doubleFlat value in correct place", function () {
            expect(Model.AccidentalType.DoubleFlat).toBe(4);
        });
    });

    describe("a new note", function () {
        var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);

        it("has a value field", function () {
            expect(newNote.value).toBeDefined();
        });

        it("has value field set correctly", function () {
            expect(newNote.value).toBe(Model.NoteValue.C);
        });

        it("has an octave field", function () {
            expect(newNote.octave).toBeDefined();
        });

        it("has octave field set correctly", function () {
            expect(newNote.octave).toBe(4);
        });

        it("has a length field", function () {
            expect(newNote.length).toBeDefined();
        });

        it("has length field set correctly", function () {
            expect(newNote.length).toBe(Model.NoteLength.Crotchet);
        });

        it("has an ID field", function () {
            expect(newNote.ID).toBeDefined();
        });

        it("has ID field set", function () {
            expect(newNote.ID).toBeTruthy();
        });

    });

}

 