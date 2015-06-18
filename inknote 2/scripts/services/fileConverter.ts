module Inknote.FileConverter {

    var splash = new LoadingSplash();

    export function toDrawing(drawer: DrawService): IDrawable[] {

        var items = [];

        var projects = Managers.ProjectManager.Instance.allProjects;

        var canvas = drawer.canvas;

        var maxFiles = Math.floor(canvas.width / 200);

        var column = 0;
        var row = 0;

        var anySelected = false;

        for (var i = 0; i < projects.length; i++) {
            var file = new File(projects[i].name);
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
            items.push(file);

            column++;
            if (column >= maxFiles) {
                column = 0;
                row++;
            }
        }

        if (anySelected) {
            items.push(BottomMenu.Instance);
        }

        if (Managers.ProjectManager.Instance.currentProject.pause) {
            items.push(splash);
        }

        return items;
    }

}