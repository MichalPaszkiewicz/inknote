/// <reference path="../comms.ts" />
var SANITY_ENABLED = function () {
    var storageItem = localStorage.getItem("isEnabled") || "true";
    return localStorage.getItem("isEnabled") == "true";
};
var Sanity;
(function (Sanity) {
    var Background;
    (function (Background) {
        var Connection = (function () {
            function Connection(Id) {
                this.Id = Id;
            }
            return Connection;
        })();
        var connections = [];
        // **************************************************************************************
        // * W A N T E D     B E H A V I O U R:
        // * Message types received: 
        // * from editor tab:
        // * - open preview window (message.startPreview) { opens preview }
        // * - restart sanity { chrome.tabs.update(existingTab.id, { url: message.baseUrl + "?web.test.command=restart&runner=Sanity", active: true }); }
        // * - command
        // * from preview tab:
        // * - I exist / connect
        // * - success
        // * - fail
        // **************************************************************************************
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            //Comms.awaitMessage(function(message: Comms.Message, sender, sendResponse){
            if (!SANITY_ENABLED()) {
                return;
            }
            // new code
            if (message.from == Sanity.Comms.FROM.editor) {
            }
            else if (message.from == Sanity.Comms.FROM.preview) {

            }
            // todo: remove this.
            // old code
            var session = sanitySession.findByTabId(sender.tab.id);
            if (message.from == "editor-tab") {
                if (session) {
                    if (session.start(message)) {
                        chrome.tabs.get(session.previewTabIds[session.currentPreviewTabIndex], function (existingTab) {
                            if (existingTab) {
                                chrome.tabs.update(existingTab.id, { url: message.baseUrl + "?web.test.command=restart&runner=Sanity", active: true });
                            }
                            else if (message.startPreview) {
                                chrome.windows.create({ focused: true }, function (window) {
                                    var tab = window.tabs[0];
                                    session.previewTabIds[session.currentPreviewTabIndex] = tab.id;
                                    chrome.tabs.update(tab.id, { url: message.baseUrl + "?web.test.command=restart&runner=Sanity", active: true });
                                });
                            }
                        });
                    }
                }
                else if (message.startPreview) {
                    //sanitySession.sessions.push(new sanitySession(sender.tab.id, tab.id, message));
                    chrome.windows.create({ focused: true }, function (window) {
                        var tab = window.tabs[0];
                        sanitySession.sessions.push(new sanitySession(sender.tab.id, tab.id, message));
                        chrome.tabs.update(tab.id, { url: message.baseUrl + "?web.test.command=restart&runner=Sanity", active: true });
                    });
                }
            }
            else if (message.from == "preview-tab") {
                if (!session)
                    return;
                // todo: move this to the preview
                if (message.logOut) {
                    var cookies = [];
                    // traditional asp.net authentication cookie
                    cookies.push({ name: ".ASPXAUTH", url: session.baseUrl });
                    // OWIN-based authentication cookie (OAuth support)
                    cookies.push({ name: ".AspNet.ApplicationCookie", url: session.baseUrl });
                    cookies.forEach(function (cookie) {
                        chrome.cookies.get(cookie, function (existingCookie) {
                            if (existingCookie)
                                chrome.cookies.remove(cookie);
                        });
                    });
                    sendResponse(true);
                }
                else {


                }
            }
        });
    })(Background = Sanity.Background || (Sanity.Background = {}));
})(Sanity || (Sanity = {}));
