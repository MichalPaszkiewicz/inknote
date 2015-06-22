module Inknote.ProjectConverter {

    var splash = new Drawing.LoadingSplash();

    var name = new Drawing.Name("");

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

        if (name.select) {
            items.push(Drawing.Keyboard.Instance)
        }

        var staveGroup = <Model.Instrument[]>getItemsWhere(project.instruments,
            function (instrument: Model.Instrument) {
                return instrument.visible;
            });

        var startHeight = 180;

        for (var i = 0; i < staveGroup.length; i++) {
            items.push(new Drawing.Stave(startHeight));
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

        for (var i = 0; i < project.instruments.length; i++) {
            result.instruments.push(decompressInstrument(project.instruments[i]));
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

    export function decompressAll(projects: Compressed.CompressedProject[]): Project[] {
        var result = [];

        for (var i = 0; i < projects.length; i++) {
            var decompressed = decompress(projects[i]);
            result.push(decompressed);
        }

        return result;
    }

}