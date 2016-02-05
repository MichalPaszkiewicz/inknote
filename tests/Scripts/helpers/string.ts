/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("pascalCase", function () {

        it("returns pascal case string when given pascal case string", function () {

            expect(Inknote.pascalCase("AlreadyPascalCase")).toBe("AlreadyPascalCase");

        });

        it("returns pascal case string when not given pascal case string", function () {

            expect(Inknote.pascalCase("notAlreadyPascalCase")).toBe("NotAlreadyPascalCase");

        });
        
    });

} 