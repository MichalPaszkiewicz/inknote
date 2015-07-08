module Inknote.Drawing.RightClickMenus  {

    export class RightClickFile extends RightClickMenu {

        fileID: string;

        items = [
            new ClickableMenuItem("open", function () {
                Managers.ProjectManager.Instance.setCurrentProject((<RightClickFile>RightClickMenuService.Instance.Menu).fileID);
                Managers.ProjectManager.Instance.openSelectedProject();
                //Managers.PageManager.Current.page = Managers.Page.Score;
            })
        ]

        constructor(ID: string) {
            super();

            this.fileID = ID;
        }
    }

} 