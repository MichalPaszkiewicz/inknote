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
        minimise: Drawing.Minimise = new Drawing.Minimise();
        restControl: Drawing.RestControl = new Drawing.RestControl();
        deleteNoteControl: Drawing.DeleteNoteControl = new Drawing.DeleteNoteControl();

        x = 0;
        y: number;
        width: number;
        height: number;

        hidden: boolean = TempDataService.Instance.currentData.noteControlsHidden;

        hiddenY: number = 0;
        firstOpen: boolean = true;

        hide() {
            this.hidden = true;
            TempDataService.Instance.currentData.noteControlsHidden = true;
            TempDataService.Instance.update();
        }

        show() {
            this.hidden = false;
            TempDataService.Instance.currentData.noteControlsHidden = false;
            TempDataService.Instance.update();
        }

        ID: string = "note_control";

        getItems(drawer: DrawService): IDrawable[] {
            if (this.hidden) {
                if (this.hiddenY > drawer.canvas.height / 2 || this.firstOpen) {
                    this.hiddenY = drawer.canvas.height / 2;
                }
                else if (this.hiddenY < drawer.canvas.height / 2) {
                    this.hiddenY += 10;
                }
            }
            else {
                if (this.hiddenY > 0) {
                    this.hiddenY -= 10;
                }
                else {
                    this.hiddenY = 0;
                }
            }
            this.y = drawer.canvas.height / 2 + this.hiddenY;
            this.width = Math.min(drawer.canvas.width, 800);
            this.height = drawer.canvas.height / 2;

            //if (Managers.MachineManager.Instance.machineType == Managers.MachineType.Desktop) {
            //    this.y = drawer.canvas.height - 220; + this.hiddenY;
            //    this.width = 360;
            //    this.height = 220;
            //}

            var noteControls = [];

            this.background.width = this.width;
            this.background.height = this.height;
            this.background.y = this.y;
            noteControls.push(this.background);

            this.restControl.y = this.y;
            this.restControl.width = this.width / 8;
            this.restControl.height = this.height / 4;
            noteControls.push(this.restControl);

            this.deleteNoteControl.y = this.y;
            this.deleteNoteControl.x = this.x + this.width * 7 / 8;
            this.deleteNoteControl.width = this.width / 8;
            this.deleteNoteControl.height = this.height / 4;
            noteControls.push(this.deleteNoteControl);

            this.lengthControl.y = this.y + this.height / 4;
            this.lengthControl.width = this.width;
            this.lengthControl.height = this.height / 4;
            noteControls.push(this.lengthControl);

            this.piano.width = this.width;
            this.piano.height = this.height / 2;
            this.piano.y = this.y + this.height / 2;
            noteControls.push(this.piano);

            this.minimise.width = 40;
            this.minimise.height = 20;
            this.minimise.x = this.x;
            this.minimise.y = this.y - this.minimise.height;
            noteControls.push(this.minimise);

            this.firstOpen = false;

            return noteControls;
        }

        addInstrument(name: string): void {
            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;

            var barsCount = project.instruments[0].bars.length;

            var newInstrument = new Model.Instrument(name);

            for (var i = 0; i < barsCount; i++) {

                this.addBarToInstrument(newInstrument);

            }

            project.instruments.push(newInstrument);

            ScoringService.Instance.refresh();
        }

        addBarToInstrument(instrument: Model.Instrument): void {

            var newBar = new Model.Bar();

            if (instrument.bars.length == 0) {
                newBar.items.push(new Model.TrebleClef());
                newBar.items.push(new Model.TimeSignature(4, 4));
            }

            instrument.bars.push(newBar);

        }

        addBar(): void {

            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {

                this.addBarToInstrument(project.instruments[i]);

            }

        }

        addNoteToBar(heightFromTopLine: number, barID: string): void {
            UndoService.Instance.store();

            // due to top line starting at 0;
            heightFromTopLine += 5;

            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {
                var clef = new Model.TrebleClef();

                for (var j = 0; j < project.instruments[i].bars.length; j++) {

                    // loop through items looking for clef
                    for (var k = 0; k < project.instruments[i].bars[j].items.length; k++) {
                        var barItem = project.instruments[i].bars[j].items[k];

                        if (barItem instanceof Model.Clef) {
                            clef = barItem;
                        }
                    }

                    if (project.instruments[i].bars[j].ID == barID) {

                        var dif = clef.positionFromTreble;

                        var distRound5 = Math.round(heightFromTopLine / 5);
                        
                        var topNoteOnTreble = new Model.Note(Model.NoteValue.F, 5, this.lengthControl.selectedLength);
                        
                        var note = getNoteFromStaveDifference(topNoteOnTreble, dif - distRound5);

                         

                        project.instruments[i].bars[j].items.push(note);

                    }
                }
            }

            ScoringService.Instance.refresh();
        }

        addNote(note: Model.Note): void {
            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;

            if (Audio.AudioService) {
                var playInstrument = project.instruments[0];

                if (ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
                    for (var i = 0; i < project.instruments.length; i++) {
                        for (var j = 0; j < project.instruments[i].bars.length; j++) {
                            if (project.instruments[i].bars[j].ID == ScoringService.Instance.selectID) {
                                playInstrument = project.instruments[i];
                                break;
                            }
                        }
                    }
                }

                var synth = playInstrument.synthID ? Audio.SynthManager.Instance.getSynth(playInstrument.synthID, playInstrument.synthName) : null;

                Audio.AudioService.Instance.playNote(note, synth);
            }

            if (ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
                for (var i = 0; i < project.instruments.length; i++) {
                    for (var j = 0; j < project.instruments[i].bars.length; j++) {

                        var currentBar = project.instruments[i].bars[j];

                        if (currentBar.ID == ScoringService.Instance.selectID) {
                            if (TimeSignatureService.Instance.barIsFull(currentBar, project.instruments[i])) {
                                if (project.instruments[i].bars[j + 1]) {
                                    if (project.instruments[i].bars[j + 1].items.length == 0) {
                                        currentBar = project.instruments[i].bars[j + 1];
                                    }
                                    else {
                                        return;
                                    }
                                }
                                else {
                                    this.addBar();
                                    currentBar = project.instruments[i].bars[j + 1];
                                }
                            }

                            currentBar.items.push(note);
                            ScoringService.Instance.selectID = currentBar.ID;

                            ScoringService.Instance.refresh();

                            return;
                        }
                    }
                }
            }

            var instrument = project.instruments[0];

            if (instrument.bars.length == 0) {
                this.addBar();
            }

            var bar = instrument.bars[instrument.bars.length - 1];

            if (TimeSignatureService.Instance.barIsFull(bar, instrument)) {
                this.addBar();
                bar = instrument.bars[instrument.bars.length - 1];
            }

            bar.items.push(note);

            ScoringService.Instance.refresh();
        }

        addRest(): void {
            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;

            var rest = new Model.Rest(this.lengthControl.selectedLength);

            if (ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
                for (var i = 0; i < project.instruments.length; i++) {
                    for (var j = 0; j < project.instruments[i].bars.length; j++) {

                        var currentBar = project.instruments[i].bars[j];

                        if (currentBar.ID == ScoringService.Instance.selectID) {
                            if (TimeSignatureService.Instance.barIsFull(currentBar, project.instruments[i])) {
                                if (project.instruments[i].bars[j + 1]) {
                                    if (project.instruments[i].bars[j + 1].items.length == 0) {
                                        currentBar = project.instruments[i].bars[j + 1];
                                    }
                                    else {
                                        return;
                                    }
                                }
                                else {
                                    this.addBar();
                                    currentBar = project.instruments[i].bars[j + 1];
                                }
                            }

                            currentBar.items.push(rest);
                            ScoringService.Instance.selectID = currentBar.ID;

                            ScoringService.Instance.refresh();

                            return;
                        }
                    }
                }
            }

            var instrument = project.instruments[0];

            if (instrument.bars.length == 0) {
                this.addBar();
            }

            var bar = instrument.bars[instrument.bars.length - 1];

            if (TimeSignatureService.Instance.barIsFull(bar, instrument)) {
                this.addBar();
                bar = instrument.bars[instrument.bars.length - 1];
            }

            bar.items.push(rest);

            ScoringService.Instance.refresh();
        }

        editNoteLength() {
            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];

                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == ScoringService.Instance.selectID) {
                            if (item instanceof Model.Note) {
                                item.length = this.lengthControl.selectedLength;
                            }
                            else if (item instanceof Model.Rest) {
                                item.length = this.lengthControl.selectedLength;
                            }
                            else if (item instanceof Model.Chord) {
                                for (var l = 0; l < item.notes.length; l++) {
                                    item.notes[l].length = this.lengthControl.selectedLength;
                                }
                            }
                        }
                    }
                }
            }

            ScoringService.Instance.refresh();
        }

        editCurrentClef(goUp: boolean) {
            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];

                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];

                        if (item.ID == ScoringService.Instance.selectID) {
                            if (item instanceof Model.Clef) {
                                bar.items[k] = getNextClef(<Model.Clef>item, goUp);
                            }
                        }
                    }
                }
            }

            ScoringService.Instance.refresh();
        }

        deleteSelected() {

            UndoService.Instance.store();

            if (ScoringService.Instance.SelectedItem instanceof Drawing.Note
                || ScoringService.Instance.SelectedItem instanceof Drawing.Rest
                || ScoringService.Instance.SelectedItem instanceof Drawing.DrawText
                || ScoringService.Instance.SelectedItem instanceof Drawing.TimeSignature
                || ScoringService.Instance.SelectedItem instanceof Drawing.Clef) {
                NoteControlService.Instance.deleteItem();
            }
            else if (ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
                BarService.Instance.deleteSelectedBar();
            }
        }

        deleteItem() {
            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {

                var previousItem: Model.Rest | Model.Note | Model.Chord | Model.Clef | Model.TimeSignature | Model.Text = null;

                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];

                    var newItems = [];

                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == ScoringService.Instance.selectID) {
                            // have it......... dealt with
                            if (previousItem) {
                                ScoringService.Instance.selectID = previousItem.ID;
                            }
                            else {
                                ScoringService.Instance.selectID = null;
                            }
                        }
                        else {
                            newItems.push(item);
                        }

                        previousItem = item;
                    }

                    bar.items = newItems;
                }
            }

            ScoringService.Instance.refresh();
        }

        editNoteValueAndOctave(value: Model.NoteValue, octave: number) {

            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;
            
            var playInstrument = project.instruments[0];

            var playedNotes: Model.Note[] = [];

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];

                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == ScoringService.Instance.selectID) {
                            
                            playInstrument = project.instruments[i];

                            if (item instanceof Model.Note) {
                                item.value = value;
                                item.octave = octave;
                                item.length = this.lengthControl.selectedLength;

                                playedNotes.push(item);
                            }
                            else if (item instanceof Model.Rest) {


                            }
                            else if (item instanceof Model.Chord) {

                                for (var ci = 0; ci < item.notes.length; ci++) {
                                    playedNotes.push(item.notes[ci]);
                                }

                            }
                        }
                    }
                }
            }

            if (Audio.AudioService) {
                var synth = playInstrument.synthID ? Audio.SynthManager.Instance.getSynth(playInstrument.synthID, playInstrument.synthName) : null;

                for (var i = 0; i < playedNotes.length; i++) {
                    Audio.AudioService.Instance.playNote(playedNotes[i], synth);
                }
            }

            ScoringService.Instance.refresh();
        }

        noteValueUp() {
            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];

                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == ScoringService.Instance.selectID || ScoringService.Instance.selectID == bar.ID) {
                            if (item instanceof Model.Note) {
                                var newVal = item.value + 1; 
                                item.value = newVal % 12;
                                item.octave = newVal % 12 == Model.NoteValue.C ? item.octave + 1 : item.octave;
                            }
                            else if (item instanceof Model.Rest) {

                            }
                            else if (item instanceof Model.Chord) {
                                for (var l = 0; l < item.notes.length; l++) {
                                    var newVal = item.notes[l].value + 1;
                                    item.notes[l].value = newVal % 12;
                                    item.notes[l].octave = newVal % 12 == Model.NoteValue.C ? item.notes[l].octave + 1 : item.notes[l].octave;
                                }
                            }
                        }
                    }
                }
            }

            ScoringService.Instance.refresh();

        }

        noteValueDown() {
            UndoService.Instance.store();

            var project = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];

                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == ScoringService.Instance.selectID || ScoringService.Instance.selectID == bar.ID) {
                            if (item instanceof Model.Note) {
                                var newVal = item.value + 11;
                                item.value = newVal % 12;
                                item.octave = newVal % 12 == Model.NoteValue.B ? item.octave - 1 : item.octave;
                            }
                            else if (item instanceof Model.Rest) {

                            }
                            else if (item instanceof Model.Chord) {
                                for (var l = 0; l < item.notes.length; l++) {
                                    var newVal = item.notes[l].value + 11;
                                    item.notes[l].value = newVal % 12;
                                    item.notes[l].octave = newVal % 12 == Model.NoteValue.B ? item.notes[l].octave - 1 : item.notes[l].octave;
                                }
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
            this.minimise.ID = this.ID;
        }
    }

} 