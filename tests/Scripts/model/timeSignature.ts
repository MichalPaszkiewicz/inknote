/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("new time signature", function () {

        it("cannot have a top decimal", function () {
            expect(function () { new Model.TimeSignature(1.1, 1); }).toThrow(new Error("Time signatures can only take integers"));
        });

        it("cannot have a bottom decimal", function () {
            expect(function () { new Model.TimeSignature(1, 1.1); }).toThrow(new Error("Time signatures can only take integers"));
        });

        it("cannot take a 0 value in the top", function () {
            expect(function () {
                new Model.TimeSignature(0, 1);
            }).toThrow(new Error("Time signatures can only take integers"));
        });

        it("cannot take a 0 value in the bottom", function () {
            expect(function () {
                new Model.TimeSignature(1, 0);
            }).toThrow(new Error("Time signatures can only take integers"));
        });
    }); 

} 