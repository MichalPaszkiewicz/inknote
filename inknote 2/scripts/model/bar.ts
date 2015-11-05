module Inknote.Model {

    export class Bar implements IIdentifiable{
        ID: string = getID();

        items: (Rest | Note | Chord | Clef | TimeSignature | Model.Text)[] = [];

        constructor() {

        }

    }

} 