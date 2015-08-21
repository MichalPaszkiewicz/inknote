/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("french violin clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.FrenchViolinClef()).clefType).toBe(Model.ClefType.GClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.FrenchViolinClef()).positionFromTreble).toBe(2);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.FrenchViolinClef()).drawLocation).toBe(8);
        });
    });

    describe("treble clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.TrebleClef()).clefType).toBe(Model.ClefType.GClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.TrebleClef()).positionFromTreble).toBe(0);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.TrebleClef()).drawLocation).toBe(6);
        });
    });

    describe("soprano clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.SopranoClef()).clefType).toBe(Model.ClefType.CClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.SopranoClef()).positionFromTreble).toBe(-2);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.SopranoClef()).drawLocation).toBe(8);
        });
    });

    describe("mezzo soprano clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.MezzoSopranoClef()).clefType).toBe(Model.ClefType.CClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.MezzoSopranoClef()).positionFromTreble).toBe(-4);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.MezzoSopranoClef()).drawLocation).toBe(6);
        });
    });

    describe("alto clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.AltoClef()).clefType).toBe(Model.ClefType.CClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.AltoClef()).positionFromTreble).toBe(-6);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.AltoClef()).drawLocation).toBe(4);
        });
    });

    describe("tenor clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.TenorClef()).clefType).toBe(Model.ClefType.CClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.TenorClef()).positionFromTreble).toBe(-8);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.TenorClef()).drawLocation).toBe(2);
        });
    });

    describe("baritone clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.BaritoneClef()).clefType).toBe(Model.ClefType.FClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.BaritoneClef()).positionFromTreble).toBe(-10);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.BaritoneClef()).drawLocation).toBe(4);
        });
    });


    describe("bass clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.BassClef()).clefType).toBe(Model.ClefType.FClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.BassClef()).positionFromTreble).toBe(-12);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.BassClef()).drawLocation).toBe(2);
        });
    });


    describe("subbass clef", function () {

        it("has the correct clef type", function () {
            expect((new Model.SubbassClef()).clefType).toBe(Model.ClefType.FClef);
        });

        it("sets the correct position for notes", function () {
            expect((new Model.SubbassClef()).positionFromTreble).toBe(-14);
        });

        it("has the correct drawing location value", function () {
            expect((new Model.SubbassClef()).drawLocation).toBe(0);
        });
    });
}