module Inknote {

    document.onkeydown = function (e) {
        if (e.keyCode == 8) {
            e.preventDefault();
        }
    }

    window.onkeyup = function (ev: KeyboardEvent) {

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

    function scoreType(e: KeyboardEvent) {
        var inst = Managers.ProjectManager.Instance;
        var proj = inst.currentProject;
        // name is selected

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