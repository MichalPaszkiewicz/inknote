// this file is for drawing score.
module Inknote {

    function getBarLength(bar: Model.Bar): number {

        var length = 20;

        for (var i = 0; i < bar.items.length; i++) {
            var item = bar.items[i];

            if (item instanceof Model.Clef) {
                length += requiredClefSpace(item, 10);
            }

            if (item instanceof Model.Note) {
                length += requiredNoteSpace(item, 10);
            }

            if (item instanceof Model.Rest) {
                length += requiredRestSpace(item, 10);
            }
            if (item instanceof Model.TimeSignature) {
                length += requiredTimeSignatureSpace(item, 10);
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

        updateItems(): void {
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

            if (visibleInstruments.length === 0) {
                return;
            }

            var barMinLengths = getMinBarLengths(visibleInstruments);

            var topLineHeight = 180;
            var marginLeft = 50;
            if (DrawService.Instance.canvas.width < 600) {
                marginLeft = 0;
            }
            var barX = 0;

            var barIndex = 0;
            var maxWidth = DrawService.Instance.canvas.width - 2 * marginLeft;

            var clefAdditionalPosition = 0;

            var lines = splitBarsToLines(barMinLengths, maxWidth);

            // loop through lines
            for (var i = 0; i < lines.length; i++) {
                var tempLine = lines[i];

                // loop through instruments
                for (var j = 0; j < visibleInstruments.length; j++) {
                    var tempInstrument = visibleInstruments[j];

                    if (tempInstrument["clefAdditionalPosition"]) {
                        clefAdditionalPosition = tempInstrument["clefAdditionalPosition"];
                    }
                    else {
                        clefAdditionalPosition = 0;
                    }

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

                        if (j == 0 && tempLine.barIndices[k] % 5 == 4) {
                            drawBar.barNumber = tempLine.barIndices[k] + 1;
                        }

                        if (TimeSignatureService.Instance.barHasError(bar, tempInstrument)) {
                            drawBar.hasError = true;
                        }

                        this.addItem(drawBar);

                        // for getting note position.
                        var itemX = 20;

                        for (var l = 0; l < bar.items.length; l++) {

                            var item = bar.items[l];

                            if (item instanceof Model.Clef) {

                                var drawClefItem = Drawing.getDrawingFromClef(item);

                                drawClefItem.ID = item.ID;
                                drawClefItem.x = marginLeft + barX + itemX;
                                drawClefItem.y = topLineHeight + 5 * drawClefItem.drawPosition;

                                clefAdditionalPosition = 5 * item.positionFromTreble;
                                tempInstrument["clefAdditionalPosition"] = clefAdditionalPosition;

                                this.addItem(drawClefItem);

                                itemX += requiredClefSpace(item, 10);
                            }

                            if (item instanceof Model.TimeSignature) {

                                var timeSignatureItem = <Model.TimeSignature>item;

                                var drawTimeSignatureItem = new Drawing.TimeSignature(timeSignatureItem.top, timeSignatureItem.bottom);
                                drawTimeSignatureItem.ID = timeSignatureItem.ID;
                                drawTimeSignatureItem.x = marginLeft + barX + itemX;
                                drawTimeSignatureItem.y = topLineHeight + 20;

                                this.addItem(drawTimeSignatureItem);

                                itemX += requiredTimeSignatureSpace(item, 10);

                            }

                            if (item instanceof Model.Note) {

                                var isBlack = Model.IsBlackKey(item.value);

                                var intervalDistance = getIntervalDistance(new Model.Note(Model.NoteValue.F, 5, Model.NoteLength.Crotchet), item);

                                if (isBlack) {
                                    var drawBlack = new Drawing.Flat();

                                    drawBlack.x = marginLeft + barX + itemX;
                                    drawBlack.y = topLineHeight - 5 * intervalDistance + clefAdditionalPosition;

                                    this.addItem(drawBlack);

                                    // move forwards.
                                    itemX += 10;
                                }

                                // add note drawing.
                                var drawNoteItem = getDrawingItemFromNote(item);

                                drawNoteItem.x = marginLeft + barX + itemX;
                                drawNoteItem.y = topLineHeight - 5 * intervalDistance + clefAdditionalPosition;
                                drawNoteItem.isPlaying = item.isPlaying;

                                drawNoteItem.stemUp = - 5 * intervalDistance + clefAdditionalPosition >= 20;

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
                    topLineHeight += 120;
                    barX = 0;

                }

                // next group of staves quite a bit lower.
                topLineHeight += 60;

            }

            this.maxScrollPosition = topLineHeight - 200;
        }

        get SelectedItem(): IDrawable {
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].ID == this.selectID) {
                    if (this._items[i]["attachedToID"] == null) {
                        return this._items[i];
                    }
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
                if (this._items[i].y > -50 && this._items[i].y < DrawService.Instance.canvas.height + 50) {
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