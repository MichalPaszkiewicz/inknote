module Inknote {

    export function requiredClefSpace(item: Model.Clef, lineHeight: number) {

        return 40;

    }

    export function areSameClefs(clef: Model.Clef, clef2: Model.Clef): boolean {
        var sameClefType = clef.clefType == clef2.clefType;
        var sameDrawLocation = clef.drawLocation == clef2.drawLocation;
        var samePositionFromTreble = clef.positionFromTreble == clef2.positionFromTreble;

        return sameClefType && sameDrawLocation && samePositionFromTreble;
    }

    export function getNextClef(clef: Model.Clef, goUp: boolean): Model.Clef{

        var clefs: Model.Clef[] = [];
        clefs.push(new Model.FrenchViolinClef());
        clefs.push(new Model.TrebleClef());
        clefs.push(new Model.SopranoClef());
        clefs.push(new Model.MezzoSopranoClef());
        clefs.push(new Model.AltoClef());
        clefs.push(new Model.TenorClef());
        clefs.push(new Model.BaritoneClef());
        clefs.push(new Model.BassClef());
        clefs.push(new Model.SubbassClef());

        var resultClef: Model.Clef = null;

        for (var i = 0; i < clefs.length; i++) {
            var tempClef = clefs[i];

            if (areSameClefs(clef, tempClef)) {
                if (goUp === true) {
                    var index = i == 0 ? i = clefs.length - 1 : i - 1;

                    resultClef = clefs[index];
                }
                else {
                    resultClef = clefs[(i + 1) % clefs.length];
                }
            }
        }

        resultClef.ID = clef.ID;

        return resultClef;
    }

} 