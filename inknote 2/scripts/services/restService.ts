module Inknote {

    export function requiredRestSpace(rest: Drawing.Rest, lineHeight: number): number {
        var spaceNeeded = lineHeight;

        // padding;
        spaceNeeded += lineHeight;

        return spaceNeeded;
    }

    export function getDrawingItemFromRest(rest: Model.Rest): Drawing.Rest {
        switch (rest.length) {
            case Model.NoteLength.Breve:
                return new Drawing.BreveRest();
                break;
            case Model.NoteLength.SemiBreve:
                return new Drawing.SemiBreveRest();
                break;
            case Model.NoteLength.Minim:
                return new Drawing.MinimRest();
                break;
            case Model.NoteLength.Crotchet:
                return new Drawing.CrotchetRest();
                break;
            case Model.NoteLength.Quaver:
                return new Drawing.QuaverRest();
                break;
            case Model.NoteLength.SemiQuaver:
                return new Drawing.SemiQuaverRest();
                break;
            case Model.NoteLength.DemiSemiQuaver:
                return new Drawing.DemiSemiQuaverRest();
                break;
            case Model.NoteLength.HemiDemiSemiQuaver:
                return new Drawing.HemiDemiSemiQuaverRest();
                break;
        }
    }

} 