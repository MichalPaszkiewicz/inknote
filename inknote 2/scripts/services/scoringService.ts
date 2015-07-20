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
        selectID: string;

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

            // must clear items!
            this._items = [];

            var staveGroup = <Model.Instrument[]>getItemsWhere(currentProject.instruments,
                function (instrument: Model.Instrument) {
                    return instrument.visible;
                });

            var startHeight = 180;

            var startX = 0;

            for (var i = 0; i < staveGroup.length; i++) {
                this._items.push(new Drawing.Stave(startHeight, staveGroup[i].name));

                for (var j = 0; j < staveGroup.length; j++) {
                    for (var k = 0; k < staveGroup[j].bars.length; k++) {
                        var bar = staveGroup[j].bars[k];

                        for (var l = 0; l < bar.items.length; l++) {
                            if (bar.items[l] instanceof Model.Note) {
                                var noteItem = <Model.Note> bar.items[l];
                                var drawNoteItem = getDrawingItemFromNote(noteItem)
                                drawNoteItem.x = startX += 20;
                                drawNoteItem.y = startHeight;

                                this._items.push(drawNoteItem);
                            }
                            else if (bar.items[l] instanceof Model.Rest) {
                                var restItem = <Model.Rest> bar.items[l];
                                var drawRestItem = getDrawingItemFromRest(restItem)
                                drawRestItem.x = startX += 20;
                                drawRestItem.y = startHeight;

                                this._items.push(drawRestItem);
                            }
                            else if (bar.items[l] instanceof Model.Chord) {

                            }
                        }
                    }
                }

                startHeight += 80;
            }


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