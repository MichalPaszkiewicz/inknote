module Inknote{

    export function identifyChord(chord: Model.Chord): IChordable {

        // todo: finish this off.
        throw new Error("Not fully implemented");

        return getCurrentChordNotation(chord.notes[0], chord.notes[0], true, "#5");
    }

} 