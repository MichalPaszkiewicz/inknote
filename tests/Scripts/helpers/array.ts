/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {

    var numbersList: number[];

    beforeEach(function () {
        numbersList = [];
        for (var i = 0; i < 20; i++) {
            numbersList.push(i);
        }
    });

    describe("allItemsAre", function () {

        it("gets all true result as true", function () {
            expect(allItemsAre(numbersList, function (num: number) {
                return num < 30;
            })).toBe(true);
        });

        it("gets all false results as false", function () {
            expect(allItemsAre(numbersList, function (num: number) {
                return num > 30;
            })).toBe(false);
        });

        it("gets all but 1 false results as false", function () {
            expect(allItemsAre(numbersList, function (num: number) {
                return num == 0;
            })).toBe(false);
        });

        it("gets all but 1 true results as false", function () {
            expect(allItemsAre(numbersList, function (num: number) {
                return num != 17;
            })).toBe(false);
        });

        it("doesn't affect the original array", function () {

            allItemsAre(numbersList, function (num: number) {
                return num < 30;
            });

            for (var i = 0; i < 20; i++) {
                expect(numbersList[i]).toBe(i);
            }
        });

        it("returns false if given an empty array", function () {
            expect(allItemsAre([], function (num: number) {
                return num < 30;
            })).toBe(false);
        });

        it("throws an error if given null", function () {
            expect(function () {
                allItemsAre(null, function (num: number) {
                    return num < 30;
                })
            }).toThrowError();
        });


        it("throws an error if given null", function () {
            expect(function () {
                allItemsAre(undefined, function (num: number) {
                    return num < 30;
                })
            }).toThrowError();
        });
    });

    describe("anyItemIs", function () {

        it("gets all true result as true", function () {
            expect(anyItemIs(numbersList, function (num: number) {
                return num < 30;
            })).toBe(true);
        });

        it("gets all false results as false", function () {
            expect(anyItemIs(numbersList, function (num: number) {
                return num > 30;
            })).toBe(false);
        });

        it("gets all but 1 false results as true", function () {
            expect(anyItemIs(numbersList, function (num: number) {
                return num == 0;
            })).toBe(true);
        });

        it("gets all but 1 true results as true", function () {
            expect(anyItemIs(numbersList, function (num: number) {
                return num != 17;
            })).toBe(true);
        });

        it("doesn't affect the original array", function () {

            anyItemIs(numbersList, function (num: number) {
                return num < 30;
            });
             
            for (var i = 0; i < 20; i++) {
                expect(numbersList[i]).toBe(i);
            }
        });

        it("returns false if given an empty array", function () {
            expect(anyItemIs([], function (num: number) {
                return num < 30;
            })).toBe(false);
        });

        it("returns false if given null", function () {
            expect(anyItemIs(null, function (num: number) {
                return num < 30;
            })).toBe(false);
        });

        it("returns false if given undefined", function () {
            expect(anyItemIs(undefined, function (num: number) {
                return num < 30;
            })).toBe(false);
        });
    });

    describe("countWhere", function () {

        it("counts all true results", function () {
            expect(countWhere(numbersList, function (num: number) {
                return num < 30;
            })).toBe(numbersList.length);
        });

        it("counts none from all false results", function () {
            expect(countWhere(numbersList, function (num: number) {
                return num > 30;
            })).toBe(0);
        });

        it("counts 1 from all but 1 false results", function () {
            expect(countWhere(numbersList, function (num: number) {
                return num == 0;
            })).toBe(1);
        });

        it("counts all but 1 from all but 1 true results", function () {
            expect(countWhere(numbersList, function (num: number) {
                return num != 17;
            })).toBe(numbersList.length - 1);
        });

        it("doesn't affect the original array", function () {

            countWhere(numbersList, function (num: number) {
                return num < 30;
            });

            for (var i = 0; i < 20; i++) {
                expect(numbersList[i]).toBe(i);
            }
        });

        it("returns 0 if given empty array", function () {

            expect(countWhere([], function (num: number) {
                return num < 30;
            })).toBe(0);

        });

        it("returns 0 if given null", function () {
            expect(countWhere(null, function (num: number) {
                return num < 30;
            })).toBe(0);
        });

        it("returns 0 if given undefined", function () {
            expect(countWhere(undefined, function (num: number) {
                return num < 30;
            })).toBe(0);
        });
    });

    describe("getItemsWhere", function () {

        it("gets all true results", function () {
            expect(getItemsWhere(numbersList, function (num: number) {
                return num < 30;
            }).length).toBe(numbersList.length);
        });

        it("gets none from all false results", function () {
            expect(getItemsWhere(numbersList, function (num: number) {
                return num > 30;
            }).length).toBe(0);
        });

        it("gets 1 from all but 1 false results", function () {
            expect(getItemsWhere(numbersList, function (num: number) {
                return num == 0;
            }).length).toBe(1);
        });

        it("gets all but 1 from all but 1 true results", function () {
            expect(getItemsWhere(numbersList, function (num: number) {
                return num != 17;
            }).length).toBe(numbersList.length - 1);
        });

        it("gets all the correct true results, in the correct order", function () {

            var result = getItemsWhere(numbersList, function (num: number) {
                return num >= 12;
            });

            for (var i = 0; i < result.length; i++) {
                expect(result[i]).toBe(12 + i);
            }
        });

        it("doesn't affect the original array", function () {

            getItemsWhere(numbersList, function (num: number) {
                return num < 30;
            });

            for (var i = 0; i < 20; i++) {
                expect(numbersList[i]).toBe(i);
            }
        });

        it("returns empty array if given empty array", function () {
            var result = getItemsWhere([], function (num: number) {
                return num < 30;
            });
            expect(result.length).toBe(0);
            expect(typeof result).toBe(typeof []);
        });

        it("returns empty array if given null", function () {
            var result = getItemsWhere(null, function (num: number) {
                return num < 30;
            });

            expect(result.length).toBe(0);
            expect(typeof result).toBe(typeof []);
        });

        it("returns empty array if given undefined", function () {
            var result = getItemsWhere(undefined, function (num: number) {
                return num < 30;
            });

            expect(result.length).toBe(0);
            expect(typeof result).toBe(typeof []);
        });

    });

    describe("sum", function () {

        it("adds items correctly", function () {
            expect(sum(numbersList, function (num: number) {
                return num;
            })).toBe(190);
        });

        it("adds numbers correctly with inline conditions", function () {
            expect(sum(numbersList, function (num: number) {
                return num < 4 ? num : 0;
            })).toBe(6)
        });

        it("adds constants correctly", function () {
            expect(sum(numbersList, function (num: number) {
                return 1;
            })).toBe(20);
        });

        it("doesn't affect the original array", function () {

            sum(numbersList, function (num: number) {
                return num;
            });

            for (var i = 0; i < 20; i++) {
                expect(numbersList[i]).toBe(i);
            }
        });

        it("returns 0 if given empty array", function () {
            expect(sum([], function (num: number) { return num; })).toBe(0);
        });

        it("returns 0 if given null", function () {
            expect(sum(null, function (num: number) {
                return num;
            })).toBe(0);
        });

        it("returns 0 if given null", function () {
            expect(sum(undefined, function (num: number) {
                return num;
            })).toBe(0);
        });

    });

    describe("last", function () {
        it("gets the last item from the array", function () {
            expect(last(numbersList)).toBe(19);
        });

        it("returns null if given empty array", function () {
            expect(last([])).toBe(null);
        });

        it("returns null if given null", function () {
            expect(last(null)).toBe(null);
        });

        it("returns null if given undefined", function () {
            expect(last(undefined)).toBe(null);
        });
    });

    describe("arraysAreEqual", function () {

        it("correctly tests true numerical arrays", function () {
            var otherTest = [];

            for (var i = 0; i < 20; i++) {
                otherTest.push(i);
            }

            expect(arraysAreEqual(numbersList, otherTest)).toBe(true);
        });

        it("correctly tests false numerical arrays of wrong length", function () {
            var otherTest = [];

            for (var i = 0; i < 21; i++) {
                otherTest.push(i);
            }    
             
            expect(arraysAreEqual(numbersList, otherTest)).toBe(false);
        });

        it("correctly tests false numerical arrays", function () {
            var otherTest = [];

            for (var i = 0; i < 20; i++) {
                otherTest.push(i + 1);
            }

            expect(arraysAreEqual(numbersList, otherTest)).toBe(false);
        });

        it("correctly tests true text arrays", function () {

            var test1 = [];
            var test2 = [];

            for (var i = 0; i < 20; i++) {
                var txt = "blah" + Math.random();
                test1.push(txt);
                test2.push(txt);
            }

            expect(arraysAreEqual(test1, test2)).toBe(true);

        });

        it("correctly tests false text arrays", function () {

            var test1 = [];
            var test2 = [];

            for (var i = 0; i < 20; i++) {
                var txt = "blah" + Math.random();
                test1.push(txt);
                test2.push(txt + "ha");
            }

            expect(arraysAreEqual(test1, test2)).toBe(false);

        });

        it("correctly tests empty arrays", function () {
            var test1 = [], test2 = [];

            expect(arraysAreEqual(test1, test2)).toBe(true);

        });

        it("correctly tests nested arrays", function () {

            var test1 = [];
            var test2 = [];

            for (var i = 0; i < 20; i++) {

                var tempArray = [];
                var tempArray2 = [];

                for (var j = 0; j < 20; j++) {
                    tempArray.push(j);
                    tempArray2.push(j);
                }

                test1.push(tempArray);
                test2.push(tempArray2);
            }

            expect(arraysAreEqual(test1, test2)).toBe(true);
        });

    });

    describe("copySimpleArrayFrom", function () {

        it("copies numerical arrays correctly", function () {
            expect(arraysAreEqual(copySimpleArrayFrom(numbersList), numbersList)).toBe(true);
        });

        it("does not just assign the same array to a different variable", function () {
            expect(copySimpleArrayFrom(numbersList) != numbersList);
        });
    });

    describe("maxOutOf", function () {
        
        it("returns -Infinity when given null", function () {
            expect(maxOutOf(null, function () { return 8 })).toBe(-Infinity);
        });

        it("returns -Infinity when given undefined", function () {
            expect(maxOutOf(undefined, function () { return 8 })).toBe(-Infinity);
        });

        it("returns correct value when straight numbers", function () {
            expect(maxOutOf([1, 2, 3, 4, 5], function (x) { return x })).toBe(5); 
        });

        it("returns correct value when all same", function () {
            expect(maxOutOf([5, 5, 5, 5, 5], function (x) { return x })).toBe(5);
        });

        it("returns correct value from object", function () {
            expect(maxOutOf([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], function (x) {
                return x.a;
            })).toBe(5);
        });

        it("returns correct calculated value", function () {
            expect(maxOutOf([1, 2, 3, 4, 5, 6], function (x) { return x * x })).toBe(36);
        });
    });

    describe("minOutOf", function () {

        it("returns Infinity when given null", function () {
            expect(minOutOf(null, function () { return 8 })).toBe(Infinity);
        });

        it("returns Infinity when given undefined", function () {
            expect(minOutOf(undefined, function () { return 8 })).toBe(Infinity);
        });

        it("returns correct value when straight numbers", function () {
            expect(minOutOf([1, 2, 3, 4, 5], function (x) { return x })).toBe(1);
        });

        it("returns correct value when all same", function () {
            expect(minOutOf([5, 5, 5, 5, 5], function (x) { return x })).toBe(5);
        });

        it("returns correct value from objects", function () {
            expect(minOutOf([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], function (x) {
                return x.a;
            })).toBe(1);
        });

        it("returns correct value from calculated values", function () {
            expect(minOutOf([2, 3, 4, 5, 6, 7, 8], function (x) {
                return x * x;
            })).toBe(4);
        });
    });

    describe("getItemWithMax", function () {
        
        it("returns correct value from a number array", function () {

            expect(getItemWithMax(numbersList, function (x: number) {
                return x;
            })).toBe(19);

        });

        it("returns correct value from an object array", function () {

            var objectList = [];

            var resultNum;

            for (var i = 0; i < 20; i++) {

                var num = { num: i + 10 };

                if (num.num == 29) {
                    resultNum = num;
                }

                objectList.push(num);
            }

            expect(getItemWithMax(objectList, function (x: { num: number }) {
                return x.num;
            })).toBe(resultNum);

        });

        it("returns null if null array", function () {

            expect(getItemWithMax(null, function (x: number) {
                return x;
            })).toBe(null);

        });

        it("returns null if null array, even if expecting object", function () {

            expect(getItemWithMax(null, function (x: any) {
                return x.a.b.c.d.e.f;
            })).toBe(null);

        });

    });

    describe("getItemsWithMin", function () {

        it("returns correct value from a number array", function () {

            expect(getItemWithMin([4, 4, 3, 7, 8], function (x: number) {
                return x;
            })).toBe(3);

        });

        it("returns correct value from an object array", function () {

            var objectList = [];

            var resultNum;

            for (var i = 0; i < 20; i++) {

                var num = { num: i + 10 };

                if (num.num == 10) {
                    resultNum = num;
                }

                objectList.push(num);
            }

            expect(getItemWithMin(objectList, function (x: { num: number }) {
                return x.num;
            })).toBe(resultNum);

        });

        it("returns null if given null array", function () {

            expect(getItemWithMin(null, function (x: number) {
                return x;
            })).toBe(null);

        });

        it("returns null if given null array, even if expecting object", function () {

            expect(getItemWithMin(null, function (x: any) {
                return x.a.b.c.d;
            })).toBe(null);

        });

    });

    describe("getFirstItemWhere", function () {

        it("returns null if given null array", function () {

            expect(getFirstItemWhere(null, function (x: number) {
                return x == 5;
            })).toBe(null);

        });

        it("returns null if given null array when expecting an object", function () {

            expect(getFirstItemWhere(null, function (x: any) {
                return x.a.b.c.d == 5;
            })).toBe(null);

        });

        it("returns the first item from number array", function () {

            expect(getFirstItemWhere([1, 2, 3, 4, 5, 4, 6, 2, 5], function (x: number) {
                return x == 3;
            })).toBe(3);

        });

        it("returns the first item from string array", function () {
            
            expect(getFirstItemWhere(["one", "two", "three", "four", "five"], function (x: string) {
                return x.indexOf("f") != -1;
            })).toBe("four");

        });

        it("returns the first item from an object array", function () {

            var objectList = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
            
            var resultNum = { a: 7, b: 4 };

            objectList.push(resultNum);

            expect(getFirstItemWhere(objectList, function (x: any) {
                return x.b == 4;
            })).toBe(resultNum);

        });

    });

}