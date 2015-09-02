module Inknote.Maths {

    export function isWithinRadius(x1: number, y1: number, x2: number, y2: number, radius: number) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        var dr = Math.sqrt(dx * dx + dy * dy);

        return dr <= radius;
    }

    function permutateSimpleNumberArray(array: number[]): number[] {
        var copiedArray = <number[]>copySimpleArrayFrom(array);

        var lastValue = copiedArray.pop();

        var permutatedArray = [lastValue].concat(copiedArray);

        return permutatedArray;
    }

    export function alignSimilarArrayTo(toBeAligned: number[], toAlignTo: number[]): number[] {
        var permutation = <number[]>copySimpleArrayFrom(toBeAligned)
        var bestValue = Infinity;
        var bestPermutation: number[] = <number[]>copySimpleArrayFrom(permutation);
        var permutations = toBeAligned.length;

        for (var i = 0; i < permutations; i++) {
            permutation = permutateSimpleNumberArray(permutation);

            var score = 0;
            // todo: if difference is less than bestValue
            for (var j = 0; j < permutation.length; j++) {
                score += Math.abs(permutation[j] - toAlignTo[j]);
            }

            if (score < bestValue) {
                bestPermutation = <number[]>copySimpleArrayFrom(permutation);
            }
        }

        return bestPermutation;
    }

    export function pythagoras(x, y) {
        return Math.sqrt(x * x + y * y);
    }

}