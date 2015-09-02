/// <reference path="../comms.ts" />

var SANITY_ENABLED = function (): boolean {
    var storageItem = localStorage.getItem("isEnabled") || "true";
    return localStorage.getItem("isEnabled") == "true";
}

module Sanity.Background {

    class Connection {

        constructor(public Id: string) {

        }

    }

    var connections: Connection[] = [];

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

    chrome.runtime.onMessage.addListener(function (message: Comms.Message, sender, sendResponse) {
    //Comms.awaitMessage(function(message: Comms.Message, sender, sendResponse){

        if (!SANITY_ENABLED()) {
            return;
        }

        // new code
        if (message.from == Comms.FROM.editor) {
            // if open new -> open new
            // if send command -> send command to relevant
        }
        else if (message.from == Comms.FROM.preview) {
            // if no session, return?
            // success
            // failure
            if (){
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

                // if session running ....

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
            else if (message.switchWindow) {
                var windowId = session.previewTabIds[session.currentPreviewTabIndex + message.switchWindow];
                if (windowId) {
                    session.currentPreviewTabIndex += message.switchWindow;
                    chrome.tabs.update(windowId, { active: true });
                    sendResponse(true);
                }
                else {
                    sendResponse(false);
                }
            }
            else {

                var isRetrying = session.retry != NUMBER_OF_RETRIES;
                if (isRetrying && message.success) {
                    // error is now rectified, retry the current command
                    session.retry = NUMBER_OF_RETRIES;
                    session.retryCommand();
                    return;
                }

                if (message.success) {

                    // check to prevent last redirect in snapshot call another execute command
                    if (!session.hasReachedEnd) {
                        session.sendCommandResponse(message);
                        session.retry = NUMBER_OF_RETRIES;
                        session.executeNextCommand();
                    }

                }
                else {

                    // handle retry cases
                    if (shouldRetry(message)) {

                        session.retry--;
                        console.log('session.retry', session.retry);

                        if (session.retry >= 0) {
                            // reload to make another message based on the condition of the page
                            reloadBaseUrl(session);
                        }
                        else {
                            console.log('Command still fails after ' + NUMBER_OF_RETRIES + ' retries');
                            session.sendCommandResponse(message);
                        }
                    }
                    else {
                        // send the error right away
                        session.sendCommandResponse(message);
                    }
                }
            }
        }
    });

}