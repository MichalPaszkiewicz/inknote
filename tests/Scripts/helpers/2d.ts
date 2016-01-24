/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("a new vector2", function () {

        it("sets values correctly", function () {
            var x = 2.17;
            var y = 3.14;

            var testVector2 = new Maths.Vector2(x, y);

            expect(testVector2.x).toBe(x);
            expect(testVector2.y).toBe(y);
        });

        it("calculates abs correctly", function () {
            var x = 3;
            var y = 4;

            var testVector2 = new Maths.Vector2(x, y);

            expect(testVector2.abs).toBe(5);
        });

    });

} 