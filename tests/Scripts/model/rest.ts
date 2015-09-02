/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("a new rest", function () {
        var newRest = new Model.Rest(Model.NoteLength.Crotchet);

        it("has an ID field", function () {
            expect(newRest.ID).toBeDefined();
        });

        it("has ID field set", function () {
            expect(newRest.ID).toBeTruthy();
        });

        it("has a length field", function () {
            expect(newRest.length).toBeDefined();
        });

        it("has length field set correctly", function () {
            expect(newRest.length).toBe(Model.NoteLength.Crotchet);
        });

    });

} 