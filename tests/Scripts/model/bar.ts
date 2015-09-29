/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("a new bar", function () {
        var newBar = new Model.Bar();

        it("has an ID field", function () {
            expect(newBar.ID).toBeDefined();
        }); 

        it("has its ID field set", function () {
            expect(newBar.ID).toBeTruthy();
        });  

        it("has an items field", function () {
            expect(newBar.items.length).toBe(0);
        });
    });

}  