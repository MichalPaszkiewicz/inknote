module Inknote {

    export function getIndexFromID(items: IIdentifiable[], ID: string) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].ID == ID) {
                return i;
            }
        }
        return null;
    }

    export function getItemFromID(items: IIdentifiable[], ID: string) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].ID == ID) {
                return items[i];
            }
        }
        return null;
    }

} 