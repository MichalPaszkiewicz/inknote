module Inknote.ProjectConverter {

    var splash = new LoadingSplash();

    var name = new Name("");

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
            items.push(Keyboard.Instance)
        }

        items.push(name);

        items.push(new Stave(180));

        if (project.pause) {
            items.push(splash);
        }

        return items;
    }

    export function compress(project: Project): CompressedProject {

        var compressed = new CompressedProject(project.name);
        compressed.ID = project.ID;

        return compressed;
    }

    export function compressAll(projects: Project[]): CompressedProject[] {
        var result = [];

        for (var i = 0; i < projects.length; i++) {
            var compressed = compress(projects[i]);
            result.push(compressed);
        }

        return result;
    }

    export function decompress(project: CompressedProject): Project {

        var result = new Project(project.name);
        result.ID = project.ID;

        return result;
    }

    export function decompressAll(projects: CompressedProject[]): Project[] {
        var result = [];

        for (var i = 0; i < projects.length; i++) {
            var decompressed = decompress(projects[i]);
            result.push(decompressed);
        }

        return result;
    }

}