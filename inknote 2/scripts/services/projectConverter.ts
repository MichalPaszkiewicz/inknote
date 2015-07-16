module Inknote.ProjectConverter {

    var splash = new Drawing.LoadingSplash();

    var name = new Drawing.Name("");

    export function toDrawing(drawer: DrawService): IDrawable[] {

        var project = Managers.ProjectManager.Instance.currentProject;

        var items = [];

        var scoreItems = ScoringService.Instance.getItems();

        for (var i = 0; i < scoreItems.length; i++) {

            var isHover = scoreItems[i].ID == ScoringService.Instance.hoverID;
            var isSelect = scoreItems[i].ID == ScoringService.Instance.selectID;

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

        if (!project) {
            items.push(splash);
            return items;
        }

        // project name
        name.name = project.name;
        name.ID = project.ID;

        name.hover = name.ID == Managers.ProjectManager.Instance.hoverID;
        name.select = name.ID == Managers.ProjectManager.Instance.selectID;

        // keyboard for changing name
        if (name.select && Managers.MachineManager.Instance.machineType != Managers.MachineType.Desktop) {
            items.push(Drawing.Keyboard.Instance)
        }

        var staveGroup = <Model.Instrument[]>getItemsWhere(project.instruments,
            function (instrument: Model.Instrument) {
                return instrument.visible;
            });

        var startHeight = 180;

        for (var i = 0; i < staveGroup.length; i++) {
            items.push(new Drawing.Stave(startHeight, staveGroup[i].name));
            startHeight += 80;
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

    export function compressAll(projects: Project[]): Compressed.CompressedProject[] {
        var result = [];

        for (var i = 0; i < projects.length; i++) {
            var compressed = compress(projects[i]);
            result.push(compressed);
        }

        return result;
    }

    export function decompress(project: Compressed.CompressedProject): Project {

        if (project.inknoteVersion != Managers.VersionManager.Instance.version) {
            log("project: " + project.name + " is of version " + project.inknoteVersion, MessageType.Warning);
            log("this may cause errors when decompressing this saved files", MessageType.Warning);
        }

        var result = new Project(project.name);
        result.ID = project.ID;
        result.instruments = [];

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

        return result;
    }

    function decompressChord(chord: Compressed.CompressedChord): Model.Chord {
        var notes = [];

        for (var i = 0; i < chord.notes.length; i++) {
            var theNote = chord.notes[i];
            var realNote = new Model.Note(theNote.value, theNote.octave, theNote.length);
            notes.push(realNote);
        }

        var result = new Model.Chord(notes);

        return result;
    }

    function decompressNote(note: Compressed.CompressedNote): Model.Note {
        var result = new Model.Note(note.value, note.octave, note.length);

        return result;
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