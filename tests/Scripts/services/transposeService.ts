/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote {

    describe("transposeNote", function () {

        it("transposes C4 by 0 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 0);

            expect(c4.value).toBe(Model.NoteValue.C);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 1 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 1);

            expect(c4.value).toBe(Model.NoteValue.Db);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 2 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 2);

            expect(c4.value).toBe(Model.NoteValue.D);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 3 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 3);

            expect(c4.value).toBe(Model.NoteValue.Eb);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 4 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 4);

            expect(c4.value).toBe(Model.NoteValue.E);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 5 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 5);

            expect(c4.value).toBe(Model.NoteValue.F);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 6 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 6);

            expect(c4.value).toBe(Model.NoteValue.Gb);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 7 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 7);

            expect(c4.value).toBe(Model.NoteValue.G);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 8 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 8);

            expect(c4.value).toBe(Model.NoteValue.Ab);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 9 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 9);

            expect(c4.value).toBe(Model.NoteValue.A);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 10 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 10);

            expect(c4.value).toBe(Model.NoteValue.Bb);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 11 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 11);

            expect(c4.value).toBe(Model.NoteValue.B);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 12 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 12);

            expect(c4.value).toBe(Model.NoteValue.C);
            expect(c4.octave).toBe(5);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by 13 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, 13);

            expect(c4.value).toBe(Model.NoteValue.Db);
            expect(c4.octave).toBe(5);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes C4 by -1 semitones correctly", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            transposeNote(c4, -1);

            expect(c4.value).toBe(Model.NoteValue.B);
            expect(c4.octave).toBe(3);
            expect(c4.length).toBe(Model.NoteLength.Crotchet);
        });

        it("transposes A4 by -1 semitones correctly", function () {
            var a4 = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            transposeNote(a4, -1);
             
            expect(a4.value).toBe(Model.NoteValue.Ab);
            expect(a4.octave).toBe(4);
            expect(a4.length).toBe(Model.NoteLength.Crotchet);
        });
    });

    describe("transposeChord", function () {

        it("transposes a C4 major triad upwards correctly", function () {

            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            var e4 = new Model.Note(Model.NoteValue.E, 4, Model.NoteLength.Crotchet);
            var g4 = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);

            var Cmaj = new Model.Chord([c4, e4, g4]);

            transposeChord(Cmaj, 11);

            expect(c4.value).toBe(Model.NoteValue.B);
            expect(c4.octave).toBe(4);
            expect(e4.value).toBe(Model.NoteValue.Eb);
            expect(e4.octave).toBe(5);
            expect(g4.value).toBe(Model.NoteValue.Gb);
            expect(g4.octave).toBe(5);

        });

        it("transposes a C4 major triad downwards correctly", function () {

            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            var e4 = new Model.Note(Model.NoteValue.E, 4, Model.NoteLength.Crotchet);
            var g4 = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);

            var Cmaj = new Model.Chord([c4, e4, g4]);

            transposeChord(Cmaj, -13);

            expect(c4.value).toBe(Model.NoteValue.B);
            expect(c4.octave).toBe(2);
            expect(e4.value).toBe(Model.NoteValue.Eb);
            expect(e4.octave).toBe(3);
            expect(g4.value).toBe(Model.NoteValue.Gb);
            expect(g4.octave).toBe(3);

        });

    });
} 