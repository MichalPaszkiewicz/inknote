/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("note length enum", function () {

        it("has breve value in correct place", function () {
            expect(Model.NoteLength.Breve).toBe(0);
        });

        it("has semibreve value in correct place", function () {
            expect(Model.NoteLength.SemiBreve).toBe(1);
        });

        it("has minim value in correct place", function () {
            expect(Model.NoteLength.Minim).toBe(2);
        });

        it("has crotchet value in correct place", function () {
            expect(Model.NoteLength.Crotchet).toBe(3);
        });

        it("has quaver value in correct place", function () {
            expect(Model.NoteLength.Quaver).toBe(4);
        });

        it("has semiquaver value in correct place", function () {
            expect(Model.NoteLength.SemiQuaver).toBe(5);
        });

        it("has demisemiquaver value in correct place", function () {
            expect(Model.NoteLength.DemiSemiQuaver).toBe(6);
        });

        it("has hemidemisemiquaver value in correct place", function () {
            expect(Model.NoteLength.HemiDemiSemiQuaver).toBe(7);
        });
    });

} 