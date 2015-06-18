module Inknote {

    export class CompressedProject implements INameable {

        ID: string;

        constructor(public name?) {

            this.ID = getID();

            if (!name) {
                this.name = this.ID;
            }

        }

    }

} 