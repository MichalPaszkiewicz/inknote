module Inknote {
    export class Setting implements INameable {

        name: string;
        ID: string;
        testMode: boolean;
        displayID: boolean = false;

        notationType: NotationType;

        staveColour = "black";
        noteColour = "red";
        textColour = "green";

        constructor(name?: string) {
            this.ID = getID();
            this.name = name;
            this.testMode = false;
            this.notationType = NotationType.Standard;

            if (!name) {
                this.name = this.ID;
            }
        }
    }
} 