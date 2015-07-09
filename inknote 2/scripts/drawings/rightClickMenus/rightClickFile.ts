module Inknote.Drawing.RightClickMenus  {

    export class RightClickFile extends RightClickMenu {

        fileID: string;

        items = [
            new ClickableMenuItem("open", function () {
                Managers.ProjectManager.Instance.openProjectFromID((<RightClickFile>RightClickMenuService.Instance.Menu).fileID);
            }),
            new ClickableMenuItem("open in new tab", function () {
                Managers.PageManager.Current.openNewPage(Managers.Page.Score,(<RightClickFile>RightClickMenuService.Instance.Menu).fileID);
            })
        ]

        constructor(ID: string) {
            super();

            this.fileID = ID;
        }
    }

} 