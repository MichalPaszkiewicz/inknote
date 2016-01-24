/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("a new instrument", function () {

        var newInstrument = new Model.Instrument("piano");

        it("has a bars field", function () {
            expect(newInstrument.bars).toBeDefined();
        });

        it("has a visible field", function () {
            expect(newInstrument.visible).toBeDefined();
        });

        it("has a name field", function () {
            expect(newInstrument.name).toBeDefined();
        });

        it("has name set correctly", function () {
            expect(newInstrument.name).toBe("piano");
        });

        it("has an ID field", function () {
            expect(newInstrument.ID).toBeDefined();
        });

        it("has ID field set", function () {
            expect(newInstrument.ID).toBeTruthy();
        });
    });

} 