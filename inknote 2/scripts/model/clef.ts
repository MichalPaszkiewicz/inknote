module Inknote.Model {

    export class Clef {
        clefType: ClefType;
    }

    export enum ClefType {
        GClef,
        CClef,
        FClef
    }

    export class FrenchViolinClef extends Clef {
        clefType = ClefType.GClef;
    }

    export class TrebleClef extends Clef {
        clefType = ClefType.GClef;
    }

    export class SopranoClef extends Clef {
        clefType = ClefType.CClef;
    }

    export class MezzoSopranoClef extends Clef {
        clefType = ClefType.CClef;
    }

    export class AltoClef extends Clef {
        clefType = ClefType.CClef;
    }

    export class TenorClef extends Clef {
        clefType = ClefType.CClef;
    }

    export class BaritoneClef extends Clef {
        clefType = ClefType.FClef;
    }

    export class BassClef extends Clef {
        clefType = ClefType.FClef;
    }

    export class SubbassClef extends Clef {
        clefType = ClefType.FClef;
    }
} 