module Inknote.Model {

    export function NoteIsInKey(note: Note, key: Key): boolean {
        
        for (var i = 0; i < key.notesInKey.length; i++) {
            if (note.value == key.notesInKey[i]) {
                return true;
            }
        }

        return false;
    }

} 