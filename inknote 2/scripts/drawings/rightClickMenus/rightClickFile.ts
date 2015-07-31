module Inknote.Drawing.RightClickMenus  {

    export class RightClickFile extends RightClickMenu {

        fileID: string;

        items = [
            new ClickableMenuItem("open", function () {
                Managers.ProjectManager.Instance.openProjectFromID((<RightClickFile>RightClickMenuService.Instance.Menu).fileID);
            }),
            new ClickableMenuItem("open in new tab", function () {
                Managers.PageManager.Current.openNewPage(Managers.Page.Score,(<RightClickFile>RightClickMenuService.Instance.Menu).fileID);
            }),
            new ClickableMenuItem("properties", function () {
                var selectedProjectID = (<RightClickFile>RightClickMenuService.Instance.Menu).fileID;
                var project = <Project>getItemFromID(Managers.ProjectManager.Instance.allProjects, selectedProjectID);

                ProjectOptionsService.Instance.open(project);
            }),
            new ClickableMenuItem("download", function () {
                var selectedProjectID = (<RightClickFile>RightClickMenuService.Instance.Menu).fileID;
                var project = <Project>getItemFromID(Managers.ProjectManager.Instance.allProjects, selectedProjectID);

                var compressedProject = ProjectConverter.compress(project);

                Storage.download(compressedProject.name + ".score", JSON.stringify(compressedProject));
            }),
            new ClickableMenuItem("delete", function () {
                Managers.ProjectManager.Instance.deleteProjectByID((<RightClickFile>RightClickMenuService.Instance.Menu).fileID);
            })
        ]

        constructor(ID: string) {
            super();

            this.fileID = ID;
        }
    }

} 