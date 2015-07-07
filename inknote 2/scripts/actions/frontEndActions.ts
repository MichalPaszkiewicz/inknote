module Modal {

    export function toggle(ID: string) {
        var item = document.getElementById(ID);

        toggleElement(item);
        toggleElement(document.getElementById("modal-cover"));
    }

    export function hideAllModals() {
        var modals = document.getElementsByClassName("modal");

        for (var i = 0; i < modals.length; i++) {
            if ((<HTMLElement>modals[i]).className.indexOf("hidden") == -1) {
                hideElement(<HTMLElement>modals[i]);
            }
        }

        hideElement(document.getElementById("modal-cover"));
    }

    export function hide(ID: string) {
        var item = document.getElementById(ID);

        hideElement(item);
        hideElement(document.getElementById("modal-cover"));
    }

    export function show(ID: string) {
        var item = document.getElementById(ID);

        showElement(item);

        showElement(document.getElementById("modal-cover"));
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

    function toggleElement(item: HTMLElement) {
        var classes = item.className;

        var isHidden = classes.indexOf("hidden") != -1;

        if (isHidden) {
            showElement(item);


        }
        else {
            hideElement(item);
        }
    }

    function hideElement(item: HTMLElement) {
        item.className = item.className + " hidden";
    }

    function showElement(item: HTMLElement) {

        item.className = item.className.replace("hidden", "");
    }

}