module Inknote {

    export enum ActionType {
        NewProject,
        OpenProject,
        SaveProject,
        ToPage
    }

    export function Action(aType: ActionType, page?: Managers.Page) {
        //Managers.ProjectManager

        ScrollService.Instance.x = 0;
        ScrollService.Instance.y = 0;

        Managers.ProjectManager.Instance.currentProject.pause = true;

        Managers.ProjectManager.Instance.selectID = "";

        switch (aType) {
            case ActionType.NewProject:
                newProject();
                break;
            case ActionType.OpenProject:
                openProject();
                break;
            case ActionType.SaveProject:
                saveProject();
                break;
            case ActionType.ToPage:
                if (!page) {
                    page = Managers.Page.Score;
                }
                moveToPage(page);
                break;
            default:
                log("Unknown action type", MessageType.Error);
        }

        // project manager needs to be static.
        setTimeout(function () {
            Managers.ProjectManager.Instance.currentProject.pause = false;
        }, 100);

    }

    function newProject() {
        var newProj = new Project("Untitled");

        Managers.ProjectManager.Instance.addProject(newProj, function (item: Project) {
            Managers.ProjectManager.Instance.setCurrentProject(item.ID);

            Managers.PageManager.Current.page = Managers.Page.Score;

            Managers.ProjectManager.Instance.currentProject.pause = true;

        });
    }

    function openProject() {
        Managers.PageManager.Current.page = Managers.Page.File;
    }

    function saveProject() {
        Managers.ProjectManager.Instance.save();
        Storage.saveSynths();
    }

    function moveToPage(page: Managers.Page) {
        Managers.PageManager.Current.page = page;
    }

}