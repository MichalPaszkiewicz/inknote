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

        // synchronous call.
        addProject(item: Project, callback?: (item: Project) => void) {
            var self = this;

            var itemAlreadyExists = anyItemIs(this._projects, function (proj: Project) {
                return proj.ID == item.ID;
            });
            if (itemAlreadyExists) {
                check("an item already exists with this ID. Change this project's ID and continue?", function () {
                    item.ID = getID();
                    self._projects.push(item);
                    if (callback) {
                        callback(item);
                    }
                }, function () {
                        return;
                    });
            }
            else {
                this._projects.push(item);
                if (callback) {
                    callback(item);
                }
            }
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

        set currentProjectOverride(project: Project) {
            log("current project overriden", MessageType.Warning);

            this._currentProject = project;

            var self = this;

            // for fixing undo, then save issue.
            var projectListItemToOverride = getFirstItemWhere(this._projects, function (project: Project) {
                return project.ID == self._currentProject.ID;
            });

            var itemIndex = this._projects.indexOf(projectListItemToOverride);

            this._projects[itemIndex] = project;
        }

        save() {
            var self = this;

            var projectAlreadyExists = Inknote.anyItemIs(this._projects, function (project: Project) {
                return project.ID == self._currentProject.ID;
            });

            if (projectAlreadyExists === true) {
                // overwrite item with this ID.
                // * fixes issue with undoing then saving *
                var currentProjectInHere = getFirstItemWhere(this._projects, function (project: Project) {
                    return project.ID == self._currentProject.ID;
                });

                var itemIndex = this._projects.indexOf(currentProjectInHere);

                this._projects[itemIndex] = this._currentProject;
            }
            else {
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