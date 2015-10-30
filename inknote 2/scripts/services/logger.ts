module Inknote {

    export enum MessageType {
        Error,
        Text,
        Warning
    }

    function logLive(message: string, className: string) {
        if (typeof (window) != typeof (undefined)) {
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
            logLive(message, "error");
            return;
        }

        var logLevel = TempDataService ? TempDataService.Instance.currentData.loggingLevel : 3;
        
        if (msgType == MessageType.Warning){
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