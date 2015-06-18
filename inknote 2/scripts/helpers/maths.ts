module Inknote.Maths {

    export function isWithinRadius(x1: number, y1: number, x2: number, y2: number, radius: number) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        var dr = Math.sqrt(dx * dx + dy * dy);

        return dr <= radius;
    }

}