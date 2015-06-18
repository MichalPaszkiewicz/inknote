module Inknote {

    export enum ActionType {
        NewProject,
        OpenProject,
        SaveProject
    }

    export function Action(aType: ActionType) {
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

        Managers.ProjectManager.Instance.addProject(newProj);
        Managers.ProjectManager.Instance.setCurrentProject(newProj.ID);

        Managers.PageManager.Current.page = Managers.Page.Score;

        Managers.ProjectManager.Instance.currentProject.pause = true;

    }

    function openProject() {
        Managers.PageManager.Current.page = Managers.Page.File;
    }

    function saveProject() {
        Managers.ProjectManager.Instance.save();
    }

}