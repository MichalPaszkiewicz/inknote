module Inknote {

    export function allItemsAre(items: any[], xAndY: (item: any) => boolean) {
        for (var i = 0; i < items.length; i++) {
            if (!xAndY(items[i])) {
                return false;
            }
        }
        return true;
    }

    export function countWhere(items: any[], xAndY: (item: any) => boolean) {
        var count = 0;
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                count++;
            }
        }
        return count;
    }

    export function sum(items: any[], xAndY: (item: any) => number) {
        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += xAndY(items[i]);
        }
        return total;
    }

    export function last(items: any[]) {
        return items[items.length - 1];
    }

    export function arraysAreEqual(arrayOne: any[], arrayTwo: any[]) {
        // if first array is false, return
        if (!arrayOne) {
            return false;
        }

        // if the other array is a falsy value, return
        if (!arrayTwo) {
            return false;
        }

        // compare lengths - can save a lot of time 
        if (arrayOne.length != arrayTwo.length) {
            return false;
        }

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (arrayOne[i] instanceof Array && arrayTwo[i] instanceof Array) {
                // recurse into the nested arrays
                if (!arraysAreEqual(arrayOne[i], arrayTwo[i])) {
                    return false;
                }
            }
            else if (arrayOne[i] != arrayTwo[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
}