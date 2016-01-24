module Inknote.FileConverter {

    var splash = new Drawing.LoadingSplash();

    var noneFound = new Drawing.DrawText();
    noneFound.content = "no items found";
    noneFound.x = 40;
    noneFound.y = 60;
    noneFound.font = Inknote.Drawing.Fonts.large;

    export function toDrawing(drawer: DrawService): IDrawable[] {

        var items = [];

        var projects = Managers.ProjectManager.Instance.allProjects;

        var fileSearch = <HTMLInputElement>document.getElementById("file-search");
        var fileSearchText = fileSearch.value;

        if (!FrontEnd.isHidden(document.getElementById("search-bar"))){
            projects = getItemsWhere(projects, function (project: Project) {
                return project.name.toLowerCase().indexOf(fileSearchText.toLowerCase()) != -1;
            });
        }

        if (projects.length == 0) {
            items.push(noneFound);
        }

        var canvas = drawer.canvas;

        var maxFiles = Math.floor(canvas.width / 200);

        var column = 0;
        var row = 0;

        var anySelected = false;

        for (var i = 0; i < projects.length; i++) {

            var file = new Drawing.File(projects[i].name);
            file.ID = projects[i].ID;

            if (projects[i].ID == Managers.ProjectManager.Instance.hoverID) {
                file.hover = true;
            }
            if (projects[i].ID == Managers.ProjectManager.Instance.selectID) {
                file.select = true;
                anySelected = true;
            }

            file.x = column * 200 + 100;
            file.y = row * 200 + 100 - ScrollService.Instance.y;
            file.colour = projects[i].colour;
            items.push(file);

            column++;
            if (column >= maxFiles) {
                column = 0;
                row++;
            }
        }

        if (anySelected && Managers.MachineManager.Instance.machineType != Managers.MachineType.Desktop) {
            items.push(Drawing.BottomMenu.Instance);
        }

        if (Managers.ProjectManager.Instance.currentProject.pause) {
            items.push(splash);
        }

        return items;
    }

}