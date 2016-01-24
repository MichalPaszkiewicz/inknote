module Inknote {

    export function requiredTimeSignatureSpace(item: Model.TimeSignature, lineHeight: number) {

        return 30;

    }

    export function getCrotchetsFromNoteLength(nl: Model.NoteLength) {

        switch (nl) {
            case Model.NoteLength.Breve:
                return 8;
            case Model.NoteLength.SemiBreve:
                return 4;
            case Model.NoteLength.Minim:
                return 2;
            case Model.NoteLength.Crotchet:
                return 1;
            case Model.NoteLength.Quaver:
                return 1 / 2;
            case Model.NoteLength.SemiQuaver:
                return 1 / 4;
            case Model.NoteLength.DemiSemiQuaver:
                return 1 / 8;
            case Model.NoteLength.HemiDemiSemiQuaver:
                return 1 / 16;
        }

        return 0;
    }

    export class TimeSignatureService {

        private static _instance: TimeSignatureService;

        static get Instance(): TimeSignatureService {
            if (!TimeSignatureService._instance) {
                TimeSignatureService._instance = new TimeSignatureService();
            }

            return TimeSignatureService._instance;
        }

        barIsFull(bar: Model.Bar, instrument: Model.Instrument): boolean {

            var timeSignature = new Model.TimeSignature(4, 4);

            for (var i = 0; i < instrument.bars.length; i++) {
                for (var j = 0; j < instrument.bars[i].items.length; j++) {
                    if (instrument.bars[i].items[j] instanceof Model.TimeSignature) {
                        timeSignature = <Model.TimeSignature>instrument.bars[i].items[j];
                    }
                }
                if (instrument.bars[i].ID === bar.ID) {
                    break;
                }
            }

            var countables: (Model.Rest | Model.Chord)[] = getItemsWhere(bar.items, function (item) {
                var isRest = item instanceof Model.Rest;
                var isNote = item instanceof Model.Note;
                var isChord = item instanceof Model.Chord;

                return isRest || isNote;
            });

            var count = sum(countables, function (item: Model.Rest | Model.Note) {

                return getCrotchetsFromNoteLength(item.length);

            });

            return count >= timeSignature.top;

        }

        barHasError(bar: Model.Bar, instrument: Model.Instrument): boolean {

            var timeSignature = new Model.TimeSignature(4, 4);

            for (var i = 0; i < instrument.bars.length; i++) {
                for (var j = 0; j < instrument.bars[i].items.length; j++) {
                    if (instrument.bars[i].items[j] instanceof Model.TimeSignature) {
                        timeSignature = <Model.TimeSignature>instrument.bars[i].items[j];
                    }
                }
                if (instrument.bars[i].ID === bar.ID) {
                    break;
                }
            }

            var countables: (Model.Rest | Model.Chord)[] = getItemsWhere(bar.items, function (item) {
                var isRest = item instanceof Model.Rest;
                var isNote = item instanceof Model.Note;
                var isChord = item instanceof Model.Chord;

                return isRest || isNote;
            });

            var count = sum(countables, function (item: Model.Rest | Model.Note) {

                return getCrotchetsFromNoteLength(item.length);

            });

            return count != timeSignature.top;

        }

    }

} 