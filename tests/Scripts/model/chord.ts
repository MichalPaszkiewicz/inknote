/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("new chord", function () {
        
        var newChord = new Model.Chord([]);

        it("has an ID field", function () {
            expect(newChord.ID).toBeDefined();
        });

        it("has ID field set", function () {
            expect(newChord.ID).toBeTruthy();
        });

        it("has a notes field", function () {
            expect(newChord.notes).toBeDefined();
        }); 
         
        it("has notes correctly set", function () {
            expect(newChord.notes.length).toBe(0);
        });

    });

    describe("new chord with notes specified", function () {

        var note1 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
        var note2 = new Model.Note(Model.NoteValue.E, 4, Model.NoteLength.Crotchet);
        var note3 = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);

        var newChord = new Model.Chord([note1, note2, note3]);

        it("has notes correctly set", function () {
            expect(newChord.notes.length).toBe(3);

            expect(newChord.notes[0]).toBe(note1);
            expect(newChord.notes[1]).toBe(note2);
            expect(newChord.notes[2]).toBe(note3);
        });

    });

} 