module Inknote {

    export class Setting implements INameable {

        name: string;
        ID: string;
        testMode: boolean;

        staveColour = "black";
        noteColour = "red";
        textColour = "green";

        keypressFuncsOn = true;

        serverURL = "https://lit-basin-6551.herokuapp.com";

        constructor(name?: string) {
            this.ID = getID();
            this.name = name;
            this.testMode = false;

            if (!name) {
                this.name = this.ID;
            }
        }
    }
} 