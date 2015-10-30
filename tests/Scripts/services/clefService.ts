/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("getNextClef", function () {

        it("gets the correct clef going down from French violin clef", function () {
            var result =  getNextClef(new Model.FrenchViolinClef(), false) instanceof Model.TrebleClef;
            
            expect(result).toBe(true); 
        }); 
        
        it("gets the right clef going down from Treble", function () {
            var result = getNextClef(new Model.TrebleClef(), false) instanceof Model.SopranoClef;
             
            expect(result).toBe(true);
        });

        it("gets the right clef going down from soprano clef", function () {
            var result = getNextClef(new Model.SopranoClef(), false) instanceof Model.MezzoSopranoClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going down from mezzosoprano clef", function () {
            var result = getNextClef(new Model.MezzoSopranoClef(), false) instanceof Model.AltoClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going down from alto clef", function () {
            var result = getNextClef(new Model.AltoClef(), false) instanceof Model.TenorClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going down from tenor clef", function () {
            var result = getNextClef(new Model.TenorClef(), false) instanceof Model.BaritoneClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going down from baritone clef", function () {
            var result = getNextClef(new Model.BaritoneClef(), false) instanceof Model.BassClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going down from bass clef", function () {
            var result = getNextClef(new Model.BassClef(), false) instanceof Model.SubbassClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going down from subbass clef", function () {
            var result = getNextClef(new Model.SubbassClef(), false) instanceof Model.FrenchViolinClef;

            expect(result).toBe(true);
        });


        it("gets the correct clef going up from French violin clef", function () {
            var result = getNextClef(new Model.FrenchViolinClef(), true) instanceof Model.SubbassClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from Treble", function () {
            var result = getNextClef(new Model.TrebleClef(), true) instanceof Model.FrenchViolinClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from soprano clef", function () {
            var result = getNextClef(new Model.SopranoClef(), true) instanceof Model.TrebleClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from mezzosoprano clef", function () {
            var result = getNextClef(new Model.MezzoSopranoClef(), true) instanceof Model.SopranoClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from alto clef", function () {
            var result = getNextClef(new Model.AltoClef(), true) instanceof Model.MezzoSopranoClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from tenor clef", function () {
            var result = getNextClef(new Model.TenorClef(), true) instanceof Model.AltoClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from baritone clef", function () {
            var result = getNextClef(new Model.BaritoneClef(), true) instanceof Model.TenorClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from bass clef", function () {
            var result = getNextClef(new Model.BassClef(), true) instanceof Model.BaritoneClef;

            expect(result).toBe(true);
        });

        it("gets the right clef going up from subbass clef", function () {
            var result = getNextClef(new Model.SubbassClef(), true) instanceof Model.BassClef;

            expect(result).toBe(true);
        });
    });


} 