/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("getNoteOfDistance", function () {

        it("gets a different note", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0) == newNote).toBe(false);
        });

        it("gets a note with a different ID", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0).ID == newNote.ID).toBe(false);
        });

        it("gets the correct type of object", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0) instanceof Model.Note).toBe(true);
        });

        it("gets a note", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0)).toBeTruthy();
        });

        it("gets a note with correct length breve", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Breve);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Breve);
        });

        it("gets a note with correct length semibreve", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.SemiBreve);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.SemiBreve);
        });

        it("gets a note with correct length minim", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Minim);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Minim);
        });

        it("gets a note with correct length crotchet", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a note with correct length quaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Quaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.Quaver);
        });

        it("gets a note with correct length semiquaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.SemiQuaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.SemiQuaver);
        });

        it("gets a note with correct length demisemiquaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.DemiSemiQuaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.DemiSemiQuaver);
        });

        it("gets a note with correct length hemidemisemiquaver", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.HemiDemiSemiQuaver);
            expect(getNoteOfDistance(newNote, 0).length).toBe(Model.NoteLength.HemiDemiSemiQuaver);
        });

        it("gets note distance 0 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0).value).toBe(Model.NoteValue.A);    
        });

        it("gets note distance 0 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 0).octave).toBe(4);
        });

        it("gets note distance 1 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 1).value).toBe(Model.NoteValue.Bb);
        });

        it("gets note distance 1 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 1).octave).toBe(4);
        });

        it("gets note distance 2 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 2).value).toBe(Model.NoteValue.B);
        });

        it("gets note distance 2 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 2).octave).toBe(4);
        });

        it("gets note distance 3 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 3).value).toBe(Model.NoteValue.C);
        });

        it("gets note distance 3 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 3).octave).toBe(5);
        });

        it("gets note distance 4 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 4).value).toBe(Model.NoteValue.Db);
        });

        it("gets note distance 4 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 4).octave).toBe(5);
        });

        it("gets note distance 5 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 5).value).toBe(Model.NoteValue.D);
        });

        it("gets note distance 5 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 5).octave).toBe(5);
        });

        it("gets note distance 6 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 6).value).toBe(Model.NoteValue.Eb);
        });

        it("gets note distance 6 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 6).octave).toBe(5);
        });

        it("gets note distance 7 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 7).value).toBe(Model.NoteValue.E);
        });

        it("gets note distance 7 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 7).octave).toBe(5);
        });

        it("gets note distance 8 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 8).value).toBe(Model.NoteValue.F);
        });

        it("gets note distance 8 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 8).octave).toBe(5);
        });

        it("gets note distance 9 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 9).value).toBe(Model.NoteValue.Gb);
        });
          
        it("gets note distance 9 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 9).octave).toBe(5);
        }); 

        it("gets note distance 10 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 10).value).toBe(Model.NoteValue.G);
        });

        it("gets note distance 10 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 10).octave).toBe(5);
        });

        it("gets note distance 11 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 11).value).toBe(Model.NoteValue.Ab);
        });

        it("gets note distance 11 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 11).octave).toBe(5);
        });

        it("gets note distance 12 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.A);
        });

        it("gets note distance 12 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Bb4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Bb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Bb);
        });

        it("gets note distance 12 from Bb4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Bb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from B4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.B, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.B);
        });

        it("gets note distance 12 from B4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.B, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from C4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.C);
        });

        it("gets note distance 12 from C4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Db4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Db, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Db);
        });

        it("gets note distance 12 from Db4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Db, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from D4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.D, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.D);
        });

        it("gets note distance 12 from D4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.D, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Eb4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Eb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Eb);
        });

        it("gets note distance 12 from Eb4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Eb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from E4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.E, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.E);
        });

        it("gets note distance 12 from E4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.E, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from F4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.F, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.F);
        });

        it("gets note distance 12 from F4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.F, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Gb4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Gb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Gb);
        });

        it("gets note distance 12 from Gb4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Gb, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from G4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.G);
        });

        it("gets note distance 12 from G4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        });

        it("gets note distance 12 from Ab4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).value).toBe(Model.NoteValue.Ab);
        });

        it("gets note distance 12 from Ab4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 12).octave).toBe(5);
        }); 

        it("gets note distance 36 from Ab4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 36).value).toBe(Model.NoteValue.Ab);
        });

        it("gets note distance 36 from Ab4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, 36).octave).toBe(7);
        }); 
           
        // test negative values.
           
        it("gets note distance -12 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -12).value).toBe(Model.NoteValue.A);
        });     

        it("gets note distance -12 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -12).octave).toBe(3);
        });   

        it("gets note distance -24 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -24).value).toBe(Model.NoteValue.A);
        }); 
         
        it("gets note distance -24 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -24).octave).toBe(2);
        });
         
        it("gets note distance -1 from A4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -1).value).toBe(Model.NoteValue.Ab);
        });

        it("gets note distance -1 from A4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -1).octave).toBe(4);
        }); 

        it("gets note distance -1 from C4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -1).value).toBe(Model.NoteValue.B);
        });

        it("gets note distance -1 from C4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -1).octave).toBe(3);
        });

        it("gets note distance -13 from C4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -13).value).toBe(Model.NoteValue.B);
        });
         
        it("gets note distance -13 from C4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -13).octave).toBe(2);
        }); 
           
        // todo: more testing for negative cases
         
        it("gets note distance -4 from C4 with correct noteValue", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -4).value).toBe(Model.NoteValue.Ab);
        });

        it("gets note distance -4 from C4 with correct octave", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getNoteOfDistance(newNote, -4).octave).toBe(3);
        }); 
    });
     
    describe("getThird", function () {

        it("gets a correct third from A4", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getThird(newNote).value).toBe(Model.NoteValue.Db);
            expect(getThird(newNote).octave).toBe(5);
            expect(getThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct third from C4", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getThird(newNote).value).toBe(Model.NoteValue.E);
            expect(getThird(newNote).octave).toBe(4);
            expect(getThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct third from Ab4", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getThird(newNote).value).toBe(Model.NoteValue.C);
            expect(getThird(newNote).octave).toBe(5);
            expect(getThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });
    });

    describe("getMajorThird", function () {

        it("gets a correct third from A4", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getMajorThird(newNote).value).toBe(Model.NoteValue.Db);
            expect(getMajorThird(newNote).octave).toBe(5);
            expect(getMajorThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        }); 

        it("gets a correct third from C4", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getMajorThird(newNote).value).toBe(Model.NoteValue.E);
            expect(getMajorThird(newNote).octave).toBe(4);
            expect(getMajorThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct third from Ab4", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getMajorThird(newNote).value).toBe(Model.NoteValue.C);
            expect(getMajorThird(newNote).octave).toBe(5);
            expect(getMajorThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });  
    });  

    describe("getMinorThird", function () {

        it("gets a correct third from A4", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getMinorThird(newNote).value).toBe(Model.NoteValue.C);
            expect(getMinorThird(newNote).octave).toBe(5);
            expect(getMinorThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct third from C4", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getMinorThird(newNote).value).toBe(Model.NoteValue.Eb);
            expect(getMinorThird(newNote).octave).toBe(4);
            expect(getMinorThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct third from Ab4", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getMinorThird(newNote).value).toBe(Model.NoteValue.B);
            expect(getMinorThird(newNote).octave).toBe(4);
            expect(getMinorThird(newNote).length).toBe(Model.NoteLength.Crotchet);
        });
    }); 

    describe("getFlatFifth", function () {

        it("gets a correct note from A4", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getFlatFifth(newNote).value).toBe(Model.NoteValue.Eb);
            expect(getFlatFifth(newNote).octave).toBe(5);
            expect(getFlatFifth(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from C4", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getFlatFifth(newNote).value).toBe(Model.NoteValue.Gb);
            expect(getFlatFifth(newNote).octave).toBe(4);
            expect(getFlatFifth(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from Ab4", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getFlatFifth(newNote).value).toBe(Model.NoteValue.D);
            expect(getFlatFifth(newNote).octave).toBe(5);
            expect(getFlatFifth(newNote).length).toBe(Model.NoteLength.Crotchet);
        });
    }); 

    describe("getFifth", function () {

        it("gets a correct note from A4", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getFifth(newNote).value).toBe(Model.NoteValue.E);
            expect(getFifth(newNote).octave).toBe(5);
            expect(getFifth(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from C4", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getFifth(newNote).value).toBe(Model.NoteValue.G);
            expect(getFifth(newNote).octave).toBe(4);
            expect(getFifth(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from Ab4", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getFifth(newNote).value).toBe(Model.NoteValue.Eb);
            expect(getFifth(newNote).octave).toBe(5);
            expect(getFifth(newNote).length).toBe(Model.NoteLength.Crotchet);
        });
    }); 

    describe("getSeventh", function () {
        it("gets a correct note from A4", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getSeventh(newNote).value).toBe(Model.NoteValue.G);
            expect(getSeventh(newNote).octave).toBe(5);
            expect(getSeventh(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from C4", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getSeventh(newNote).value).toBe(Model.NoteValue.Bb);
            expect(getSeventh(newNote).octave).toBe(4);
            expect(getSeventh(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from Ab4", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getSeventh(newNote).value).toBe(Model.NoteValue.Gb);
            expect(getSeventh(newNote).octave).toBe(5);
            expect(getSeventh(newNote).length).toBe(Model.NoteLength.Crotchet);
        });
    }); 
     
    describe("getMajorSeventh", function () {
        it("gets a correct note from A4", function () {
            var newNote = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getMajorSeventh(newNote).value).toBe(Model.NoteValue.Ab);
            expect(getMajorSeventh(newNote).octave).toBe(5);
            expect(getMajorSeventh(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from C4", function () {
            var newNote = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getMajorSeventh(newNote).value).toBe(Model.NoteValue.B);
            expect(getMajorSeventh(newNote).octave).toBe(4);
            expect(getMajorSeventh(newNote).length).toBe(Model.NoteLength.Crotchet);
        });

        it("gets a correct note from Ab4", function () {
            var newNote = new Model.Note(Model.NoteValue.Ab, 4, Model.NoteLength.Crotchet);
            expect(getMajorSeventh(newNote).value).toBe(Model.NoteValue.G);
            expect(getMajorSeventh(newNote).octave).toBe(5);
            expect(getMajorSeventh(newNote).length).toBe(Model.NoteLength.Crotchet);
        });
    }); 
      
    describe("getIntervalDistance", function () {
            
        it("gets correct distance between G4 and A4", function () {
            var g4 = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);
            var a4 = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getIntervalDistance(g4, a4)).toBe(1);
        }); 
         
        it("gets correct distance between A4 and G4", function () {
            var g4 = new Model.Note(Model.NoteValue.G, 4, Model.NoteLength.Crotchet);
            var a4 = new Model.Note(Model.NoteValue.A, 4, Model.NoteLength.Crotchet);
            expect(getIntervalDistance(a4, g4)).toBe(-1);
        }); 

        it("gets correct distance between C4 and D4", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            var d4 = new Model.Note(Model.NoteValue.D, 4, Model.NoteLength.Crotchet);
            expect(getIntervalDistance(c4, d4)).toBe(1);
        });

        it("gets correct distance between D4 and C4", function () {
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            var d4 = new Model.Note(Model.NoteValue.D, 4, Model.NoteLength.Crotchet);
            expect(getIntervalDistance(d4, c4)).toBe(-1);
        });

        it("gets correct distance between B3 and C4", function () {
            var b3 = new Model.Note(Model.NoteValue.B, 3, Model.NoteLength.Crotchet);
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getIntervalDistance(b3, c4)).toBe(1);
        });

        it("gets correct distance between C4 and B3", function () {
            var b3 = new Model.Note(Model.NoteValue.B, 3, Model.NoteLength.Crotchet);
            var c4 = new Model.Note(Model.NoteValue.C, 4, Model.NoteLength.Crotchet);
            expect(getIntervalDistance(c4, b3)).toBe(-1);
        });

    });
} 