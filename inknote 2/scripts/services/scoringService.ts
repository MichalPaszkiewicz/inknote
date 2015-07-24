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

        oldScrollY: number = 0;

        // todo: ensure
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
            this.oldScrollY = 0;
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

            var startX = 50;

            var timeSignature = null;

            for (var i = 0; i < staveGroup.length; i++) {
                var newStave = new Drawing.Stave(startHeight, staveGroup[i].name);

                this._items.push(newStave);

                for (var j = 0; j < staveGroup.length; j++) {
                    for (var k = 0; k < staveGroup[j].bars.length; k++) {
                        var bar = staveGroup[j].bars[k];

                        var drawBar = new Drawing.Bar();

                        var ts = new Drawing.TimeSignature(4, 4);
                        ts.x = 40;
                        ts.y = 200;

                        drawBar.x = newStave.x;

                        drawBar.y = startHeight;
                        drawBar.height = 40;
                        drawBar.width = 30;

                        this._items.push(drawBar);
                        this._items.push(ts);

                        for (var l = 0; l < bar.items.length; l++) {
                            if (bar.items[l] instanceof Model.Note) {
                                var noteItem = <Model.Note> bar.items[l];
                                var drawNoteItem = getDrawingItemFromNote(noteItem)
                                drawNoteItem.x = startX += 20;
                                drawNoteItem.y = startHeight + 20 - noteItem.value * 5;
                                drawNoteItem.ID = noteItem.ID;

                                drawBar.width += requiredNoteSpace(drawNoteItem, 10);

                                this._items.push(drawNoteItem);
                            }
                            else if (bar.items[l] instanceof Model.Rest) {
                                var restItem = <Model.Rest> bar.items[l];
                                var drawRestItem = getDrawingItemFromRest(restItem)
                                drawRestItem.x = startX += 20;
                                drawRestItem.y = startHeight;
                                drawRestItem.ID = restItem.ID;

                                drawBar.width += requiredRestSpace(drawRestItem, 10);

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

        get SelectedItem(): IDrawable {
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].ID == this.selectID) {
                    return this._items[i];
                }
            }
            return null;
        }

        getItems(): IDrawable[]{
            if (this._projectID != Managers.ProjectManager.Instance.currentProject.ID) {
                this.refresh();
            }

            if (this._refresh) {
                // get items from project
                this.updateItems();   
            }

            for (var i = 0; i < this._items.length; i++) {
                this._items[i].y = this._items[i].y + this.oldScrollY - ScrollService.Instance.y;
            }

            this.oldScrollY = ScrollService.Instance.y;

            this._refresh = false;
            return this._items;
        }

        cursorLeft() {
            var lastID = null;

            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i] instanceof Drawing.Stave) {
                    continue;
                }
                var id = this._items[i].ID;

                if (id == this.selectID) {
                    this.selectID = lastID;
                    break;
                }

                lastID = id;
            }
        }

        cursorRight() {
            var lastID = null;
            var gone = false;

            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i] instanceof Drawing.Stave) {
                    continue;
                }
                var id = this._items[i].ID;

                if (lastID == this.selectID) {
                    this.selectID = id;
                    gone = true;
                    break;
                }

                lastID = id;
            }

            if (!gone) {
                this.selectID = null;
            }
        }

        constructor() {
            this.refresh();
        }

    }

} 