module Inknote {

    // stores settings of items currently to be drawn.
    export class DrawingSettings {

        noteLength: Model.NoteLength;
        isNote: boolean;

        private static _instance;

        constructor() {       
            this.isNote = true;
        }

        static get Instance() {
            if (this._instance === null || this._instance === undefined) {
                this._instance = new DrawingSettings();
            }
            return this._instance;
        }
    }

} 