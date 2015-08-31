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
            this.items.unshift(new ClickableMenuItem("edit instruments", function () {

                Modal.toggle("instruments");
                
                var instrumentList = document.getElementById("instrument-list");

                instrumentList.innerHTML = "";

                var instruments = Managers.ProjectManager.Instance.currentProject.instruments;

                for (var i = 0; i < instruments.length; i++) {

                    var formRow = document.createElement("div");
                    formRow.className = "form-row";

                    var instrumentHolder = document.createElement("input");
                    instrumentHolder.value = instruments[i].name;
                    instrumentHolder.setAttribute("data-id", instruments[i].ID);
                    
                    instrumentHolder.onkeyup = function (e) {
                        var ele = <HTMLInputElement>e.target;

                        var id = ele.getAttribute("data-id");
                        var proj = Managers.ProjectManager.Instance.currentProject;

                        for (var j = 0; j < proj.instruments.length; j++) {
                            if (proj.instruments[j].ID == id) {
                                proj.instruments[j].name = ele.value;
                            }
                        }

                        ScoringService.Instance.refresh();
                    }   
                    
                    var isVisible = document.createElement("input");
                    isVisible.type = "checkbox";    
                    isVisible.checked = instruments[i].visible;
                    isVisible.setAttribute("data-id", instruments[i].ID);

                    isVisible.className += " small-width";
                    
                    isVisible.onclick = function (e) {
                        var ele = <HTMLInputElement>e.target;
                        var id = ele.getAttribute("data-id");
                        var proj = Managers.ProjectManager.Instance.currentProject;

                        for (var j = 0; j < proj.instruments.length; j++) {
                            if (proj.instruments[j].ID == id) {
                                proj.instruments[j].visible = ele.checked;
                            }
                        }

                        ScoringService.Instance.refresh();
                    }             

                    formRow.appendChild(instrumentHolder);
                    formRow.appendChild(isVisible);
                    instrumentList.appendChild(formRow);

                }

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