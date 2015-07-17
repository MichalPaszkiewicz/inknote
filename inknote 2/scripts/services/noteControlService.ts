module Inknote {

    export class NoteControlService {

        private static _instance: NoteControlService;

        static get Instance() {
            if (!NoteControlService._instance) {
                NoteControlService._instance = new NoteControlService();
            }
            return NoteControlService._instance;
        }

        private piano: Drawing.Piano = new Drawing.Piano();
        private background: Drawing.NoteControlBackground = new Drawing.NoteControlBackground();

        x = 0;
        y: number;
        width: number;
        height: number;

        ID: string = "note_control";

        getItems(drawer: DrawService): IDrawable[]{
            this.y = drawer.canvas.height / 2;
            this.width = drawer.canvas.width;
            this.height = drawer.canvas.height / 2;

            var noteControls = [];

            this.background.width = this.width;
            this.background.height = this.height;
            this.background.y = this.y;
            noteControls.push(this.background);

            this.piano.width = this.width;
            this.piano.height = this.height / 2;
            this.piano.y = this.y + this.height / 2
            noteControls.push(this.piano);

            return noteControls;
        }

        constructor() {
            this.piano.ID = this.ID;
            this.background.ID = this.ID;
        }
    }

} 