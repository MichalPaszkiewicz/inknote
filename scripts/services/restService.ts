module Inknote {

    export function requiredRestSpace(rest: Model.Rest, lineHeight: number): number {
        var spaceNeeded = lineHeight;

        // padding;
        spaceNeeded += lineHeight;

        return spaceNeeded;
    }

    export function getDrawingItemFromRest(rest: Model.Rest): Drawing.Rest {
        var result: Drawing.Rest = null;

        switch (rest.length) {
            case Model.NoteLength.Breve:
                result = new Drawing.BreveRest();
                break;
            case Model.NoteLength.SemiBreve:
                result = new Drawing.SemiBreveRest();
                break;
            case Model.NoteLength.Minim:
                result = new Drawing.MinimRest();
                break;
            case Model.NoteLength.Crotchet:
                result = new Drawing.CrotchetRest();
                break;
            case Model.NoteLength.Quaver:
                result = new Drawing.QuaverRest();
                break;
            case Model.NoteLength.SemiQuaver:
                result = new Drawing.SemiQuaverRest();
                break;
            case Model.NoteLength.DemiSemiQuaver:
                result = new Drawing.DemiSemiQuaverRest();
                break;
            case Model.NoteLength.HemiDemiSemiQuaver:
                result = new Drawing.HemiDemiSemiQuaverRest();
                break;
        }

        result.ID = rest.ID;

        return result;
    }

} 