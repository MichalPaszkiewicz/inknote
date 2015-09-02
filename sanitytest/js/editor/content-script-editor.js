/// <reference path="sanity-language.js" />
/// <reference path="utils.js" />

(function sanityEditor() {

    var lastMessage = { hints: [], url: "" };

    function getSnippets() {
        var snippetText = document.getElementById("txtSnippets").value.replace(/[\n\r]/g, "");
        var json = [];
        try {
            json = JSON.parse(snippetText || "[]");
        }
        catch (err) {
            alert("Unable to parse snippets JSON. " + err.message);
        }

        // prepare hashes to be used later with restore command
        for (var i = 0; i < json.length; i++) {
            json[i].scriptHash = CalculateScrriptHash(json[i].Value);
        }

        return json;
    }

    function updateTextAreaValue() {
        txtSanityEditor.value = codeMirror.getValue();
    }

    function sendScriptToBackground(startPreview) {
        var isExecutable = $("#runSanity").val();
        if (isExecutable && isExecutable.toLocaleLowerCase() == 'true') {

            var baseUrl = document.getElementById("txtBaseUrl").value;
            var fullText = codeMirror.getValue();
            var script = fullText.split("\n");
            var cursorIndex = codeMirror.getCursor().line;

            var isScriptFullyIncluded = cursorIndex == script.length - 1;

            var scriptHash = null;
            if (isScriptFullyIncluded) {
                // PERFORMANCE: only calculate the hash when necessary (that is when we are covering the whole script 
                //  and we want to create snapshot)
                scriptHash = CalculateScrriptHash(script);
            }

            chrome.runtime.sendMessage({
                from: "editor-tab",
                snippets: getSnippets(),
                baseUrl: baseUrl,
                projectId: queryString(window.top, "id"),
                script: script,
                cursorIndex: cursorIndex,
                startPreview: startPreview,
                isScriptFullyIncluded: isScriptFullyIncluded,
                scriptHash: scriptHash
            });
        }
    }

    function addExtraEmptyLine() {
        var scriptArray = codeMirror.getValue().split("\n");
        if (scriptArray[scriptArray.length - 1].trim() != "")
            codeMirror.setValue(codeMirror.getValue() + "\r\n");
    }

    function setCursorToEnd() {
        codeMirror.setCursor(codeMirror.getValue().split("\n").length + 1);
    }

    function runInPreviewWindow() {
        sendScriptToBackground(true);
    }

    function queryString(frame, qs) {
        if (!qs) return frame.location.search.replace("?", "");
        qs = qs.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + qs + "=([^&#]*)", "i"),
        results = regex.exec(frame.location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    if (txtSanityEditor) {
        var codeMirror = CodeMirror.fromTextArea(txtSanityEditor, {
            mode: "sanity",
            theme: "eclipse",
            lineNumbers: true,
            styleActiveLine: true,
            viewportMargin: Infinity,
            gutters: ["CodeMirror-linenumbers", "step-status"],
            extraKeys: { "Ctrl-Space": function (cm) { /* DO NOT REMOVE THIS EMPTY FUNCTION! THIS MAKES CTRL-SPACE WORK WITHOUT ADDING SPACE CHAR TO THE EDITOR */ } }
        });

        chrome.runtime.onMessage.addListener(function (message, sender) {

            txtHints.value = JSON.stringify(message);
            if ("restart" in message && message.restart) {
                codeMirror.clearGutter("step-status");
                txtHints.value = "";
                txtMessage.value = "";
            }
            else if ("preview" in message && message.preview) {
                lastMessage = message;
            }
            else if ("indicator" in message) {
                codeMirror.setGutterMarker(message.indicator, "step-status", createMarker("running"));
            }
            else if ("result" in message) {
                txtResult.value = JSON.stringify(message);
            }
            else if ("success" in message) {
                if (message.skipped) {
                    if (message.nextLineIndexToRun == -1 || message.nextLineIndexToRun != message.lineIndex)
                        codeMirror.setGutterMarker(message.lineIndex, "step-status", createMarker("skipped"));
                    txtMessage.value = "";
                }
                else if (message.restored) {
                    if (message.nextLineIndexToRun == -1 || message.nextLineIndexToRun != message.lineIndex)
                        codeMirror.setGutterMarker(message.lineIndex, "step-status", createMarker("restored"));
                    txtMessage.value = "";
                }
                else if (message.success) {
                    if (message.nextLineIndexToRun == -1 || message.nextLineIndexToRun != message.lineIndex)
                        codeMirror.setGutterMarker(message.lineIndex, "step-status", createMarker("succeeded"));
                    txtMessage.value = "";
                }
                else {
                    codeMirror.setGutterMarker(message.lineIndex, "step-status", createMarker("failed"));
                    if (message.lineIndex >= 0)
                        var error = "Failed. Line " + (message.lineIndex + 1) + ": ";
                    else
                        var error = "Failed. ";
                    error += message.message;
                    txtMessage.value = error;
                    console.error(error);
                    var jsonMessage = {
                        result: false,
                        line: message.lineIndex + 1,
                        text: message.message
                    };
                    txtResult.value = JSON.stringify(jsonMessage);
                }

                if ("url" in message) {
                    if (message.url !== lastMessage.url)
                        if (txtUrls)
                            txtUrls.value += message.url + "\r\n";
                }

                lastMessage = message;
            }

            function createMarker(type) {
                var marker = document.createElement("div");
                marker.className = "marker " + type;
                return marker;
            }
        });

        addExtraEmptyLine();
        setCursorToEnd();

        // dashboard sends this value to indicate that test should be started immediately
        var runMode = queryString(window.top, "runMode") === "true";
        if (runMode) {
            sendScriptToBackground(runMode);
        }

        function sendToDownload(filename, text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', filename);
            pom.click();
        }

        $("<a id='btnDownloadDebugInfo' href='#'>DOWNLOAD DEBUG INFO</a>")
            .insertBefore("[id$='btnSave']")
            .click(function () {
                var testRef = $("h2").find("b")[0].innerText;
                sendToDownload(testRef + ".txt",
                    codeMirror.getValue() +
                    "\r\n//---------------------------------------- snippets\r\n" +
                    $("#txtSnippets").val());
            });

        $("#btnRun").click(runInPreviewWindow);

        codeMirror.on("keyup", function (cm, key) {

            if (key.ctrlKey && key.which != 32) // any Ctrl+[key] other than Ctrl+Space must be ignored
                return;

            var ignore = [
                8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45,
                46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145,
            ];
            if (ignore.indexOf(key.which) > -1)
                return;

            CodeMirror.showHint(cm, getHints, lastMessage);

            function getHints(cm, options) {
                options.completeSingle = false;

                var cursor = cm.getCursor();
                var token = cm.getTokenAt(cursor);
                var previousToken = cm.getTokenAt({ line: cursor.line, ch: token.start });
                var initialToken = cm.getTokenAt({ line: cursor.line, ch: previousToken.start });
                var completions = { from: -1, to: -1, list: [] };

                if ((!token.type || token.type == "text") && token.start == 0) {
                    completions = lineStartCompletions();
                }
                else if (token.type == "snippet" && /.*\s+$/.test(token.string)) {
                    completions = snippetValueCompletions();
                }
                else if (token.type == "text" && previousToken.type == "snippet") {
                    completions = snippetValueCompletionsFiltered();
                }
                else if (token.type == "keyword" && /.*\s+$/.test(token.string)) {
                    completions = objectCompletions();
                }
                else if ((token.type == "text" || token.type == "string" || token.type == "number") && previousToken.type == "keyword") {
                    completions = objectCompletionsFiltered();
                }
                else if (token.type == "operator" && token.string.trim() == "->" && previousToken.type == "text") {
                    completions = memberCompletions();
                }
                else if (token.type == "text" && previousToken.type == "operator" && previousToken.string.trim() == "->") {
                    completions = memberCompletionsFiltered();
                }
                else if (token.type == "text" && (previousToken.type == "string" || previousToken.type == "number") && initialToken.type == "keyword") {
                    completions = contextualCommandCompletionsFiltered();
                }

                // click in click Hi 
                // go to in go to "home.aspx"
                function lineStartCompletions() {
                    var hints = [];
                    for (var i in sanityLanguage.commands) {
                        var command = sanityLanguage.commands[i];
                        if (command.name != token.string.trim().toLowerCase() && command.name.containsAll(token.string.trim().toLowerCase())) {
                            hints.push({
                                text: command.name + command.append,
                                displayText: command.name
                            });
                        }
                    }

                    smartSort(hints);

                    return {
                        list: hints,
                        from: CodeMirror.Pos(cursor.line, token.start),
                        to: CodeMirror.Pos(cursor.line, token.end)
                    };
                }

                // SysAdmin in login as SysAdmin
                function snippetValueCompletions() {
                    var hints = getSnippets().filter(function (item) {
                        return item.Key.indexOf(token.string.trim()) == 0;
                    })
                    .map(function (item) {
                        var value = (new RegExp(token.string.trim() + "\\s+(.*)")).exec(item.Key);
                        return {
                            text: value[1],
                        };
                    });

                    hints.sort(textSorter);

                    return {
                        list: hints,
                        from: CodeMirror.Pos(cursor.line, token.end),
                        to: CodeMirror.Pos(cursor.line, token.end)
                    };
                }

                // SysAdm in login as SysAdm...
                function snippetValueCompletionsFiltered() {
                    var snippet = previousToken.string.trim();

                    var hints = getSnippets()
                       .filter(function (item) {
                           if (item.Key.indexOf(snippet) != 0)
                               return false;
                           var value = (new RegExp(snippet + "\\s+(.*)")).exec(item.Key);
                           if (!value)
                               return false;
                           return value[1].toLowerCase().containsAll(token.string.trim().toLowerCase());
                       })
                       .map(function (item) {
                           var value = (new RegExp(snippet + "\\s+(.*)")).exec(item.Key);
                           return {
                               text: value[1],
                           };
                       });

                    hints.sort(textSorter);

                    return {
                        list: hints,
                        from: CodeMirror.Pos(cursor.line, token.start),
                        to: CodeMirror.Pos(cursor.line, token.end)
                    };
                }

                // Username in set Username
                function objectCompletions() {
                    var hints = [];
                    var command = token.string.trim();
                    if (command in lastMessage.hints) {
                        hints = lastMessage.hints[command]
                            .map(function (item) {
                                var additionalText = "";
                                if (command == "set") {
                                    additionalText = " ->"
                                    if (item.options.length == 0)
                                        additionalText += " \"text\"";
                                }

                                return {
                                    text: item.text + additionalText,
                                    displayText: item.text
                                }
                            });
                    }

                    return {
                        list: hints,
                        from: CodeMirror.Pos(cursor.line, token.end),
                        to: CodeMirror.Pos(cursor.line, token.end)
                    };
                }

                // Userna in set Userna...
                // click in near "Orders" click
                function objectCompletionsFiltered() {
                    var hints = [], from = -1, to = -1;
                    var command = previousToken.string.trim();
                    if (command in lastMessage.hints) {
                        hints = lastMessage.hints[command]
                            .filter(function (item) {
                                return item.text.toLowerCase().containsAll(token.string.trim().toLowerCase());
                            })
                            .map(function (item) {
                                var additionalText = "";
                                if (command == "set") {
                                    additionalText = " ->"
                                    if (item.options.length == 0)
                                        additionalText += " \"text\"";
                                }
                                return {
                                    text: item.text + additionalText,
                                    displayText: item.text
                                }
                            });

                        from = CodeMirror.Pos(cursor.line, token.start);
                        to = CodeMirror.Pos(cursor.line, token.end);
                    }
                    else if (sanityLanguage.commands[previousToken.string.trim()]) {
                        if (sanityLanguage.commands[previousToken.string.trim()].recursive) {
                            if (cursor.ch == token.end && token.string.slice(-1) == " ") {

                                for (var i in sanityLanguage.commands) {
                                    var command = sanityLanguage.commands[i];
                                    if (!command.targeting)
                                        continue;
                                    hints.push({
                                        text: command.name + command.append,
                                        displayText: command.name
                                    });
                                }

                                smartSort(hints);

                                from = CodeMirror.Pos(cursor.line, token.end);
                                to = CodeMirror.Pos(cursor.line, token.end);
                            }
                        }
                    }

                    return {
                        list: hints,
                        from: from,
                        to: to
                    };
                }

                // checked in set Is Active -> checked
                // Submitted in set Status -> Submitted
                function memberCompletions() {
                    var hints = [], from = -1, to = -1;
                    var label = previousToken.string.trim();
                    for (var i = 0; i < lastMessage.hints["set"].length; i++) {
                        if (lastMessage.hints["set"][i].text == label) {
                            hints = lastMessage.hints["set"][i].options
                                .map(function (item) {
                                    return {
                                        text: item,
                                        displayText: item
                                    };
                                });
                            from = CodeMirror.Pos(cursor.line, token.end);
                            to = CodeMirror.Pos(cursor.line, token.end);
                            break;
                        }
                    }
                    return {
                        list: hints,
                        from: from,
                        to: to
                    };
                }

                // chec in set Is Active -> chec...
                // Submi in set Status -> Submi...
                function memberCompletionsFiltered() {
                    var hints = [], from = -1, to = -1;
                    var label = cm.getTokenAt({ line: cursor.line, ch: previousToken.start }).string.trim();
                    for (var i = 0; i < lastMessage.hints["set"].length; i++) {
                        if (lastMessage.hints["set"][i].text == label) {
                            hints = lastMessage.hints["set"][i].options
                                .filter(function (item) {
                                    return item.toLowerCase().containsAll(token.string.trim().toLowerCase());
                                })
                                .map(function (item) {
                                    return {
                                        text: item,
                                        displayText: item
                                    };
                                });
                            from = CodeMirror.Pos(cursor.line, token.start);
                            to = CodeMirror.Pos(cursor.line, token.end);
                            break;
                        }
                    }
                    return {
                        list: hints,
                        from: from,
                        to: to
                    };
                }

                // cli in near "Orders" cli...
                function contextualCommandCompletionsFiltered() {
                    var hints = [], from = -1, to = -1;
                    var command = sanityLanguage.commands[initialToken.string.trim()];
                    if (command && command.recursive) {

                        for (var i in sanityLanguage.commands) {
                            var command = sanityLanguage.commands[i];
                            if (!command.targeting)
                                continue;
                            if (!command.name.containsAll(token.string.trim().toLowerCase()))
                                continue;

                            hints.push({
                                text: command.name + command.append,
                                displayText: command.name
                            });
                        }

                        smartSort(hints);

                        from = CodeMirror.Pos(cursor.line, token.start);
                        to = CodeMirror.Pos(cursor.line, token.end);
                    }
                    return {
                        list: hints,
                        from: from,
                        to: to
                    };
                }

                function smartSort(hints) {
                    hints.sort(function (a, b) {
                        if (!token.string.trim())
                            return textSorter(a, b);
                        else {
                            var search = token.string.trim().split(" ")[0];
                            return occuranceSorter(a, b, search);
                        }
                    });
                }

                CodeMirror.on(completions, "pick", function (completion) {
                    var placeholders = ["\"text\"", "\"url\"", "\"name@mail.com\"", "14:30", sanityLanguage.today(), "0.5", "\"/\"", "alert('Hello');"];

                    for (var i = 0; i < placeholders.length; i++) {
                        if (completion.text.indexOf(placeholders[i]) >= 0) {
                            var cursor = codeMirror.getCursor();
                            var line = codeMirror.getLine(cursor.line);
                            var quotation = /^".+"$/.test(placeholders[i]) ? 1 : 0;
                            codeMirror.setSelection(
                                { line: cursor.line, ch: line.lastIndexOf(placeholders[i]) + quotation },
                                { line: cursor.line, ch: line.lastIndexOf(placeholders[i]) + placeholders[i].length - quotation });

                            break;
                        }
                    }
                });

                return completions;
            }
        });

        codeMirror.on('cursorActivity', function () {
            updateTextAreaValue();
            sendScriptToBackground(false);
        });
    }


})();