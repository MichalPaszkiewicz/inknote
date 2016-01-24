/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    describe("isWithinRadius", function () {

        it("returns true when within", function () {

            expect(Maths.isWithinRadius(5, 5, 5, 6, 2)).toBe(true);

        });

        it("returns false when without", function () {

            expect(Maths.isWithinRadius(5, 5, 5, 6, 0.5)).toBe(false);

        });

        it("returns true when equal", function () {

            expect(Maths.isWithinRadius(5, 5, 5, 6, 1)).toBe(true);

        });

    });

    describe("permutateSimpleNumberArray", function () {

        it("permutates a number array correctly", function () {

            var array = [1, 3, 5, 7];

            var permutatedArray = Maths.permutateSimpleNumberArray(array);

            expect(permutatedArray[0]).toBe(array[3]);
            expect(permutatedArray[1]).toBe(array[0]);
            expect(permutatedArray[2]).toBe(array[1]);
            expect(permutatedArray[3]).toBe(array[2]);

        });

    });

    describe("pythagoras", function () {

        it("returns the correct value", function () {

            expect(Maths.pythagoras(3, 4)).toBe(5);
            expect(Maths.pythagoras(5, 12)).toBe(13);

        });

    });

    describe("align similar array to", function () {

        it("correctly aligns two arrays", function () {

            var arrayOne = [1, 2, 3, 4, 5, 6, 7];
            var arrayTwo = [2, 3, 4, 5, 6, 7, 1];

            var result = Maths.alignSimilarArrayTo(arrayOne, arrayTwo);

            expect(result[0]).toBe(2);
            expect(result[1]).toBe(3);
            expect(result[2]).toBe(4);
            expect(result[3]).toBe(5);
            expect(result[4]).toBe(6);
            expect(result[5]).toBe(7);
            expect(result[6]).toBe(1);

        });

        it("correctly aligns slightly differing arrays", function () {

            var arrayOne = [1, 2, 3, 7];
            var arrayTwo = [3, 6, 1, 2];

            var result = Maths.alignSimilarArrayTo(arrayOne, arrayTwo);

            expect(result[0]).toBe(3);
            expect(result[1]).toBe(7);
            expect(result[2]).toBe(1);
            expect(result[3]).toBe(2);

        });

        it("correctly aligns with all values out by one", function () {

            var arrayOne = [2, 3, 4, 5];
            var arrayTwo = [3, 4, 1, 2];

            var result = Maths.alignSimilarArrayTo(arrayOne, arrayTwo);

            expect(result[0]).toBe(4);
            expect(result[1]).toBe(5);
            expect(result[2]).toBe(2);
            expect(result[3]).toBe(3);

        });

    });

} 