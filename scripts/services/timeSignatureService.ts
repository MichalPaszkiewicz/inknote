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

        getTimeSignatureAtPoint(bar: Model.Bar, instrument: Model.Instrument): Model.TimeSignature{
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
            return timeSignature;
        }

        getCountables(bar: Model.Bar): (Model.Rest | Model.Note | Model.Chord)[]{
            return getItemsWhere(bar.items, function (item) {
                var isRest = item instanceof Model.Rest;
                var isNote = item instanceof Model.Note;
                var isChord = item instanceof Model.Chord;

                return isRest || isNote;
            });
        }

        barIsFull(bar: Model.Bar, instrument: Model.Instrument): boolean {

            var timeSignature = this.getTimeSignatureAtPoint(bar, instrument);
            var countables = this.getCountables(bar);

            var count = sum(countables, function (item: Model.Note | Model.Rest) {
                return getCrotchetsFromNoteLength(item.length);
            });

            return count >= timeSignature.top;
        }

        barHasError(bar: Model.Bar, instrument: Model.Instrument): boolean {

            var timeSignature = this.getTimeSignatureAtPoint(bar, instrument);
            var countables = this.getCountables(bar);

            var count = sum(countables, function (item: Model.Note | Model.Rest) {
                return getCrotchetsFromNoteLength(item.length);
            });

            return count != timeSignature.top;
        }

        barIsOverflowing(bar: Model.Bar, instrument: Model.Instrument): boolean {
            
            var timeSignature = this.getTimeSignatureAtPoint(bar, instrument);
            var countables = this.getCountables(bar);

            var count = sum(countables, function(item: Model.Note | Model.Rest){
                return getCrotchetsFromNoteLength(item.length)
            });

            // to ensure no floating point error 0.00001
            return count > timeSignature.top + 0.00001;
        }

    }

} 