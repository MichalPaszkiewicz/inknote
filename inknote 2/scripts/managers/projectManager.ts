module Inknote.Managers {

    export class ProjectManager {

        private _projects: Project[];

        private _currentProject: Project;

        private static _instance: ProjectManager;

        selectID: string;
        hoverID: string;

        addProjects(items: Project[]) {
            this._projects = this._projects.concat(items);
        }

        addProject(item: Project) {
            this._projects.push(item);
        }

        constructor() {
            this._projects = [];
        }

        setCurrentProject(ID: string) {
            this._currentProject = <Project>getItemFromID(this._projects, ID);
        }

        static get Instance() {
            if (!ProjectManager._instance) {
                ProjectManager._instance = new ProjectManager();
            }
            return ProjectManager._instance;
        }

        openProjectFromURL() {
            var search = window.location.search.replace("?", "");
            var searches = search.split("&");

            for (var i = 0; i < searches.length; i++) {
                var keyValue = searches[i].split("=");
                if (keyValue[0] == "Score") {
                    this.setCurrentProject(keyValue[1]);
                }
            }
        }

        get currentProject() {
            if (!this._currentProject) {
                this._currentProject = new Project();
            }
            return this._currentProject;
        }

        save() {
            if (this._projects.indexOf(this._currentProject) == -1) {
                this._projects.push(this._currentProject);
            }
            var compressed = ProjectConverter.compressAll(this._projects);
            Storage.saveProjects(compressed);
        }

        get allProjects() {
            return this._projects;
        }

        deleteSelectedProject() {

            this.deleteProjectByID(this.selectID);

        }

        deleteProjectByID(ID: string) {
            var index = getIndexFromID(this._projects, ID);
            var proj = <Project>getItemFromID(this._projects, ID);

            var projName = proj.name;

            var self = this;

            check("Are you sure you want to delete project \"" + projName + "\"",
                function () {
                    if (index != null) {
                        self._projects.splice(index, 1);
                    }

                    if (proj.ID == self._currentProject.ID) {

                        if (self._projects.length > 0) {
                            self._currentProject = last(self._projects);
                        }
                        else {
                            self._currentProject = null;
                        }
                    }

                    setTimeout(function () {
                        self.currentProject.pause = false;
                    }, 100);
                },
                function () {

                    log("\"" + projName + "\" deletion cancelled");

                });
        }

        openSelectedProject() {
            this.setCurrentProject(this.selectID);
            Managers.PageManager.Current.page = Managers.Page.Score;
            Managers.ProjectManager.Instance._currentProject.pause = false;
            this.selectID = null;
        }

        openProjectFromID(ID: string) {
            this.setCurrentProject(ID);
            Managers.PageManager.Current.page = Managers.Page.Score;
            Managers.ProjectManager.Instance._currentProject.pause = false;
            this.selectID = null;
        }

        next() {
            var projects = this._projects;

            if (projects.length < 2) {
                this.selectID = projects[0].ID;
                return;
            }

            var index = getIndexFromID(projects, this.selectID);

            if (index == projects.length - 1 || index == null) {
                this.selectID = projects[0].ID;
            }
            else {
                this.selectID = projects[index + 1].ID;
            }
        }

        previous() {
            var projects = this._projects;

            if (projects.length < 2) {
                this.selectID = projects[0].ID;
                return;
            }

            var index = getIndexFromID(projects, this.selectID);

            if (index == 0 || index == null) {
                var lastProject = <Project>last(projects);
                this.selectID = lastProject.ID;
            }
            else {
                this.selectID = projects[index - 1].ID;
            }
        }

    }

} 