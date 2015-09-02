/// <reference path="utils.js" />
/// <reference path="sanityCommand.js" />

// Handles the incoming messages (sanity commands) 
(function sanityPreviewWindowListener() {
    chrome.runtime.onMessage.addListener(function (message, sender) {

        // known plug-ins which open iframes to be ignored
        //if (window.location.host == "s7.addthis.com")
        //{
        //    return;
        //}
        if (message.baseUrl.toLowerCase().indexOf(window.location.origin.toLowerCase()) === -1) {
            return;
        }

        if (window.isMain() && sessionStorage.executingCommandId === message.guid) {
            return;
        }

        if (window.isMain() && window.hasModal()) {
            return;
        }

        sessionStorage.executingCommandId = message.guid;

        var topWindow = window.top;

        if ("fileDownloaded" in message) {
            topWindow.chrome.runtime.sendMessage((new sanityResponse(message.execute || message.preview)).generateSuccess());
            return;
        }

        var command = new sanityCommand(message);
        command.run(message.COMMAND_TIMEOUT)
            .always(function (result) {
                topWindow.chrome.runtime.sendMessage(result);
            });
    });
})();
