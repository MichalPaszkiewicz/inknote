module Inknote {

    export function allItemsAre(items: any[], xAndY: (item: any) => boolean) {
        if (items.length === 0) {
            return false;
        }
        for (var i = 0; i < items.length; i++) {
            if (!xAndY(items[i])) {
                return false;
            }
        }
        return true;
    }

    export function anyItemIs(items: any[], xAndY: (item: any) => boolean) {
        if (items === null || items === undefined) {
            return false;
        }
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                return true;
            }
        }
        return false;
    }

    export function countWhere(items: any[], xAndY: (item: any) => boolean) {
        if (items === null || items === undefined) {
            return 0;
        }
        var count = 0;
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                count++;
            }
        }
        return count;
    }

    export function maxOutOf(items: any[], xAndY: (item: any) => number) {
        if (items === null || items === undefined) {
            return -Infinity;
        }
        var max = -Infinity;
        for (var i = 0; i < items.length; i++) {
            var val = xAndY(items[i]);
            if (val > max) {
                max = val;
            }
        }
        return max;
    }

    export function minOutOf(items: any[], xAndY: (item: any) => number) {
        if (items === null || items === undefined) {
            return Infinity;
        }
        var max = Infinity;
        for (var i = 0; i < items.length; i++) {
            var val = xAndY(items[i]);
            if (val < max) {
                max = val;
            }
        }
        return max;
    }

    export function getFirstItemWhere(items: any[], xAndY: (item: any) => boolean): any {
        if (items === null || items === undefined) {
            return null;
        }
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                return items[i];
            }
        }
    }

    export function getItemsWhere(items: any[], xAndY: (item: any) => boolean): any[] {
        if (items === null || items === undefined) {
            return [];
        }
        var result = [];
        for (var i = 0; i < items.length; i++){
            if (xAndY(items[i])) {
                result.push(items[i]);
            }
        }
        return result;
    }

    export function sum(items: any[], xAndY: (item: any) => number): number {
        if (items == null || items.length == 0) {
            return 0;
        }
        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += xAndY(items[i]);
        }
        return total;
    }

    export function last(items: any[]) {
        if (items == null || items.length == 0) {
            return null; 
        }
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

        for (var i = 0, l = arrayOne.length; i < l; i++) {

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

    export function copySimpleArrayFrom(array: number[]| string[]): number[] | string[] {
        var newArray = [];

        for (var i = 0; i < array.length; i++) {
            newArray.push(array[i]);
        }

        return newArray;
    }
}