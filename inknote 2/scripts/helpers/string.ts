module Inknote {

    export function getID(): string {
        return ((new Date).getTime() + "") + Math.floor(10000 * Math.random());
    }

    export function pascalCase(text: string) {
        var newString = "";
        var textArray = text.split("");
        for (var i = 0; i < textArray.length; i++) {
            if (i == 0) {
                newString += textArray[i].toUpperCase();
            }
            else {
                newString += textArray[i].toLowerCase();
            }
        }

        return newString;
    }

} 