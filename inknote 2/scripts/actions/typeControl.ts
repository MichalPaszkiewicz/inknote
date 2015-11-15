module Inknote {

    var keysDown: number[] = [];

    if (typeof document != "undefined" && typeof window != "undefined") {
        document.onkeydown = function (e) {

            if (e.target == document.getElementById("file-search") && e.keyCode != 27) {
                return;
            }

            keysDown.push(e.keyCode);

            if (CONFIRM_IS_OPEN) {
                return;
            }

            if (Modal.isModalOpen === true) {
                return;
            }

            // ctrl
            if (anyItemIs(keysDown, function (item: number) {
                return item == 17;
            })) {

                // c
                // copy
                if (e.keyCode == 67) {
                    ClipboardService.Instance.copy();
                }

                // v
                // paste
                if (e.keyCode == 86) {
                    ClipboardService.Instance.paste();
                }

                // x
                // cut
                if (e.keyCode == 88) {
                    ClipboardService.Instance.cut();
                }

                // z
                // undo
                if (e.keyCode == 90) {
                    UndoService.Instance.undo();
                }
                // s
                // save
                if (e.keyCode == 83) {
                    Action(ActionType.SaveProject);
                    e.preventDefault();
                }
                // p
                // print
                if (e.keyCode == 80) {
                    PrintService.Instance.print();
                    e.preventDefault();
                }

            }

            if (e.keyCode == 8) {
                e.preventDefault();
            }
        }

        window.onkeyup = function (ev: KeyboardEvent) {

            if (ev.target == document.getElementById("file-search") && ev.keyCode != 27) {
                return;
            } 

            keysDown = getItemsWhere(keysDown, function (item: number) {
                return item != ev.keyCode;
            });

            if (anyItemIs(keysDown, function (item: number) {
                return item == 17;
            })) {
                return;
            }

            if (CONFIRM_IS_OPEN) {
                return;
            }

            if (Modal.isModalOpen === true && ev.keyCode != 27) {
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
                // esc
                case 27:
                    Action(ActionType.ToPage, Managers.Page.File);
                    Modal.cancelReport();
                    Modal.hideAllModals();
                    break;
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
                    NoteControlService.Instance.deleteSelected();
                    break;
                // SPACE
                case 32:
                    Audio.AudioService.Instance.toggle();
                    break;
                // <
                case 188:
                // [
                case 219:
                    NoteControlService.Instance.piano.octave--;
                    break;
                // >
                case 190:
                // ]
                case 221:
                    NoteControlService.Instance.piano.octave++;
                    break;
                default:
                    log("key pressed: " + e.keyCode);
            }
        }

        if (noteVal != null) {
            if (ScoringService.Instance.selectID == null || ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
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

        if (ScoringService.Instance.SelectedItem instanceof Drawing.Clef) {

            switch (e.keyCode) {
                // up
                case 38:
                    NoteControlService.Instance.editCurrentClef(true);
                    break;
                // down
                case 40:
                    NoteControlService.Instance.editCurrentClef(false);
                    break;
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

            e.preventDefault();
            return;
        }

        e.preventDefault();

        switch (e.keyCode) {
            // m
            case 77:
                Menu.toggle();
                return;
            case 78:
                Inknote.Action(ActionType.NewProject, Managers.Page.Score);
                return;
        }

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

        switch (e.keyCode) {
            // esc
            case 27:
                Menu.closeAllSubMenus();
                if (Menu.isMenuOpen) {
                    Menu.toggle();
                }
                Modal.cancelReport();
                Modal.hideAllModals();
                RightClickMenuService.Instance.visible = false;
                FrontEnd.hideElement(document.getElementById("search-bar"));
                return;
            // SPACE
            case 32:
                FrontEnd.showElement(document.getElementById("search-bar"));
                return;
            // m
            case 77:
                Menu.toggle();
                return;
            // n
            case 78:
                Inknote.Action(ActionType.NewProject, Managers.Page.Score);
                return;
        }

    }
} 