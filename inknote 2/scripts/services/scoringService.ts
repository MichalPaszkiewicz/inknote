// this file is for drawing score.
module Inknote {

    // will store all score drawable items and update when necessary.
    export class ScoringService {

        private static _instance: ScoringService;

        static get Instance(): ScoringService {
            if (!ScoringService._instance) {
                ScoringService._instance = new ScoringService();
            }
            return ScoringService._instance;
        }

        private _refresh: boolean = false;
        private _projectID: string;        
        private _items: IDrawable[] = [];

        hoverID: string;

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

            var flat1 = new Drawing.Flat();
            var sharp1 = new Drawing.Natural();

            flat1.y = 190;
            sharp1.y = 195;
            flat1.x = 100;
            sharp1.x = 110;

            var crchtRest = new Drawing.CrotchetRest();

            crchtRest.y = 200;
            crchtRest.x = 120;

            var qvrRest = new Drawing.QuaverRest();

            qvrRest.y = 200;
            qvrRest.x = 130;

            var qvr = new Drawing.Quaver(false);

            qvr.x = 150;
            qvr.y = 200;

            qvr.attach(sharp1);
            qvr.attach(flat1);

            var hdsqvr = new Drawing.HemiDemiSemiQuaver(true);

            hdsqvr.x = 190;
            hdsqvr.y = 200;

            this._items.push(flat1);
            this._items.push(sharp1);
            this._items.push(crchtRest);
            this._items.push(qvrRest);
            this._items.push(qvr);
            this._items.push(hdsqvr);

            var c = new Drawing.Crotchet(true)
            c.x = 500;
            c.y = 500;

            this._items.push(c);
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
            this.refresh();
        }

    }

} 