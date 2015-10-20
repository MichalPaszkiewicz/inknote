module Inknote {

    export class InstrumentService {

        private static _instance: InstrumentService;

        static get Instance(): InstrumentService {
            if (!InstrumentService._instance) {
                InstrumentService._instance = new InstrumentService();
            }
            return InstrumentService._instance;
        }

        addInstrument() {

            var name = prompt("What is the name of the new instrument?");
            if (name != "" && name != null) {
                NoteControlService.Instance.addInstrument(name);
            }

            if (name == "") {
                check("Your instrument name cannot be empty", null, null);
            }

        }

        openInstrumentEditor() {
            Modal.toggle("instruments");

            function drawInstrumentEditModal() {
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

                    var synthSelect = document.createElement("select");
                    synthSelect.setAttribute("data-id", instruments[i].ID);

                    var synthList = Audio.SynthManager.Instance.getSynths();

                    var emptyOption = document.createElement("option");
                    emptyOption.value = "";
                    emptyOption.text = "none";
                    if (!instruments[i].synthName && !instruments[i].synthID){
                        emptyOption.selected = true;
                    }           
                    
                    synthSelect.appendChild(emptyOption);         

                    synthSelect.onchange = function (ev) {

                        var ele = <HTMLSelectElement>ev.target;
                        var id = ele.getAttribute("data-id");
                        var proj = Managers.ProjectManager.Instance.currentProject;

                        for (var j = 0; j < proj.instruments.length; j++) {
                            if (proj.instruments[j].ID == id) {
                                if (synthSelect.value == "") {
                                    proj.instruments[j].synthName = null;
                                    proj.instruments[j].synthID = null;
                                }
                                else {
                                    var breakPoint = synthSelect.value.indexOf("|");
                                    var synthID = synthSelect.value.substring(0, breakPoint - 1);
                                    var synthName = synthSelect.value.substring(breakPoint + 1);

                                    proj.instruments[j].synthName = synthName;
                                    proj.instruments[j].synthID = synthID;
                                }
                            }
                        }
                    }

                    for (var j = 0; j < synthList.length; j++) {
                        var optionItem = document.createElement("option");

                        optionItem.value = synthList[j].ID + "|" + synthList[j].name;
                        optionItem.textContent = synthList[j].name;

                        optionItem.selected = synthList[j].ID == instruments[i].synthID;

                        synthSelect.appendChild(optionItem);
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

                    var up = document.createElement("span");
                    var down = document.createElement("span");

                    up.textContent = "▲";
                    down.textContent = "▼";
                    up.className += " button";
                    down.className += " button";
                    up.setAttribute("data-id", instruments[i].ID);
                    down.setAttribute("data-id", instruments[i].ID);

                    up.onclick = function (e) {
                        var ele = <HTMLInputElement>e.target;
                        var id = ele.getAttribute("data-id");

                        InstrumentService.Instance.moveUpFromID(id);
                        drawInstrumentEditModal();
                    }

                    down.onclick = function (e) {
                        var ele = <HTMLInputElement>e.target;
                        var id = ele.getAttribute("data-id");

                        InstrumentService.Instance.moveDownFromID(id);
                        drawInstrumentEditModal();
                    }

                    var deleteBtn = document.createElement("span");

                    deleteBtn.textContent = "x";
                    deleteBtn.className += " button negative";
                    deleteBtn.setAttribute("data-id", instruments[i].ID);

                    deleteBtn.onclick = function (e) {
                        var ele = <HTMLInputElement>e.target;
                        var id = ele.getAttribute("data-id");

                        InstrumentService.Instance.deleteFromID(id, function () {
                            drawInstrumentEditModal();
                        });
                    }

                    formRow.appendChild(instrumentHolder);
                    formRow.appendChild(synthSelect);
                    formRow.appendChild(isVisible);
                    formRow.appendChild(up);
                    formRow.appendChild(down);
                    formRow.appendChild(deleteBtn);
                    instrumentList.appendChild(formRow);

                }
            }

            drawInstrumentEditModal();
        }

        moveUpFromID(id: string) {
            var proj = Managers.ProjectManager.Instance.currentProject;

            var newInstruments = [];

            for (var j = 0; j < proj.instruments.length; j++) {
                if (proj.instruments[j + 1] && proj.instruments[j + 1].ID == id) {
                    newInstruments.push(proj.instruments[j + 1]);
                    newInstruments.push(proj.instruments[j]);
                    j++;
                }
                else {
                    newInstruments.push(proj.instruments[j]);
                }
            }

            proj.instruments = newInstruments;
            ScoringService.Instance.refresh();
        }

        moveDownFromID(id: string) {
            var proj = Managers.ProjectManager.Instance.currentProject;

            var newInstruments = [];

            for (var j = 0; j < proj.instruments.length; j++) {
                if (proj.instruments[j].ID == id && proj.instruments[j + 1]) {
                    newInstruments.push(proj.instruments[j + 1]);
                    newInstruments.push(proj.instruments[j]);
                    j++;
                }
                else {
                    newInstruments.push(proj.instruments[j]);
                }
            }

            proj.instruments = newInstruments;
            ScoringService.Instance.refresh();
        }
    
        deleteFromID(id: string, then?: () => void) {
            check("Are you sure you want to delete this instrument?", function () {
                var proj = Managers.ProjectManager.Instance.currentProject;

                var newInstruments = [];

                for (var j = 0; j < proj.instruments.length; j++) {
                    if (proj.instruments[j].ID != id){
                        newInstruments.push(proj.instruments[j]);
                    }
                }

                proj.instruments = newInstruments;

                then();

                ScoringService.Instance.refresh();
            });
        }

    }

}