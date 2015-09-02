/// <reference path="configurations.js" />
/// <reference path="sanitySession.js" />
/// <reference path="utils.js" />

(function sanityBackground() {

    var SANITY_ENABLED = function () {
        var storageItem = localStorage.getItem("isEnabled") || "true";
        return localStorage.getItem("isEnabled") == "true";
    }

    function shouldRetry(message) {
        if (NUMBER_OF_RETRIES == 0)
            return false;

        if (typeof message.details === 'undefined')
            return false;

        return message.details.indexOf('The login failed. Login failed for user ') > 0;
    }

    function reloadBaseUrl(session) {

        chrome.tabs.get(session.previewTabIds[session.currentPreviewTabIndex], function (tab) {
            if (tab) {
                console.log('reloading url to retry ', session.baseUrl);
                chrome.tabs.update(tab.id, { url: session.baseUrl, active: true });
                // this causes pageLoadHandler() to send a fail/success message
            }
            else {
                console.error('tab is closed, cannot reload');
            }
        });

    }

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

        if (!SANITY_ENABLED()) {
            return;
        }

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

    chrome.downloads.onCreated.addListener(function (downloadItem) {
        console.log('sanity: file download detected:', downloadItem);
        var session = sanitySession.findByUrl(downloadItem.url);
        if (session) {
            chrome.tabs.sendMessage(session.previewTabIds[session.currentPreviewTabIndex], { fileDownloaded: "file downloaded" });
        } else {
            console.error('sanity: Cannot find any session to report file download');
            console.log('downloadItem url:', downloadItem.url);
            for (var i = 0; i < sanitySession.sessions.length; i++) {
                console.log('sanity session ' + i + ' baseUrl:', sanitySession.sessions[i].baseUrl);
            }
        }
    });

})();