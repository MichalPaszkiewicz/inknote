module Inknote.Model {

    export class Text implements IIdentifiable{
        ID: string = getID();

        content: string;

        constructor(txt: string) {
            this.content = txt;
        }

    }

}