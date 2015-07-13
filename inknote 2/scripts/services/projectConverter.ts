module Inknote.ProjectConverter {

    var splash = new Drawing.LoadingSplash();

    var name = new Drawing.Name("");

    var flat1 = new Drawing.Flat();
    var flat2 = new Drawing.Flat();

    flat1.y = 190;
    flat2.y = 195;
    flat1.x = 100;
    flat2.x = 110;

    var crchtRest = new Drawing.CrotchetRest();

    crchtRest.y = 200;
    crchtRest.x = 120;

    var qvrRest = new Drawing.QuaverRest();

    qvrRest.y = 200;
    qvrRest.x = 130;

    var qvr = new Drawing.Quaver(false);

    qvr.x = 150;
    qvr.y = 200;

    var hdsqvr = new Drawing.HemiDemiSemiQuaver(true);

    hdsqvr.x = 190;
    hdsqvr.y = 200;

    export function toDrawing(drawer: DrawService): IDrawable[] {

        var project = Managers.ProjectManager.Instance.currentProject;

        var items = [];

        if (!project) {
            items.push(splash);
            return items;
        }

        name.name = project.name;
        name.ID = project.ID;

        name.hover = name.ID == Managers.ProjectManager.Instance.hoverID;
        name.select = name.ID == Managers.ProjectManager.Instance.selectID;

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

        items.push(flat1);
        items.push(flat2);
        items.push(crchtRest);
        items.push(qvrRest);
        items.push(qvr);
        items.push(hdsqvr);

        if (project.pause) {
            items.push(splash);
        }

        return items;
    }

    export function compress(project: Project): Compressed.CompressedProject {

        var compressed = new Compressed.CompressedProject(project.name);
        compressed.ID = project.ID;
        compressed.name = project.name;

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