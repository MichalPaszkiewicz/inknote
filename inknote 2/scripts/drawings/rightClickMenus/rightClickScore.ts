module Inknote.Drawing.RightClickMenus {

    export class RightClickScore extends RightClickMenu {

        constructor() {
            super();

            this.items.unshift(new ClickableMenuItem("properties", function () {

                var project = Managers.ProjectManager.Instance.currentProject;

                ProjectOptionsService.Instance.open(project);

            }));
            this.items.unshift(new ClickableMenuItem("add a bar", function () {

                NoteControlService.Instance.addBar();
                ScoringService.Instance.refresh();

            }));
            this.items.unshift(new ClickableMenuItem("add instrument", function () {

                var name = prompt("What is the name of the new instrument?");
                if (name != "" && name != null) {
                    NoteControlService.Instance.addInstrument(name);
                }

                if (name == "") {
                    check("Your instrument name cannot be empty", null, null);
                }
            }));

        }

    }

} 