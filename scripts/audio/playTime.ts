module Inknote.Audio {

    export function getPlayingTimeFromNoteLength(val: Model.NoteLength, bpm: number) {

        var second = 1000;
        var minute = second * 60;

        var beatLength = minute / bpm;

        // bpm has to be given from crotchet!
        var crotchets = getCrotchetsFromNoteLength(val);

        return crotchets * beatLength;      

    }

    export function getPlayingTime(note: Model.Note, bpm: number): number {

        return getPlayingTimeFromNoteLength(note.length, bpm);

    }

}