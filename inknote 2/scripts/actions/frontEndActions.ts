module FrontEnd {

    export function toggleElement(item: HTMLElement) {
        var classes = item.className;

        var isHidden = classes.indexOf("hidden") != -1;

        if (isHidden) {
            showElement(item);
        }
        else {
            hideElement(item);
        }
    }

    export function hideElement(item: HTMLElement) {
        var classes = item.className;

        var isHidden = classes.indexOf("hidden") != -1;

        if (!isHidden) {
            item.className = item.className.trim();
            item.className = item.className + " hidden";
        }
    }

    export function showElement(item: HTMLElement) {
        var classes = item.className;

        var isHidden = classes.indexOf("hidden") != -1;

        if (isHidden) {
            item.className = item.className.replace("hidden", "");
        }
    }

    export function deSelect(item: HTMLElement) {

        var classes = item.className;

        var isHidden = classes.indexOf("select") != -1;

        if (isHidden) {
            item.className = item.className.replace("select", "");
        }
    }

    export function select(item: HTMLElement) {
        var classes = item.className;

        var isHidden = classes.indexOf("select") != -1;

        if (!isHidden) {
            item.className = item.className + " select";
        }
    }

    export function addClass(item: HTMLElement, className: string) {
        var classes = item.className;

        var isClass = classes.indexOf(className) != -1;

        if (!isClass) {
            item.className = item.className + " " + className;
        }
    }

    export function removeClass(item: HTMLElement, className: string) {
        var classes = item.className;

        var isClass = classes.indexOf(className) != -1;

        if (isClass) {
            item.className = item.className.replace(className, "");
        }
    }

    export function toggleClass(item: HTMLElement, className: string) {
        var classes = item.className;

        var isClass = classes.indexOf(className) != -1;

        if (isClass) {
            item.className = item.className.replace(className, "");
        }
        else {
            item.className = item.className + " " + className;
        }
    }

}

module Menu {

    export var isMenuOpen = false;

    export var scoreItems: NodeList;

    export var desktopItems: NodeList;

    var menuButton: HTMLDivElement;
    var menu: HTMLDivElement;

    if (typeof (window) != typeof (undefined)) {
        scoreItems = document.getElementsByClassName("score-item");

        desktopItems = document.getElementsByClassName("desktop-item");

        menuButton = <HTMLDivElement>document.getElementsByClassName("menu-button")[0];
        menu = <HTMLDivElement>document.getElementById("main-menu");

    }

    export function updateMenuItems() {
        for (var i = 0; i < scoreItems.length; i++) {

            if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.Score) {
                FrontEnd.showElement(<HTMLElement>scoreItems[i]);
            }
            else {
                FrontEnd.hideElement(<HTMLElement>scoreItems[i]);
            }
        }

        for (var i = 0; i < desktopItems.length; i++) {

            if (Inknote.Managers.MachineManager.Instance.machineType == Inknote.Managers.MachineType.Desktop) {
                FrontEnd.showElement(<HTMLElement>desktopItems[i]);
            }
            else {
                FrontEnd.hideElement(<HTMLElement>desktopItems[i]);
            }

        }
    }

    export function toggle() {
        if (!isMenuOpen) {
            closeAllSubMenus();
        }

        isMenuOpen = !isMenuOpen;

        updateMenuItems();

        FrontEnd.toggleClass(menuButton, "open");
        FrontEnd.toggleClass(menu, "open");
    }

    export function closeAllSubMenus(e?: MouseEvent) {

        if (e && e.currentTarget != e.target) {
            return;
        }

        var subs = document.getElementsByClassName("sub-menu");

        for (var i = 0; i < subs.length; i++) {
            FrontEnd.removeClass(<HTMLElement>subs[i], "open");
        }
    }

    export function openSubMenu(id: string) {

        FrontEnd.addClass(document.getElementById(id), "open");
    }

    export function closeSubMenu(id: string) {
        FrontEnd.removeClass(menu, "open");
        FrontEnd.removeClass(menuButton, "open");

        FrontEnd.removeClass(document.getElementById(id), "open");
    }
}

module Modal {

    export var isModalOpen = false;

    export function toggle(ID: string) {
        var item = document.getElementById(ID);

        isModalOpen = !isModalOpen;

        FrontEnd.toggleElement(item);
        FrontEnd.toggleElement(document.getElementById("modal-cover"));
    }

    export function hideAllModals() {
        var modals = document.getElementsByClassName("modal");

        for (var i = 0; i < modals.length; i++) {
            if ((<HTMLElement>modals[i]).className.indexOf("hidden") == -1) {
                FrontEnd.hideElement(<HTMLElement>modals[i]);
            }
        }

        isModalOpen = false;

        FrontEnd.hideElement(document.getElementById("modal-cover"));
    }

    export function hide(ID: string) {
        var item = document.getElementById(ID);

        isModalOpen = false;

        FrontEnd.hideElement(item);
        FrontEnd.hideElement(document.getElementById("modal-cover"));
    }

    export function show(ID: string) {
        var item = document.getElementById(ID);

        isModalOpen = true;

        FrontEnd.showElement(item);

        FrontEnd.showElement(document.getElementById("modal-cover"));
    }

    export function cancelReport() {
        var textElement = <HTMLTextAreaElement>document.getElementById("report-text");
        var checkElement = <HTMLInputElement>document.getElementById("report-checkbox");

        textElement.value = "";
        checkElement.checked = false;

        hide("report");
    }

    export function submitReport() {
        var textElement = <HTMLTextAreaElement>document.getElementById("report-text");
        var checkElement = <HTMLInputElement>document.getElementById("report-checkbox");

        var text = textElement.value;
        var check = checkElement.checked;

        if (!check) {
            Inknote.log("a robot is trying to submit a bug report", Inknote.MessageType.Warning);
            return;
        }

        if (!text) {
            Inknote.check("You cannot send a bug report without a description. Please try again.", function () { }, function () { cancelReport(); });
            return;
        }

        var relevantThreadID = Inknote.getID();

        var threadObject = {
            id: relevantThreadID,
            subject: "Bug: #" + relevantThreadID,
            posts: []
        };
        var postObject = {
            user: "Anonymous",
            threadID: relevantThreadID,
            message: text,
            time: (new Date()).toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        var stringThread = JSON.stringify(threadObject);
        var stringPost = JSON.stringify(postObject);

        Inknote.HttpService.Instance.post(Inknote.Managers.SettingsManager.Current.serverURL + "/threads", stringThread,
            function (e) {
                Inknote.log("bug report thread created", Inknote.MessageType.Text);

                Inknote.HttpService.Instance.post(Inknote.Managers.SettingsManager.Current.serverURL + "/posts", stringPost,
                    function (e) {
                        Inknote.log("bug report submitted", Inknote.MessageType.Text);
                    }, function (e) {
                        Inknote.log("sending bug report failed", Inknote.MessageType.Error);
                    });
            }, function (e) {
                Inknote.log("failed to create thread", Inknote.MessageType.Error);
            });

        textElement.value = "";
        checkElement.checked = false;

        hide("report");
    }

    export function generateProjectReport() {

        var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;

        var reportDetails = document.getElementById("project-report-details");
        reportDetails.innerHTML = "";

        var header = document.createElement("h2");
        header.textContent = currentProject.name + " report";
        reportDetails.appendChild(header);
        
        var barCount = document.createElement("div");
        barCount.className = "form-row";
        barCount.textContent = "bars: " + currentProject.instruments[0].bars.length;
        reportDetails.appendChild(barCount);

        var numberOfNotes = 0;

        for (var i = 0; i < currentProject.instruments.length; i++) {
            for (var j = 0; j < currentProject.instruments[i].bars.length; j++) {
                for (var k = 0; k < currentProject.instruments[i].bars[j].items.length; k++) {
                    var item = currentProject.instruments[i].bars[j].items[k];

                    if (item instanceof Inknote.Model.Note) {
                        numberOfNotes++;
                    }
                    else if (item instanceof Inknote.Model.Chord) {
                        numberOfNotes += item.notes.length;
                    }
                }
            }
        }

        var noteCount = document.createElement("div");
        noteCount.className = "form-row";
        noteCount.textContent = "notes: " + numberOfNotes;
        reportDetails.appendChild(noteCount);

        Modal.show("project-report");
    }
}

module Actions.Plugins {

    export function PluginMenuClick(ev: HTMLElement, ID: string) {

        var target = <HTMLDivElement>ev;

        var menuItems = document.getElementsByClassName("plugin-menu-item");

        var pageItems = [
            "plugin-list",
            "plugin-event-list",
            "plugin-advanced"
        ];

        for (var item = 0; item < menuItems.length; item++) {
            FrontEnd.deSelect(<HTMLElement>menuItems[item]);
        }

        for (var item = 0; item < pageItems.length; item++) {
            var pageItem = document.getElementById(pageItems[item]);

            FrontEnd.hideElement(pageItem);
        }

        var openItem = document.getElementById(ID);

        FrontEnd.showElement(openItem);

        FrontEnd.select(target);

    }

}


module SynthBindings {

    export function getSynthValues() {
        var currentSynth = Inknote.Audio.SynthService.Instance.synth;

        var synthWaveShapeSelect = <HTMLSelectElement>document.getElementById("synth-wave-shape");
        synthWaveShapeSelect.value = Inknote.Audio.getSoundType(currentSynth.oscillatorType);

        var synthGainInput = <HTMLInputElement>document.getElementById("synth-gain");
        synthGainInput.valueAsNumber = currentSynth.gain;
        
        var synthDelayInput = <HTMLInputElement>document.getElementById("synth-delay");
        synthDelayInput.valueAsNumber = currentSynth.delay;
    }

    export function loadSynthData() {

        var synths = Inknote.Audio.SynthManager.Instance.getSynths();
        var synthDiv = <HTMLDivElement>document.getElementById("synth-list");
        
        synthDiv.innerHTML = "";

        for (var i = 0; i < synths.length; i++) {
            var formRow = document.createElement("div");
            formRow.className = "form-row";

            var synthID = document.createElement("span");
            synthID.textContent = synths[i].ID;
            synthID.className = "list-column";
            formRow.appendChild(synthID);

            var synthName = document.createElement("span");
            synthName.textContent = synths[i].name;
            synthName.className = "list-column";
            formRow.appendChild(synthName);

            var editButton = document.createElement("div");
            editButton.className = "button";
            editButton.textContent = "edit";
            editButton.setAttribute("data-id", synths[i].ID);
            editButton.setAttribute("data-name", synths[i].name);
            editButton.onclick = function (e) {
                var target = <HTMLDivElement>e.target;
                var id = target.getAttribute("data-id");
                var name = target.getAttribute("data-name");

                Inknote.Audio.SynthService.setSynth(id, name);
                SynthBindings.getSynthValues();

                Modal.toggle('synth');
                Modal.toggle('synth-edit');
            };
            formRow.appendChild(editButton);

            var deleteButton = document.createElement("div");
            deleteButton.className = "button negative";
            deleteButton.textContent = "x";
            deleteButton.setAttribute("data-id", synths[i].ID);
            deleteButton.setAttribute("data-name", synths[i].name);
            deleteButton.onclick = function (e) {
                var target = <HTMLDivElement>e.target;
                var id = target.getAttribute("data-id");
                var name = target.getAttribute("data-name");

                Inknote.Audio.SynthManager.Instance.deleteSynth(id, name, function () {
                    SynthBindings.loadSynthData();
                });
            }
            formRow.appendChild(deleteButton);

            synthDiv.appendChild(formRow);
        }

    }

    export function addSynth() {

        var synthName = prompt("What is the name of your new synth?");

        var newSynth = new Inknote.Audio.Synth(synthName);

        Inknote.Audio.SynthManager.Instance.addSynth(newSynth);
        loadSynthData();
        
        Inknote.Audio.SynthService.setSynth(newSynth.ID, newSynth.name);
        SynthBindings.getSynthValues();

        Modal.toggle('synth');
        Modal.toggle('synth-edit');
    }

    if (typeof (window) != typeof (undefined)) {
        var synthWaveShapeSelect = document.getElementById("synth-wave-shape");
        synthWaveShapeSelect.onchange = function (e) {
            var select = <HTMLSelectElement>e.target;

            var value = select.value;

            Inknote.Audio.SynthService.Instance.changeWaveShape(value);
        };

        var synthGainInput = document.getElementById("synth-gain");
        synthGainInput.onchange = function (e) {
            var input = <HTMLInputElement>e.target;

            var value = input.valueAsNumber;

            Inknote.Audio.SynthService.Instance.changeGain(value);
        };

        var synthDelayInput = document.getElementById("synth-delay");
        synthDelayInput.onchange = function (e) {
            var input = <HTMLInputElement>e.target;

            var value = input.valueAsNumber;

            Inknote.Audio.SynthService.Instance.changeDelay(value);
        };

        loadSynthData();
    }


}