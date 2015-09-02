module Inknote {

    export var CONFIRM_IS_OPEN = false;

    export function check(text: string, onTrue: () => void, onFalse?: () => void): void {
        CONFIRM_IS_OPEN = true;

        var confirmCover = document.getElementById("confirm-cover");
        FrontEnd.showElement(confirmCover);

        var confirmBox = document.getElementById("confirm-box");
        FrontEnd.showElement(confirmBox);

        var textDiv = document.getElementById("confirm-text");
        textDiv.innerText = text;

        var ok = document.getElementById("confirm-ok");

        var listener = function () {
            FrontEnd.hideElement(confirmBox);
            FrontEnd.hideElement(confirmCover);
            onTrue();
            setTimeout(function () {
                CONFIRM_IS_OPEN = false;
            }, 300);
        };

        ok.onclick = listener;
        ok.onmouseup = function () {
            ok.removeEventListener("click", listener);
        }

        ok.focus();

        var cancel = document.getElementById("confirm-cancel");
        
        var cancelBlurListener = function (e) {
            e.preventDefault();
            ok.focus();
        };

        cancel.onblur = cancelBlurListener;

        var cancelListener = function () {
            FrontEnd.hideElement(confirmBox);
            FrontEnd.hideElement(confirmCover);
            if (onFalse) {
                onFalse();
            }
            setTimeout(function () {
                CONFIRM_IS_OPEN = false;
            }, 300);
        };

        cancel.onclick = cancelListener;
        cancel.onmouseup = function () {
            cancel.removeEventListener("click", cancelListener);
            cancel.removeEventListener("blur", cancelBlurListener);
        }

        //if (confirm(text)) {

        //    onTrue();

        //    return;
        //}

        //onFalse();
    }

} 