module Inknote {

    export class NoteControlService {

        private static _instance: NoteControlService;

        static get Instance() {
            if (!NoteControlService._instance) {
                NoteControlService._instance = new NoteControlService();
            }
            return NoteControlService._instance;
        }

        piano: Drawing.Piano = new Drawing.Piano();
        private background: Drawing.NoteControlBackground = new Drawing.NoteControlBackground();
        lengthControl: Drawing.LengthControlBar = new Drawing.LengthControlBar();

        x = 0;
        y: number;
        width: number;
        height: number;

        ID: string = "note_control";

        getItems(drawer: DrawService): IDrawable[]{
            this.y = drawer.canvas.height / 2;
            this.width = Math.min(drawer.canvas.width, 800);
            this.height = drawer.canvas.height / 2;

            var noteControls = [];

            this.background.width = this.width;
            this.background.height = this.height;
            this.background.y = this.y;
            noteControls.push(this.background);

            this.lengthControl.y = this.y + this.height / 4;
            this.lengthControl.width = this.width;
            this.lengthControl.height = this.height / 4;
            noteControls.push(this.lengthControl);

            this.piano.width = this.width;
            this.piano.height = this.height / 2;
            this.piano.y = this.y + this.height / 2;
            noteControls.push(this.piano);

            return noteControls;
        }

        addNote(note: Model.Note) {
            var project = Managers.ProjectManager.Instance.currentProject;

            var instrument = project.instruments[0];

            if (instrument.bars.length == 0) {
                instrument.bars.push(new Model.Bar());
            }

            var bar = instrument.bars[0];

            bar.items.push(note);

            ScoringService.Instance.refresh();

        }

        editNoteValueAndOctave(value: Model.NoteValue, octave: number) {

            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];

                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == ScoringService.Instance.selectID) {
                            if (item instanceof Model.Note) {
                                item.value = value;
                                item.octave = octave;
                            }
                            else if (item instanceof Model.Rest) {

                            }
                            else if (item instanceof Model.Chord) {

                            }
                        }
                    }
                }
            }

            ScoringService.Instance.refresh();
        }

        constructor() {
            this.piano.ID = this.ID;
            this.background.ID = this.ID;
            this.lengthControl.ID = this.ID;
        }
    }

} 