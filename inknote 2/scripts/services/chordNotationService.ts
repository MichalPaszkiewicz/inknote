module Inknote {

    export function getCurrentChordNotation(baseNote: Model.Note,
        rootNote: Model.Note,
        minor: boolean,
        annotations: string): IChordable {

        switch (Managers.SettingsManager.Instance.getCurrentSetting().notationType) {
            case NotationType.Standard:
                return new ChordNotation.StandardChordNotation(baseNote, rootNote, minor, annotations);
                break;
            case NotationType.UPPER_lower:
                return new ChordNotation.UPPER_lowerChordNotation(baseNote, rootNote, minor, annotations);
                break;
            case NotationType.DoReMi:
                return new ChordNotation.DoReMiChordNotation(baseNote, rootNote, minor, annotations);
                break;
            default:
                return new ChordNotation.StandardChordNotation(baseNote, rootNote, minor, annotations);
        }
    }

} 