module Inknote {

    if (typeof document != "undefined" && typeof window != "undefined"){
        document.onkeydown = function (e) {
            if (CONFIRM_IS_OPEN) {
                return;
            }

            if (e.keyCode == 8) {
                e.preventDefault();
            }
        }

        window.onkeyup = function (ev: KeyboardEvent) {
            if (CONFIRM_IS_OPEN) {
                return;
            }

            switch (Managers.PageManager.Current.page) {
                case Managers.Page.File:
                    fileType(ev);
                    break;
                case Managers.Page.Score:
                    scoreType(ev);
                    break;
                default:
                    break;
            }

        }
    }

    function scoreType(e: KeyboardEvent) {
        var inst = Managers.ProjectManager.Instance;
        var proj = inst.currentProject;
        // name is selected

        var noteVal: Model.NoteValue = null;

        if (!ProjectConverter.name.select) {
            switch (e.keyCode) {
                // a
                case 65:
                    noteVal = Model.NoteValue.C;
                    break;
                // w
                case 87:
                    noteVal = Model.NoteValue.Db;
                    break;
                // s
                case 83:
                    noteVal = Model.NoteValue.D;
                    break;
                // e
                case 69:
                    noteVal = Model.NoteValue.Eb;
                    break;
                // d
                case 68:
                    noteVal = Model.NoteValue.E;
                    break;
                // f
                case 70:
                    noteVal = Model.NoteValue.F;
                    break;
                // t
                case 84:
                    noteVal = Model.NoteValue.Gb;
                    break;
                // g
                case 71:
                    noteVal = Model.NoteValue.G;
                    break;
                // y
                case 89:
                    noteVal = Model.NoteValue.Ab;
                    break;
                // h
                case 72:
                    noteVal = Model.NoteValue.A;
                    break;
                // u
                case 85:
                    noteVal = Model.NoteValue.Bb;
                    break;
                // j
                case 74:
                    noteVal = Model.NoteValue.B;
                    break;
                // left
                case 37:
                    ScoringService.Instance.cursorLeft();
                    break;
                // right
                case 39:
                    ScoringService.Instance.cursorRight();
                    break;
                // up
                case 38:
                    NoteControlService.Instance.noteValueUp();
                    break;
                // down
                case 40:
                    NoteControlService.Instance.noteValueDown();
                    break;
                // delete
                case 46:
                    if (ScoringService.Instance.SelectedItem instanceof Drawing.Note) {
                        NoteControlService.Instance.deleteItem();
                    }
                    else if (ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
                        BarService.Instance.deleteSelectedBar();
                    }
            }
        }

        if (noteVal != null) {
            if (ScoringService.Instance.selectID == null) {
                NoteControlService.Instance.addNote(
                    new Model.Note(
                        noteVal,
                        NoteControlService.Instance.piano.octave,
                        NoteControlService.Instance.lengthControl.selectedLength));
            }
            else {
                NoteControlService.Instance.editNoteValueAndOctave(noteVal, NoteControlService.Instance.piano.octave);
            }
        }

        if (inst.selectID == proj.ID) {
            if (e.keyCode == 13) {
                // enter
                inst.selectID = null;
            }
            else if (countWhere([16, 17, 18, 20], function (item: number) { return item == e.keyCode }) > 0) {
                // alt, ctrl shift, etc
            }
            else if (e.keyCode == 8) {
                // backspace
                proj.name = proj.name.substr(0, proj.name.length - 1);
            }
            else if (e.keyCode == 46) {
                // delete
                proj.name = "";

            }
            else {
                proj.name = pascalCase(proj.name + String.fromCharCode(e.keyCode));
            }
        }
        e.preventDefault();
    }

    function fileType(e: KeyboardEvent) {
        var inst = Managers.ProjectManager.Instance;
        var proj = inst.currentProject;

        if (e.keyCode == 13) {
            // enter
            inst.openSelectedProject();
        }
        else if (e.keyCode == 38) {
            // up
            ScrollService.Instance.up();
        }
        else if (e.keyCode == 40) {
            // down
            ScrollService.Instance.down();
        }
        else if (e.keyCode == 37) {
            // left
            inst.previous();
        }
        else if (e.keyCode == 39) {
            // right
            inst.next();
        }
        else if (e.keyCode == 46) {
            // delete
            inst.deleteSelectedProject();
        }

    }
} 