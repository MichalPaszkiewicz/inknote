module Inknote.ProjectConverter {

    var splash = new Drawing.LoadingSplash();

    export var name = new Drawing.Name("");

    export function toDrawing(drawer: DrawService): IDrawable[] {

        var project = Managers.ProjectManager.Instance.currentProject;

        var items = [];

        var scoreItems = ScoringService.Instance.getItems();

        for (var i = 0; i < scoreItems.length; i++) {

            var isHover = scoreItems[i].ID === ScoringService.Instance.hoverID;
            var isSelect = scoreItems[i].ID === ScoringService.Instance.selectID;

            scoreItems[i].hover = isHover;
            scoreItems[i].select = isSelect;

            if (scoreItems[i] instanceof Notation) {
                for (var j = 0; j < (<Notation>scoreItems[i]).attached.length; j++) {
                    (<Notation>scoreItems[i]).attached[j].hover = isHover;
                    (<Notation>scoreItems[i]).attached[j].select = isSelect;
                }
            }

            items.push(scoreItems[i]);
        }

        // if (ScoringService.Instance.selectID != null){
            var noteControls = NoteControlService.Instance.getItems(drawer);
            items = items.concat(noteControls);
        // }

        if (!project) {
            items.push(splash);
            return items;
        }

        // project name
        name.name = project.name;
        name.ID = project.ID;

        name.hover = name.ID === Managers.ProjectManager.Instance.hoverID;
        name.select = name.ID === Managers.ProjectManager.Instance.selectID;

        // keyboard for changing name
        if (name.select && Managers.MachineManager.Instance.machineType !== Managers.MachineType.Desktop) {
            items.push(Drawing.Keyboard.Instance);
        }

        items.push(name);

        if (project.pause) {
            items.push(splash);
        }

        return items;
    }

    export function compress(project: Project): Compressed.CompressedProject {

        var compressed = new Compressed.CompressedProject(project.name);
        compressed.ID = project.ID;
        compressed.name = project.name;
        compressed.inknoteVersion = Managers.VersionManager.Instance.version;
        compressed.colour = project.colour;
        compressed.composer = project.composer;
        compressed.arrangedBy = project.arrangedBy;
        compressed.notes = project.notes;

        for (var i = 0; i < project.instruments.length; i++) {
            compressed.instruments.push(compressInstrument(project.instruments[i]));
        }

        return compressed;
    }

    function compressInstrument(instrument: Model.Instrument): Compressed.Instrument {
        var result = new Compressed.Instrument(instrument.name);

        for (var i = 0; i < instrument.bars.length; i++) {
            result.bars.push(compressBar(instrument.bars[i]));
        }

        return result;
    }

    function compressBar(bar: Model.Bar): Compressed.Bar {
        var result = new Compressed.Bar();

        for (var i = 0; i < bar.items.length; i++) {
            if (bar.items[i] instanceof Model.Note) {
                var compressedNote = compressNote(<Model.Note>bar.items[i]);

                result.items.push(compressedNote);
            }
            if (bar.items[i] instanceof Model.Rest) {
                var compressedRest = compressRest(<Model.Rest>bar.items[i]);

                result.items.push(compressedRest);
            }
            if (bar.items[i] instanceof Model.Chord) {
                var compressedChord = compressChord(<Model.Chord>bar.items[i]);

                result.items.push(compressedChord);
            }
            if (bar.items[i] instanceof Model.Clef) {
                var compressedClef = compressClef(<Model.Clef>bar.items[i]);

                result.items.push(compressedClef);
            }
            if (bar.items[i] instanceof Model.TimeSignature) {
                var compressedTimeSignature = compressTimeSignature(<Model.TimeSignature>bar.items[i]);

                result.items.push(compressedTimeSignature);
            }
        }

        return result;
    }

    function compressChord(chord: Model.Chord): Compressed.CompressedChord {
        var notes: Compressed.CompressedNote[] = [];

        for (var i = 0; i < chord.notes.length; i++) {
            var fullNote = chord.notes[i];
            var cmprsdNote = new Compressed.CompressedNote(fullNote.value, fullNote.octave, fullNote.length);
            notes.push(cmprsdNote);
        }

        var result = new Compressed.CompressedChord(notes);

        return result;
    }

    function compressNote(note: Model.Note): Compressed.CompressedNote {
        var result = new Compressed.CompressedNote(note.value, note.octave, note.length);

        return result;
    }

    function compressRest(rest: Model.Rest): Compressed.CompressedRest {
        var result = new Compressed.CompressedRest(rest.length);

        return result;
    }

    function compressClef(clef: Model.Clef): Compressed.CompressedClef {
        var resultType: Compressed.CompressedClefType;
        var result: Compressed.CompressedClef;

        if (clef instanceof Model.FrenchViolinClef) {
            resultType = Compressed.CompressedClefType.FRENCH_VIOLIN;
        }
        if (clef instanceof Model.TrebleClef) {
            resultType = Compressed.CompressedClefType.TREBLE;
        }
        if (clef instanceof Model.SopranoClef) {
            resultType = Compressed.CompressedClefType.SOPRANO;
        }
        if (clef instanceof Model.MezzoSopranoClef) {
            resultType = Compressed.CompressedClefType.MEZZ_SOPRANO;
        }
        if (clef instanceof Model.AltoClef) {
            resultType = Compressed.CompressedClefType.ALTO;
        }
        if (clef instanceof Model.TenorClef) {
            resultType = Compressed.CompressedClefType.TENOR;
        }
        if (clef instanceof Model.BaritoneClef) {
            resultType = Compressed.CompressedClefType.BARITONE;
        }
        if (clef instanceof Model.BassClef) {
            resultType = Compressed.CompressedClefType.BASS;
        }
        if (clef instanceof Model.SubbassClef) {
            resultType = Compressed.CompressedClefType.SUBBASS;
        }

        result = new Compressed.CompressedClef(resultType);
        return result;
    }

    function compressTimeSignature(timeSignature: Model.TimeSignature): Compressed.CompressedTimeSignature {
        
        return new Compressed.CompressedTimeSignature(timeSignature.top, timeSignature.bottom);

    }

    export function compressAll(projects: Project[]): Compressed.CompressedProject[] {
        var result = [];

        for (var i = 0; i < projects.length; i++) {
            var compressed = compress(projects[i]);
            result.push(compressed);
        }

        return result;
    }

    export function decompress(project: Compressed.CompressedProject): Project {

        if (project.inknoteVersion !== Managers.VersionManager.Instance.version) {
            log("project: " + project.name + " is of version " + project.inknoteVersion, MessageType.Warning);
            log("this may cause errors when decompressing this saved files", MessageType.Warning);
        }

        var result = new Project(project.name);
        result.ID = project.ID;
        result.instruments = [];
        result.colour = project.colour;
        result.composer = project.composer;
        result.arrangedBy = project.arrangedBy;
        result.notes = project.notes;

        if (project.instruments) {
            for (var i = 0; i < project.instruments.length; i++) {
                result.instruments.push(decompressInstrument(project.instruments[i]));
            }
        }

        return result;
    }

    function decompressInstrument(instrument: Compressed.Instrument): Model.Instrument {
        var result = new Model.Instrument(instrument.name);

        result.visible = true;

        for (var i = 0; i < instrument.bars.length; i++) {
            result.bars.push(decompressBar(instrument.bars[i]));
        }

        return result;
    }

    function decompressBar(bar: Compressed.Bar): Model.Bar {
        var result = new Model.Bar();

        for (var i = 0; i < bar.items.length; i++) {
            if (bar.items[i].i == Compressed.ItemIdentifier.NOTE) {
                var decompressedNote = decompressNote(<Compressed.CompressedNote>bar.items[i]);

                result.items.push(decompressedNote);
            }
            else if (bar.items[i].i == Compressed.ItemIdentifier.REST) {
                var decompressedRest = decompressRest(<Compressed.CompressedRest>bar.items[i]);

                result.items.push(decompressedRest);
            }
            else if (bar.items[i].i == Compressed.ItemIdentifier.CHORD) {
                var decompressedChord = decompressChord(<Compressed.CompressedChord>bar.items[i]);

                result.items.push(decompressedChord);
            }
            else if (bar.items[i].i == Compressed.ItemIdentifier.CLEF) {
                var decompressedClef = decompressClef(<Compressed.CompressedClef>bar.items[i]);

                result.items.push(decompressedClef);
            }
            else if (bar.items[i].i == Compressed.ItemIdentifier.TIMESIGNATURE) {
                var decompressedTimeSignature = decompressTimeSignature(<Compressed.CompressedTimeSignature>bar.items[i]);

                result.items.push(decompressedTimeSignature);
            }
            else {
                log("object in bar unidentified", MessageType.Warning);
                console.log(bar.items[i]);
            }
        }

        return result;
    }

    function decompressChord(chord: Compressed.CompressedChord): Model.Chord {
        var notes = [];

        for (var i = 0; i < chord.notes.length; i++) {
            var theNote = chord.notes[i];
            var realNote = new Model.Note(theNote.v, theNote.o, theNote.l);
            notes.push(realNote);
        }

        var result = new Model.Chord(notes);

        return result;
    }

    function decompressNote(note: Compressed.CompressedNote): Model.Note {
        var result = new Model.Note(note.v, note.o, note.l);

        return result;
    }

    function decompressRest(rest: Compressed.CompressedRest): Model.Rest {
        var result = new Model.Rest(rest.l);

        return result;
    }

    function decompressClef(clef: Compressed.CompressedClef): Model.Clef {
        var result: Model.Clef;

        if (clef.v == Compressed.CompressedClefType.FRENCH_VIOLIN) {
            result = new Model.FrenchViolinClef();
        }
        if (clef.v == Compressed.CompressedClefType.TREBLE) {
            result = new Model.TrebleClef();
        }
        if (clef.v == Compressed.CompressedClefType.SOPRANO) {
            result = new Model.SopranoClef();
        }
        if (clef.v == Compressed.CompressedClefType.MEZZ_SOPRANO) {
            result = new Model.MezzoSopranoClef();
        }
        if (clef.v == Compressed.CompressedClefType.ALTO) {
            result = new Model.AltoClef();
        }
        if (clef.v == Compressed.CompressedClefType.TENOR) {
            result = new Model.TenorClef();
        }
        if (clef.v == Compressed.CompressedClefType.BARITONE) {
            result = new Model.BaritoneClef();
        }
        if (clef.v == Compressed.CompressedClefType.BASS) {
            result = new Model.BassClef();
        }
        if (clef.v == Compressed.CompressedClefType.SUBBASS) {
            result = new Model.SubbassClef();
        }

        return result;
    }

    function decompressTimeSignature(timeSignature: Compressed.CompressedTimeSignature): Model.TimeSignature {

        return new Model.TimeSignature(timeSignature.t, timeSignature.b);

    }

    export function decompressAll(projects: Compressed.CompressedProject[]): Project[] {
        var result = [];

        for (var i = 0; i < projects.length; i++) {
            var decompressed = decompress(projects[i]);
            result.push(decompressed);
        }

        return result;
    }

}