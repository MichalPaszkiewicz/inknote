module Inknote.Model {

    export class Clef {

        ID: string = getID();

        clefType: ClefType;
        // amount of notes (space/line) from treble note position.
        // this is the difference to be used for all notes drawn in the project.
        positionFromTreble: number;
        // amount of notes down from top line to draw the clef symbol.
        drawLocation: number;
    }

    export enum ClefType {
        GClef,
        CClef,
        FClef
    }

    export class FrenchViolinClef extends Clef {
        clefType = ClefType.GClef;
        positionFromTreble = 2;
        drawLocation = 8;
    }

    export class TrebleClef extends Clef {
        clefType = ClefType.GClef;
        positionFromTreble = 0;
        drawLocation = 6;
    }

    export class SopranoClef extends Clef {
        clefType = ClefType.CClef;
        positionFromTreble = -2;
        drawLocation = 8;
    }

    export class MezzoSopranoClef extends Clef {
        clefType = ClefType.CClef;
        positionFromTreble = -4;
        drawLocation = 6;
    }

    export class AltoClef extends Clef {
        clefType = ClefType.CClef;
        positionFromTreble = -6;
        drawLocation = 4;
    }

    export class TenorClef extends Clef {
        clefType = ClefType.CClef;
        positionFromTreble = -8;
        drawLocation = 2;
    }

    export class BaritoneClef extends Clef {
        clefType = ClefType.FClef;
        positionFromTreble = -10;
        drawLocation = 4;
    }

    export class BassClef extends Clef {
        clefType = ClefType.FClef;
        positionFromTreble = -12;
        drawLocation = 2;
    }

    export class SubbassClef extends Clef {
        clefType = ClefType.FClef;
        positionFromTreble = -14;
        drawLocation = 0;
    }
} 