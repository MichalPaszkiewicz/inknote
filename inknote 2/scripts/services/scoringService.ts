// this file is for drawing score.
module Inknote {

    // will store all score drawable items and update when necessary.
    export class ScoringService {
        private static _instance;
        static get Instance() {
            if (!ScoringService._instance) {
                ScoringService._instance = new ScoringService();
            }
            return ScoringService._instance;
        }

        private _refresh: boolean = false;
        private _projectID: string;        
        private _items: IDrawable[];

        // should refresh on:
        // change of window size.
        // change of project -- Done in here inside getItems().
        // change of score.
        // (but not on change of hover/select
        // -- that should be handled in individual objects).
        refresh(): void {
            this._refresh = true;
        }

        updateItems() {
            // put updating logic in here.
            var currentProject = Managers.ProjectManager.Instance.currentProject;
            this._projectID = currentProject.ID;


        }

        getItems(): IDrawable[]{
            if (this._projectID != Managers.ProjectManager.Instance.currentProject.ID) {
                this.refresh();
            }

            if (this._refresh) {
                // get items from project
                this.updateItems();   
            }

            this._refresh = false;
            return this._items;
        }

        constructor() {

        }

    }

} 