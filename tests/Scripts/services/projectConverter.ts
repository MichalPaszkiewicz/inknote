/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("compressing, then decompressing project", function () {

        var testProject: Project;

        var compressedProject: Compressed.CompressedProject;

        var decompressedProject: Project;

        beforeEach(function () {

            testProject = new Project("Blob");

            testProject.colour = "#FF0000";
            testProject.composer = "Michal Paszkiewicz";
            testProject.arrangedBy = "Michal Paszkiewicz";
            testProject.notes = "6 * 9 base 13 = 42";

            var i0 = new Model.Instrument("guitar");
            var i1 = new Model.Instrument("piano");
            var i2 = new Model.Instrument("violin");
            var i3 = new Model.Instrument("charango");
            var i4 = new Model.Instrument("double bass");
            var i5 = new Model.Instrument("clarinet");

            for (var i = 0; i < 10; i++) {
                i0.bars.push(new Model.Bar());
                i1.bars.push(new Model.Bar());
                i2.bars.push(new Model.Bar());
                i3.bars.push(new Model.Bar());
                i4.bars.push(new Model.Bar());
                i5.bars.push(new Model.Bar());
            }
 
            testProject.instruments = [i0, i1, i2, i3, i4, i5];
            compressedProject = ProjectConverter.compress(testProject);
            decompressedProject = ProjectConverter.decompress(compressedProject);

        });

        it("maintains same number of instruments", function () {
            expect(decompressedProject.instruments.length).toBe(testProject.instruments.length);
        });

        it("maintains same number of bars in all instruments", function () {
            for (var i = 0; i < testProject.instruments.length; i++) {
                expect(decompressedProject.instruments[i].bars.length).toBe(testProject.instruments[i].bars.length);
            }
        });

        it("keeps the same ID", function () {
            expect(decompressedProject.ID).toBe(testProject.ID);
        });

        it("keeps the same name", function () {
            expect(decompressedProject.name).toBe(testProject.name);
        });

        it("keeps the same colour", function () {
            expect(decompressedProject.colour).toBe(testProject.colour);
        });

        it("keeps the same composer", function () {
            expect(decompressedProject.composer).toBe(testProject.composer);
        });

        it("keeps the same arranger", function () {
            expect(decompressedProject.arrangedBy).toBe(testProject.arrangedBy);
        });

        it("keeps the same notes", function () {
            expect(decompressedProject.notes).toBe(testProject.notes);
        });
    });

}