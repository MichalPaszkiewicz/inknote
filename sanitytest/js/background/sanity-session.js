/// <reference path="configurations.js" />
/// <reference path="utils.js" />

function sanitySession(editorTabId, previewTabId, session) {
    this.currentLine = -1;
    this.previousScript = [];
    this.previewTabIds = [];
    this.projectId = session.projectId;
    this.previewTabIds.push(previewTabId);
    this.currentPreviewTabIndex = 0;
    this.editorTabId = editorTabId;
    this.retry = NUMBER_OF_RETRIES;

    this.start(session);
}

sanitySession.prototype.start = function (session) {

    this.retry = NUMBER_OF_RETRIES;
    this.baseUrl = session.baseUrl.replace(/\/$/, "");
    this.previewLine = session.script[session.cursorIndex].trim();
    this.cursorIndex = session.cursorIndex;
    this.projectId = session.projectId;
    this.hasReachedEnd = false;
    this.isScriptFullyIncluded = session.isScriptFullyIncluded
    this.scriptHash = session.scriptHash;
    this.startPreview = session.startPreview;

    console.log('session started. cursorIndex:' + this.cursorIndex);

    var lines = session.script
        .map(function (line, index) {
            return { lineIndex: index, command: line.trim() };
        })
        .filter(function (item) {
            return (item.command && item.command.indexOf("//") != 0 && item.lineIndex <= session.cursorIndex - 1);
        });

    this.sanityScript = [];
    var addedSnippets = [];
    for (var i = 0; i < lines.length; i++) {
        this.sanityScript = this.sanityScript.concat(getExecutableLines(lines[i], addedSnippets));
    }

    var isScriptChanged = hasScriptBeenChanged(this.previousScript, this.sanityScript);
    var isLineAdded = hasALineBeenAddedToScript(this.previousScript, this.sanityScript);

    var isLastResponseSucess = this.lastResponse && this.lastResponse.success
    var isOnNextLineAfterLastSuccess = isLastResponseSucess && this.lastResponse.lineIndex == session.cursorIndex - 1;
    var isOnSecondLineAfterLastSuccess = isLastResponseSucess && this.lastResponse.lineIndex == session.cursorIndex - 2;

    if (session.startPreview) {
        this.previousScript = this.sanityScript;
        this.currentPreviewTabIndex = 0;
        this.currentLine = -1;
        this.restartEditorTab();
        return true;
    }

    if (isOnNextLineAfterLastSuccess) {
        this.previewCommand();
        return;
    }

    if (isLineAdded && isOnSecondLineAfterLastSuccess) {
        this.previousScript = this.sanityScript;
        this.currentLine = this.lastResponse.currentlineNumber;
        this.executeNextCommand();
        return;
    }

    if (isLastResponseSucess) {

        if (session.cursorIndex > this.lastResponse.lineIndex) {
            // cursor is after the last point: continue execution from the last success
            this.previousScript = this.sanityScript;
            this.currentLine = this.lastResponse.currentlineNumber;
            this.executeNextCommand();
            return;
        }
        else {
            // cursor is above last point: start over the execution
            this.previousScript = this.sanityScript;
            this.currentPreviewTabIndex = 0;
            this.currentLine = -1;
            this.restartEditorTab();
            return true;
        }
    }

    this.previewCommand();

    // this function recursively gets the executable lines of each snippet line
    function getExecutableLines(line, addedSnippets) {
        var lines = [];
        var command = line.command.replace(/\s/g, "");

        for (var i = 0; i < session.snippets.length; i++) {

            if (command == session.snippets[i].Key.replace(/\s/g, "")) {

                // run test should skip if the same test has already executed
                if (command.indexOf("runtest") == 0) {
                    if (addedSnippets.indexOf(command) >= 0) {
                        // add only once
                        console.log('already executed, ignored:' + command);
                        lines = lines.concat({ command: "skip", lineIndex: line.lineIndex });
                        return lines;
                    }
                    else {
                        addedSnippets.push(command);
                    }
                }

                if (command.indexOf("do:") == 0) {
                    line.command = "javascript: " + session.snippets[i].Value.join(' ');
                    return line;
                }

                for (var snippetLineIndex = 0; snippetLineIndex < session.snippets[i].Value.length; snippetLineIndex++) {
                    var snippetLine = session.snippets[i].Value[snippetLineIndex].trim();
                    if (snippetLine != "" && snippetLine.indexOf("//") != 0) {
                        lines = lines.concat(getExecutableLines({
                            command: snippetLine,
                            lineIndex: line.lineIndex,
                            // keep a stack of all groups
                            group: (line.group ? [line.group, session.snippets[i].scriptHash] : [session.snippets[i].scriptHash]).join()
                        }, addedSnippets));
                    }
                }

                return lines;
            }
        }

        return line;
    }

    function hasScriptBeenChanged(oldScript, newScript) {
        if (oldScript.length != newScript.length)
            return true;

        for (var i = 0; i < oldScript.length; i++) {
            if (oldScript[i].command !== newScript[i].command) {
                return true;
            }
        }

        return false;
    }

    function hasALineBeenAddedToScript(oldScript, newScript) {

        // remove empty lines
        oldScript = oldScript.filter(function (item) { return item.command.length > 0 });
        newScript = newScript.filter(function (item) { return item.command.length > 0 });

        if (oldScript.length != newScript.length - 1)
            return false;

        return !hasScriptBeenChanged(oldScript, newScript.slice(0, -1));
    }
};

sanitySession.prototype.previewCommand = function () {
    if (this.previewLine) {
        chrome.tabs.sendMessage(this.previewTabIds[this.currentPreviewTabIndex], {
            preview: this.previewLine,
            projectId: this.projectId,
            baseUrl: this.baseUrl,
        });
    }
};

sanitySession.prototype.createSnapshot = function () {

    if (!this.isScriptFullyIncluded || 
        !this.startPreview) // prevent creation of snapshot with cursor activity on the last line
        return;

    console.log('Creating snapshot', this.scriptHash);

    var me = this;
    chrome.tabs.get(this.previewTabIds[this.currentPreviewTabIndex], function (tab) {


        // Problem: this triggers another call to executeNext (because of page load)

        chrome.tabs.update(tab.id, {
            url: me.baseUrl + "?web.test.command=snap&name=" + me.scriptHash + "&url=" + encodeURIComponent(tab.url),
            active: true
        });
    });
}

sanitySession.prototype.executeNextCommand = function () {

    var line = this.sanityScript[++this.currentLine];
    if (line && line.command) {

        this.checkSnapshot(line, function continueAfterSnapshotCheck(line) {

            console.log("Running line " + (line.lineIndex + 1) + (line.group ? " (" + line.group + ")" : "") + ": " + line.command);

            if (line.command.indexOf("go to ") == 0) {
                line.command = fixGoToWithBaseUrl(line.command, this.baseUrl);
            }

            chrome.tabs.sendMessage(this.editorTabId, { indicator: line.lineIndex });

            var guid = SanityGuid();

            chrome.tabs.sendMessage(this.previewTabIds[this.currentPreviewTabIndex], {
                execute: line.command,
                guid: guid,
                projectId: this.projectId,
                baseUrl: this.baseUrl,
                COMMAND_TIMEOUT: localStorage.getItem('timeout') || 15000,
                RESPONSE_DELAY: localStorage.getItem('responseDelay') || 25
            });
        });

    }
    else {
        if (this.isScriptFullyIncluded) {
            this.hasReachedEnd = true;
        }

        this.previewCommand();
        chrome.tabs.sendMessage(this.editorTabId, { result: true, line: this.cursorIndex, text: "End of script." });
        console.log("--- END OF SCRIPT ---");
        this.createSnapshot();
    }

    function fixGoToWithBaseUrl(command, baseUrl) {
        var url = /go to\s+(.+)/i.exec(command)[1];
        url = url.removeQuotes().replace(/^\//, "");
        return "go to " + baseUrl + "/" + url;
    }
};

sanitySession.prototype.checkSnapshot = function (line, continueCallback) {
    // all commands copied from "run test" have a group property (script hash of the test)
    if (line.group && this.currentLine == 0) {
        var session = this;
        var snapshot = line.group.split(',')[0];

        $.getJSON(this.baseUrl + '?Web.Test.Command=snapExists&name=' + snapshot)
            .error(function (err) { console.error('Cannot get information about snapshot', err); continueCallback.call(session, line); })
            .success(function (data) {
                console.log('snapExists', data);
                if (data === true) {
                    console.log('will restore snapshot ' + snapshot);

                    // replace the test with restore and skip the rest
                    line.command = session.sanityScript[0].command = 'go to /?Web.Test.Command=restore&name=' + snapshot;
                    var i = 1;
                    while (i < session.sanityScript.length && (session.sanityScript[i].group || '').split(',')[0] == snapshot) {
                        session.sanityScript[i].command = "restored";
                        i++;
                    }
                }

                continueCallback.call(session, line);
            });
    }
    else {
        continueCallback.call(this, line);
    }
}

sanitySession.prototype.retryCommand = function () {
    this.currentLine = Math.max(-1, this.currentLine - 1);
    console.log('Retrying line ' + (this.currentLine + 1));
    this.executeNextCommand();
};

sanitySession.prototype.sendCommandResponse = function (response) {

    response.lineIndex = -1;
    var currentline = this.sanityScript[this.currentLine];

    response.currentlineNumber = this.currentLine;
    if (currentline)
        response.lineIndex = currentline.lineIndex;

    response.nextLineIndexToRun = -1;
    var nextLine = this.sanityScript[this.currentLine + 1];
    if (nextLine) {
        response.nextLineIndexToRun = nextLine.lineIndex;
    }

    if (!("preview" in response))
        this.lastResponse = response;

    chrome.tabs.sendMessage(this.editorTabId, response);
};

sanitySession.prototype.restartEditorTab = function () {
    chrome.tabs.sendMessage(this.editorTabId, { restart: true });
};

// static findByTabId
sanitySession.findByTabId = function (tabId) {
    for (var i = 0; i < sanitySession.sessions.length; i++) {
        if ((sanitySession.sessions[i].editorTabId == tabId) || (sanitySession.sessions[i].previewTabIds.indexOf(tabId) != -1)) {
            return sanitySession.sessions[i];
        }
    }
};

// static findByUrl
sanitySession.findByUrl = function (url) {

    url = url.toLowerCase();
    for (var i = 0; i < sanitySession.sessions.length; i++) {
        if (url.indexOf(sanitySession.sessions[i].baseUrl.toLowerCase()) > -1) {
            return sanitySession.sessions[i];
        }
    }
};

// sessions in static variable
sanitySession.sessions = [];