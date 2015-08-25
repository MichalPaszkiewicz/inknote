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

        textElement.value = "";
        checkElement.checked = false;

        hide("report");
    }

}

module Actions.Plugins {

    export function PluginMenuClick(ev: HTMLElement ,ID: string) {

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