// this file is for drawing score.
module Inknote {

    function getBarLength(bar: Model.Bar): number {

        var length = 20;

        for (var i = 0; i < bar.items.length; i++) {
            var item = bar.items[i];

            if (item instanceof Model.Note) {
                length += requiredNoteSpace(item, 10);
            }

            if (item instanceof Model.Rest) {
                length += requiredRestSpace(item, 10);
            }
        }

        return length;

    }

    function getMinBarLengths(instruments: Model.Instrument[]): number[] {

        var barLengths = [];

        for (var i = 0; i < instruments[0].bars.length; i++) {

            var maxBarLength = 0;

            for (var j = 0; j < instruments.length; j++) {

                var barLength = getBarLength(instruments[j].bars[i]);

                maxBarLength = Math.max(maxBarLength, barLength);
            }

            barLengths.push(maxBarLength);
        }

        return barLengths;

    }

    class BarLine {

        minLength: number = 0;
        barLengths: number[] = [];
        barIndices: number[] = [];

    }

    function splitBarsToLines(barLengths: number[], splitLength: number): BarLine[] {

        var barLines: BarLine[] = [];

        var tempBarLine = new BarLine();

        for (var i = 0; i < barLengths.length; i++) {

            if (tempBarLine.minLength + barLengths[i] > splitLength) {
                barLines.push(tempBarLine);
                tempBarLine = new BarLine();
            }

            tempBarLine.minLength += barLengths[i];
            tempBarLine.barIndices.push(i);
            tempBarLine.barLengths.push(barLengths[i]);

        }

        barLines.push(tempBarLine);

        return barLines;
    }


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

        // use this instead of normal push.
        addItem(item: IDrawable) {
                this._items.push(item);
        }

        hoverID: string;
        selectID: string;

        maxScrollPosition: number = 0;

        oldScrollY: number = 0;

        // todo: ensure
        // should refresh on:
        // change of window size -- actions -> windowResize.
        // change of project -- Done in here inside getItems().
        // change of score.
        // (but not on change of hover/select
        // -- that should be handled in individual objects).
        refresh(): void {
            this._refresh = true;
        }

        updateItems() {
            if (!DrawService.Instance) {
                // depends on drawservice.
                log("draw service not instantiated", MessageType.Error);
                return;
            }

            // scrolling is handled in get items function.
            this.oldScrollY = 0;

            var currentProject = Managers.ProjectManager.Instance.currentProject;
            this._projectID = currentProject.ID;

            // must clear items!
            this._items = [];

            var visibleInstruments = <Model.Instrument[]>getItemsWhere(currentProject.instruments,
                function (instrument: Model.Instrument) {
                    return instrument.visible;
                });

            var barMinLengths = getMinBarLengths(visibleInstruments);

            var topLineHeight = 180;
            var marginLeft = 50;
            if (DrawService.Instance.canvas.width < 600) {
                marginLeft = 0;
            }
            var barX = 0;

            var barIndex = 0;
            var maxWidth = DrawService.Instance.canvas.width - 2 * marginLeft;

            var lines = splitBarsToLines(barMinLengths, maxWidth);

            // loop through lines
            for (var i = 0; i < lines.length; i++) {
                var tempLine = lines[i];

                // loop through instruments
                for (var j = 0; j < visibleInstruments.length; j++) {
                    var tempInstrument = visibleInstruments[j];

                    // add stave
                    var drawStave = new Drawing.Stave(topLineHeight, tempInstrument.name);
                    drawStave.x = marginLeft;
                    drawStave.width = maxWidth;
                    this.addItem(drawStave);

                    // loop through bars in line
                    // warning: do not use k. use the barIndex values.
                    for (var k = 0; k < tempLine.barIndices.length; k++) {
                        var tempBarLength = tempLine.barLengths[k];
                        var bar = tempInstrument.bars[tempLine.barIndices[k]];

                        // add bar drawing.
                        var drawBar = new Drawing.Bar();
                        drawBar.ID = bar.ID;
                        drawBar.height = 40;
                        drawBar.y = topLineHeight;
                        drawBar.x = marginLeft + barX;
                        drawBar.width = tempBarLength;
                        this.addItem(drawBar);

                        // for getting note position.
                        var itemX = 20;

                        for (var l = 0; l < bar.items.length; l++) {

                            var item = bar.items[l];

                            if (item instanceof Model.Note) {

                                var isBlack = Model.IsBlackKey(item.value);

                                var intervalDistance = getIntervalDistance(new Model.Note(Model.NoteValue.F, 5, Model.NoteLength.Crotchet), item);

                                if (isBlack) {
                                    var drawBlack = new Drawing.Flat();

                                    drawBlack.x = marginLeft + barX + itemX;
                                    drawBlack.y = topLineHeight - 5 * intervalDistance;

                                    this.addItem(drawBlack);

                                    // move forwards.
                                    itemX += 10;
                                }

                                // add note drawing.
                                var drawNoteItem = getDrawingItemFromNote(item);

                                drawNoteItem.x = marginLeft + barX + itemX;
                                drawNoteItem.y = topLineHeight - 5 * intervalDistance;

                                drawNoteItem.stemUp = intervalDistance <= -4;

                                if (isBlack) {
                                    drawNoteItem.attach(drawBlack);
                                }

                                this.addItem(drawNoteItem);

                                // move forwards
                                itemX += requiredNoteSpace(item, 10);
                                if (isBlack) {
                                    // move back a bit if sharp or flat.
                                    itemX -= 10;
                                }
                            }

                            if (item instanceof Model.Rest) {

                                // add rest drawing.
                                var drawRestItem = getDrawingItemFromRest(item);

                                drawRestItem.x = marginLeft + barX + itemX;
                                drawRestItem.y = topLineHeight + 20;

                                this.addItem(drawRestItem);


                                // move forwards.
                                itemX += requiredRestSpace(item, 10);
                            }

                            if (item instanceof Model.Chord) {

                                // add chord drawing.

                            }

                        }

                        // increase bar position after looping through items.
                        barX += tempBarLength;

                    }

                    // iterate height between instruments;
                    topLineHeight += 80;
                    barX = 0;

                }

                // next group of staves quite a bit lower.
                topLineHeight += 40;

            }

            this.maxScrollPosition = topLineHeight - 200;
        
            /*
            for (var i = 0; i < visibleInstruments.length; i++) {
                var newStave = new Drawing.Stave(topLineHeight, visibleInstruments[i].name);

                this._items.push(newStave);

                for (var j = 0; j < visibleInstruments.length; j++) {
                    for (var k = 0; k < visibleInstruments[j].bars.length; k++) {
                        var bar = visibleInstruments[j].bars[k];

                        var drawBar = new Drawing.Bar();

                        var ts = new Drawing.TimeSignature(4, 4);
                        ts.x = 40;
                        ts.y = 200;

                        drawBar.x = newStave.x;

                        drawBar.y = topLineHeight;
                        drawBar.height = 40;
                        drawBar.width = 30;

                        this._items.push(drawBar);
                        this._items.push(ts);

                        for (var l = 0; l < bar.items.length; l++) {
                            if (bar.items[l] instanceof Model.Note) {
                                var noteItem = <Model.Note> bar.items[l];
                                var drawNoteItem = getDrawingItemFromNote(noteItem)
                                drawNoteItem.x = marginLeft += 20;
                                drawNoteItem.y = topLineHeight + 20 - noteItem.value * 5;
                                drawNoteItem.ID = noteItem.ID;

                                drawBar.width += requiredNoteSpace(noteItem, 10);

                                this._items.push(drawNoteItem);
                            }
                            else if (bar.items[l] instanceof Model.Rest) {
                                var restItem = <Model.Rest> bar.items[l];
                                var drawRestItem = getDrawingItemFromRest(restItem)
                                drawRestItem.x = marginLeft += 20;
                                drawRestItem.y = topLineHeight;
                                drawRestItem.ID = restItem.ID;

                                drawBar.width += requiredRestSpace(restItem, 10);

                                this._items.push(drawRestItem);
                            }
                            else if (bar.items[l] instanceof Model.Chord) {

                            }
                        }
                    }
                }

                topLineHeight += 80;
            }
            */

        }

        get SelectedItem(): IDrawable {
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].ID == this.selectID) {
                    return this._items[i];
                }
            }
            return null;
        }

        getItems(): IDrawable[] {
            if (this._projectID != Managers.ProjectManager.Instance.currentProject.ID) {
                this.refresh();
            }

            if (this._refresh) {
                // get items from project
                this.updateItems();
            }

            var visibleItems = [];

            // deals with scrolling.
            for (var i = 0; i < this._items.length; i++) {
                this._items[i].y = this._items[i].y + this.oldScrollY - ScrollService.Instance.y;
                if (this._items[i].y > 0 && this._items[i].y < DrawService.Instance.canvas.height) {
                    visibleItems.push(this._items[i]);
                }
            }

            this.oldScrollY = ScrollService.Instance.y;

            this._refresh = false;
            return visibleItems;
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

                if (lastID == this.selectID && id != lastID) {
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