/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("french violin clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.FrenchViolinClef()).clefType).toBe(Model.ClefType.GClef);
        });

    });

    describe("treble clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.TrebleClef()).clefType).toBe(Model.ClefType.GClef);
        });

    });

    describe("soprano clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.SopranoClef()).clefType).toBe(Model.ClefType.CClef);
        });

    });

    describe("mezzo soprano clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.MezzoSopranoClef()).clefType).toBe(Model.ClefType.CClef);
        });

    });

    describe("alto clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.AltoClef()).clefType).toBe(Model.ClefType.CClef);
        });

    });

    describe("tenor clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.TenorClef()).clefType).toBe(Model.ClefType.CClef);
        });

    });

    describe("baritone clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.BaritoneClef()).clefType).toBe(Model.ClefType.FClef);
        });

    });


    describe("bass clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.BassClef()).clefType).toBe(Model.ClefType.FClef);
        });

    });


    describe("subbass clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.SubbassClef()).clefType).toBe(Model.ClefType.FClef);
        });

    });
}