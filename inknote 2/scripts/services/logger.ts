module Inknote {

    export enum MessageType {
        Error,
        Text,
        Warning
    }

    var logLevel = TempDataService.Instance.currentData.loggingLevel;

    function logLive(message: string, className: string) {
        if (window != null && document != null) {
            var logContainer = document.getElementById("log");

            var entry = document.createElement("div");
            entry.className = className;
            entry.textContent = message;
            entry.onclick = function (e) {
                var target = <HTMLDivElement> e.target;

                target.remove();
            }

            logContainer.appendChild(entry);

            setTimeout(function () {

                if (logContainer.hasChildNodes()) {
                    var firstChild = logContainer.childNodes[0];

                    logContainer.removeChild(firstChild);
                }

            }, 1000);
        }
    }

    export function log(message: string, msgType?: MessageType) {
        if (msgType == MessageType.Error) {
            console.log("%c" + message, "color:red");
            if (logLevel >= 1) {
                logLive(message, "error");
            }
        }
        else if (msgType == MessageType.Warning){
            console.log("%c" + message, "color: orange");
            if (logLevel >= 2) {
                logLive(message, "warning");
            }
        }
        else {
            console.log(message);
            if (logLevel >= 3) {
                logLive(message, "entry");
            }
        }
    }

}