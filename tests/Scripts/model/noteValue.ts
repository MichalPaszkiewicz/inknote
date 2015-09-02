/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("noteValue enum", function () {

        it("has A value in correct place", function () {
            expect(Model.NoteValue.A).toBe(0);
        });

        it("has Bb value in correct place", function () {
            expect(Model.NoteValue.Bb).toBe(1);
        });

        it("has B value in correct place", function () {
            expect(Model.NoteValue.B).toBe(2);
        });

        it("has C value in correct place", function(){
            expect(Model.NoteValue.C).toBe(3);
        });

        it("has Db value in correct place", function () {
            expect(Model.NoteValue.Db).toBe(4);
        });

        it("has D value in correct place", function () {
            expect(Model.NoteValue.D).toBe(5);
        });

        it("has Eb value in correct place", function () {
            expect(Model.NoteValue.Eb).toBe(6);
        });

        it("has E value in correct place", function () {
            expect(Model.NoteValue.E).toBe(7);
        });

        it("has F value in correct place", function () {
            expect(Model.NoteValue.F).toBe(8);
        });

        it("has Gb value in correct place", function () {
            expect(Model.NoteValue.Gb).toBe(9);
        });

        it("has G value in correct place", function () {
            expect(Model.NoteValue.G).toBe(10);
        });

        it("has Ab value in correct place", function () {
            expect(Model.NoteValue.Ab).toBe(11);
        });
    });

    describe("is black key", function () {
        
        it("describes A correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.A)).toBe(false);
        });

        it("describes Bb correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.Bb)).toBe(true);
        });

        it("describes B correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.B)).toBe(false);
        });

        it("describes C correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.C)).toBe(false);
        });

        it("describes Db correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.Db)).toBe(true);
        });

        it("describes D correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.D)).toBe(false);
        });

        it("describes Eb correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.Eb)).toBe(true);
        });

        it("describes E correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.E)).toBe(false);
        });

        it("describes F correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.F)).toBe(false);
        });

        it("describes Gb correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.Gb)).toBe(true);
        });

        it("describes G correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.G)).toBe(false);
        });

        it("describes Ab correctly", function () {
            expect(Model.IsBlackKey(Model.NoteValue.Ab)).toBe(true);
        });

    });

    describe("is white key", function () {

        it("describes A correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.A)).toBe(true);
        });

        it("describes Bb correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.Bb)).toBe(false);
        });

        it("describes B correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.B)).toBe(true);
        });

        it("describes C correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.C)).toBe(true);
        });

        it("describes Db correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.Db)).toBe(false);
        });

        it("describes D correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.D)).toBe(true);
        });

        it("describes Eb correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.Eb)).toBe(false);
        });

        it("describes E correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.E)).toBe(true);
        });

        it("describes F correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.F)).toBe(true);
        });

        it("describes Gb correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.Gb)).toBe(false);
        });

        it("describes G correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.G)).toBe(true);
        });

        it("describes Ab correctly", function () {
            expect(Model.IsWhiteKey(Model.NoteValue.Ab)).toBe(false);
        });

    });
} 
