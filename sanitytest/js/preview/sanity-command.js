/// <reference path="sanity-language.js" />
/// <reference path="utils.js" />
/// <reference path="@jquery.js" />
/// <reference path="sanity-response.js" />
/// <reference path="configurations.js" />

function sanityCommand(line) {

    function executeLogOut(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        chrome.runtime.sendMessage({ from: "preview-tab", logOut: true }, function (loggedOut) {
            if (loggedOut)
                result.resolve((new sanityResponse(command)).generateSuccess());
            else
                result.reject((new sanityResponse(command)).generateFailure("Unable to log out"));
        });
    }

    function executeGoTo(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        var url = /go to\s+(.+)/.exec(command);
        if (url)
            window.location.href = url[1];
        else
            result.reject((new sanityResponse(command)).generateFailure("Invalid 'go to' command. Usage: go to \"url\""));
    }

    function executeRefreshPage(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        window.location.reload(true);
    }

    function executeSwitchWindow(command, result, preview, switchValue) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        chrome.runtime.sendMessage({ from: "preview-tab", switchWindow: switchValue }, function (switched) {
            if (switched)
                result.resolve((new sanityResponse(command)).generateSuccess());
            else
                result.reject((new sanityResponse(command)).generateFailure("Window does not exist"));
        });
    }

    function executeWait(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        var milliSeconds;
        var seconds = /wait\s+(\d+\.*\d*)s\s*$/.exec(command);
        if (seconds)
            milliSeconds = parseFloat(seconds[1]) * 1000;
        else {
            result.reject((new sanityResponse(command)).generateFailure("Invalid 'wait' command. Usage: wait [number]s"));
            return;
        }

        console.log('waiting', milliSeconds);

        window.top.setTimeout(function () {
            result.resolve((new sanityResponse(command)).generateSuccess());

            console.log('waiting finished', milliSeconds);

        }, milliSeconds);
    }

    function executeAssumeDateTime(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        var commandElements = /assume\s+(date|time)\s+(.+)/.exec(command);
        if (!commandElements) {
            result.reject((new sanityResponse(command)).generateFailure("Invalid 'assume date|time' command. Usage: assume date|time [16-06-2014|14:30]"));
            return;
        }

        var request = "/?Web.Test.Command=setLocalDate&" + commandElements[1] + "=" + commandElements[2];
        $.ajax(request)
            .done(function (jqxhr) {
                result.resolve((new sanityResponse(command)).generateSuccess());
            }).fail(function (error) {
                result.reject((new sanityResponse(command)).generateFailure("Invalid 'assume date|time' command. Usage: assume date|time [16-06-2014|14:30]"));
            });
    };

    function executeExpectUrl(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        var expectElements = /expect url\s+(.+)/.exec(command);

        if (!expectElements) {
            result.reject((new sanityResponse(command)).generateFailure("Invalid 'expect url' command. Usage: expect url \"url\""));
            return;
        }

        var expectedUrl = expectElements[1].removeQuotes();

        if (window.location.pathname.toLowerCase().indexOf(expectedUrl.toLowerCase()) >= 0)
            result.resolve((new sanityResponse(command)).generateSuccess());
        else
            result.reject((new sanityResponse(command)).generateFailure("Incorrect expected url '" + expectedUrl + "'"));
    }

    function executeCheckMailbox(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        var email = /check mailbox\s+(.+)/.exec(command);
        if (email)
            window.top.location.href = "/?Web.Test.Command=testEmail&to=" + email[1].removeQuotes() + "&ReturnUrl=" + encodeURIComponent(window.top.location.pathname) + window.top.location.search;
            //injectCode("OpenModal('/?Web.Test.Command=testEmail&to=" + email[1].removeQuotes() + "');");
        else
            result.reject((new sanityResponse(command)).generateFailure("Invalid 'check mailbox' command. Usage: check mailbox \"name@mail.com\""));
    }

    function executeSearch(command, result, $context, operator, preview) {
        var commandElements = /(near|above|below|at)\s+(header\s+|button\s+|field\s+|row\s+)?(".+?"|\d+)\s*(.*)?/.exec(command);

        if (!commandElements) {
            if (preview)
                result.resolve((new sanityResponse(command)).generatePreview());
            else
                result.reject((new sanityResponse(command)).generateFailure("Invalid search command. Usage: near|above|below|at row \"text\""));
            return;
        }

        var commandExecusionOperator = commandElements[1];

        var useBelowAsColumnSelector = $context && $context.is("tr") && commandElements[1] == "below";

        if (useBelowAsColumnSelector) {
            var $oldContext = $context;
            $context = $context.parents('table');
        }

        var element = new sanityFinder($context).findElement(commandElements[3], commandElements[2], operator);

        if (preview) {
            if (commandElements[3].removeQuotes().length > 0)
                element.forEach(function (item) { item.$element.highlight("context"); });
            if (element.length == 0 || element.length > 1 || !commandElements[4]) {
                result.resolve((new sanityResponse(command)).generatePreview());
                return;
            }
        }
        else {
            if (element.length == 0) {
                result.reject((new sanityResponse(command)).generateFailure("No " + (commandElements[2] || "element").trim() + " was found matching '" + commandElements[3].removeQuotes() + "'"));
                return;
            }
            else if (element.length > 1) {
                result.reject((new sanityResponse(command)).generateFailure("More than one " + (commandElements[2] || "element").trim() + " was found matching '" + commandElements[3].removeQuotes() + "'"));
                return
            }

            if (!commandElements[4]) {
                result.reject((new sanityResponse(command)).generateFailure("Invalid '" + commandExecusionOperator + "' command. Usage: " + commandExecusionOperator + " \"text\""));
                return;
            }
        }

        var $commandExecusionContext = element[0].$element;

        if (useBelowAsColumnSelector) {
            var $th = $commandExecusionContext;
            $commandExecusionContext = $oldContext.find('td:nth-child(' + ($th.index() + 1) + ')');
            // the interpretation of 'below' is changed now
            commandExecusionOperator = 'at';
        }

        for (var i in sanityLanguage.commands) {
            var command = sanityLanguage.commands[i];
            if (command.recursive && commandElements[4].indexOf(command.name) == 0) {
                executeSearch(commandElements[4], result, $commandExecusionContext, commandExecusionOperator, preview);
                return;
            }
        }

        if (commandElements[4].indexOf("click") == 0) executeClick(commandElements[4], result, $commandExecusionContext, commandExecusionOperator, preview);
        else if (commandElements[4].indexOf("set") == 0) executeSet(commandElements[4], result, $commandExecusionContext, commandExecusionOperator, preview);
        else if (commandElements[4].indexOf("expect") == 0) executeExpect(commandElements[4], result, $commandExecusionContext, commandExecusionOperator, preview);
        else if (preview)
            result.resolve((new sanityResponse(command)).generatePreview());
        else
            result.reject((new sanityResponse(command)).generateFailure("Invalid '" + commandExecusionOperator + "' command. Usage: " + commandExecusionOperator + " \"text\" click|set|expect"));
    }

    function executeClick(command, result, $context, operator, preview) {
        var buttonText = /click\s+(.+)/.exec(command);

        if (!buttonText) {
            if (preview)
                result.resolve((new sanityResponse(command)).generatePreview($context, operator));
            else
                result.reject((new sanityResponse(command)).generateFailure("Invalid 'click' command. Usage: click [button/menu]"));
            return;
        }

        if (/\".*\"/.exec(buttonText[1]))
            var button = new sanityFinder($context).findElement(buttonText[1], "any", operator);
        else
            var button = new sanityFinder($context).findElement(buttonText[1].removeQuotes(), "button", operator);

        if (preview) {
            if (buttonText[1].removeQuotes().length > 0) // to not select all the elements on the screen!
                button.forEach(function (item) { item.$element.highlight("element"); });
            result.resolve((new sanityResponse(command)).generatePreview($context, operator));
            return;
        }

        if (button.length == 0) {
            result.reject((new sanityResponse(command)).generateFailure("No button was found matching '" + buttonText[1] + "'"));
            return;
        }
        else if (button.length > 1) {
            result.reject((new sanityResponse(command)).generateFailure("More than one button/menu item was found matching '" + buttonText[1] + "'"));
            return;
        }

        window.top.sendDelayedResponse(command, result, line.RESPONSE_DELAY);
        button[0].$element[0].click();
    }

    function executeSet(command, result, $context, operator, preview) {
        var commandElements = /set\s+(.+?)\s*->\s*(.*)/.exec(command);

        if (!commandElements) {
            if (preview)
                result.resolve((new sanityResponse(command)).generatePreview($context, operator));
            else
                result.reject((new sanityResponse(command)).generateFailure("Invalid 'set' command. Usage: set [field name] -> [value]"));
            return;
        }

        var control = new sanityFinder($context).findElement(commandElements[1], "field", operator);

        if (preview) {
            control.forEach(function (item) { item.$element.closest(".item").addBack().first().highlight("element"); });
            result.resolve((new sanityResponse(command)).generatePreview($context, operator));
            return;
        }

        if (control.length == 0) {
            result.reject((new sanityResponse(command)).generateFailure("No field was found matching '" + commandElements[1] + "'"));
            return;
        }
        else if (control.length > 1) {
            result.reject((new sanityResponse(command)).generateFailure("More than one field was found matching '" + commandElements[1] + "'"));
            return;
        }

        var $control = control[0].$element;
        var done = false;
        if ($control.is("input[type=text], input[type=hidden], input[type=password], input[type=email], input[type=number], input[type=search], input[type=tel], input[type=date], input[type=datetime], input[type=url], input[type=range]") || $control.is("textarea")) {
            done = setTextBoxValue();
        }
        else if ($control.is("select")) {
            done = setDropDownListValue();
        }
        else if ($control.is("input[type=checkbox]")) {
            done = setCheckBoxValue(line);
        }
        else if ($control.is("input[type=file]")) {
            done = setFileUploadValue();
        }
        else if ($control.is("table")) {
            done = setRadioButtonValue();
        }
        else if ($control.is("input[type=radio]")) {
            done = setHorizontalRadioButtonValue();
        }
        else {
            console.error('Unknown control type for set:', $control);
        }

        if (done) {
            var selector = $control.getSelector();
            //injectCode("$('" + selector + "').trigger('focus').trigger('keydown').trigger('keypress').trigger('change');");
            injectCode("$('" + selector + "').trigger('change');");

            console.log('done, sending delayed response');
            window.top.sendDelayedResponse(command, result, line.RESPONSE_DELAY);
        } else {
            console.log('not done!');
        }

        function setTextBoxValue() {
            var text = commandElements[2].trim().replace(/^\"/, "").replace(/\"$/, "");
            if ($control.is("textarea") && $control.is(":hidden") && $control.parent().find("iframe").length > 0) { // control is CKEditor
                $control.parent().find("iframe").contents().find("body").html(text);
            }
            else {  // normal text box
                $control.val(text);
            }

            // set watermarked textbox value if applicable
            var setWatermarkedTextboxValue = "if (Sys && Sys.Extended && Sys.Extended.UI) { ";
            setWatermarkedTextboxValue += "var wrapper = Sys.Extended.UI.TextBoxWrapper.get_Wrapper($('#" + $control.attr("id") + "')[0]);";
            setWatermarkedTextboxValue += "if(wrapper && wrapper._watermark) wrapper.set_Value('" + text.replace("'", "\\'") + "');"
            setWatermarkedTextboxValue += "}"

            injectCode(setWatermarkedTextboxValue);

            // control is autocomplete:
            if ($control.parent().is("span.AutoComplete")) {

                var isAutopostBack = ($control.attr('AutoPostBack') == 'true');

                injectCode("$('#sanityAutocomplete').val('autocomplete');");

                if (isAutopostBack) {
                    injectCode("$('#sanityPostBack').val('postback autocomplete');");
                }

                var setAutoCompleteTextboxValue = "if (typeof AutoCompleteControl.version === 'undefined') { console.error('This version of Autocomplete does not support callback in open(). Expect sanity issues.'); }"

                // here assumption is if the item is not found in the list, it is a failure
                // also item text must be an exact match with itemtext attribute value

                setAutoCompleteTextboxValue += "$('#" + $control.attr("id") + "').parent().autoComplete().open(function() { \
console.log('inside autoComplete open');\
var item = this.itemsPanel.find('.item[itemtext=\"" + text + "\"]');\
var isAutoPostBack = this.textbox.attr('AutoPostBack') == 'true';\
console.log('item', item);\
console.log('isAutoPostBack', isAutoPostBack);\
if (item.length>0) { \
    item.click();\
console.log('clicked');\
    if (!isAutoPostBack) { $('#sanityAutocomplete').val('success'); }\
} else { \
    $('#sanityAutocomplete').val('Cannot find ["+ text.replace("'", "\\'") + "] in autocomplete options');\
} \
});";

                injectCode(setAutoCompleteTextboxValue);
            }

            return true;
        }

        function setDropDownListValue() {
            var $option = $control.find("option").filter(function () { return $(this).text() == commandElements[2].trim(); });
            if ($option.length == 0) {
                result.reject((new sanityResponse(command)).generateFailure("Option '" + commandElements[2] + "' not found for field '" + commandElements[1] + "'"));
                return false;
            }
            else {
                $control.val($option.val());
                return true;
            }
        }

        function setCheckBoxValue(line) {

            var isMultiselectDropdown = $control.parents('.input').find('.multiselect-dropdown').length == 1;

            if (commandElements[2] != "checked" && commandElements[2] != "unchecked") {
                result.reject((new sanityResponse(command)).generateFailure("Invalid value for field '" + commandElements[1] + "'"));
                return false;
            }

            var checked = commandElements[2] == "checked";
            if ($control.is(':checked') && !checked)
                $control.click();
            else if (!$control.is(':checked') && checked)
                $control.click();

            if (isMultiselectDropdown) {
                var multiselectDropdownTextBox = $control.parents('.input').find('.text-box');

                var isAutopostBack = multiselectDropdownTextBox.attr('autopostback') == 'true';
                if (!isAutopostBack)
                    return true;

                // adjust amount of time to wait before sending success delay
                var hideDelay = parseInt(multiselectDropdownTextBox.attr('hidedelay'));
                line.RESPONSE_DELAY = hideDelay;

                // call hide once to trigger auto-postback
                var targetControlId = multiselectDropdownTextBox.attr('controlid');
                injectCode("multiselectAgent.HideItems($('.text-box[controlid=" + targetControlId + "]'));");
            }

            return true;
        }

        function setRadioButtonValue() {
            if ($control.find("input[type=radio]").length > 0) {
                var $label = $control.find("label").filter(function () { return $(this).text() == commandElements[2]; });
                if ($label.length == 0) {
                    result.reject((new sanityResponse(command)).generateFailure("Option '" + commandElements[2] + "' not found for field '" + commandElements[1] + "'"));
                    return false;
                }
                else {
                    $label.click();
                    return true;
                }
            }
        }

        function setHorizontalRadioButtonValue() {

            var $label = $control.siblings();

            if ($label.length == 0) {
                result.reject((new sanityResponse(command)).generateFailure("Option '" + commandElements[2] + "' not found for field '" + commandElements[1] + "'"));
                return false;
            }
            else {
                $label.click();
                return true;
            }
        }

        function setFileUploadValue() {
            var projectId = line.projectId;
            var fileUploadName = $control.attr("name");
            var fileName = commandElements[2].trim().replace(/^\"/, "").replace(/\"$/, "");
            var requiredValidatorId = $control.nextAll("span[id*=_rqv]").attr("id");
            var customValidatorId = $control.nextAll("span[id*=_csv]").attr("id");

            var contentUrl = "https://dashboard.geeksltd.co.uk/@Services/SanityTestFile.ashx?project=" + projectId + "&file=" + encodeURIComponent(fileName);
            var $injectedName = $("<input type='hidden' name='" + fileUploadName + "_InjectedFileName' />").appendTo($control.parent());
            var $injectedContent = $("<input type='hidden' name='" + fileUploadName + "_InjectedContents' />").appendTo($control.parent());

            $injectedName.val(fileName);

            var fileUploadDone = false;

            $.ajax({
                url: contentUrl,
                async: false,
                success: function (content) {

                    if (content.indexOf("There is no file named") > -1) {
                        fileUploadDone = false;
                        result.reject((new sanityResponse(command)).generateFailure(content));
                    }
                    else {
                        fileUploadDone = true;
                        $injectedContent.val(content);
                        if (requiredValidatorId) injectCode("ValidatorEnable($('#" + requiredValidatorId + "')[0], false);");
                        if (customValidatorId) injectCode("ValidatorEnable($('#" + customValidatorId + "')[0], false);");
                    }
                },
                error: function () {
                    fileUploadDone = false;
                    result.reject((new sanityResponse(command)).generateFailure("Unable to set file upload value for '" + commandElements[1] + "'"));
                }
            });

            return fileUploadDone;
        }
    }

    function executeExpect(command, result, $context, operator, preview) {

        var commandElements = /expect\s+(no\s+)?(header\s+|button\s+|field\s+|row\s+)?(".+?")/.exec(command);

        if (!commandElements) {
            if (preview)
                result.resolve((new sanityResponse(command)).generatePreview($context, operator));
            else
                result.reject((new sanityResponse(command)).generateFailure("Invalid 'expect' command. Usage: expect (no) (header|button) \"text\""));
            return;
        }

        var element = new sanityFinder($context).findElement(commandElements[3], commandElements[2], operator);
        var expectedText = commandElements[3].removeQuotes();
        if (expectedText.trim().length > 0) // to not select all the elements on the screen!
            element.forEach(function (item) { item.$element.highlight("expect"); });

        if (preview) {
            result.resolve((new sanityResponse(command)).generatePreview());
            return;
        }

        commandElements[1] = (commandElements[1] || "").trim();

        if (commandElements[1] == "") {
            if (element.length == 0) {
                result.reject((new sanityResponse(command)).generateFailure("Expected " + (commandElements[2] || "text").trim() + " '" + expectedText + "' not found"));
            }
        }
        else if (commandElements[1] == "no") {
            if (element.length > 0) {
                result.reject((new sanityResponse(command)).generateFailure("Unexpected " + (commandElements[2] || "text").trim() + " '" + expectedText + "' found"));
            }
        }
        result.resolve((new sanityResponse(command)).generateSuccess());
    }

    function executeJavaScript(command, result, preview) {
        if (preview) {
            result.resolve(new sanityResponse(command).generatePreview());
            return;
        }

        var commandElements = /javascript:\s+(.+)/.exec(command);
        if (!commandElements) {
            result.reject((new sanityResponse(command)).generateFailure("Invalid 'javascript:' command. Usage: javascript: alert('Hello');"));
            return;
        }

        injectAndRunJavaScriptInTryCatch(commandElements[1]);

        setTimeout(function () {
            if ($("#sanityError").val() === "") {
                result.resolve((new sanityResponse(command)).generateSuccess());
            }
            else {
                result.reject((new sanityResponse(command)).generateFailure("Error in running javascript code: " + $("#sanityError").val()));
            }
        }, 100);
    }

    function injectCode(code) {
        var script = document.createElement('script');
        script.textContent = code;
        (document.head || document.documentElement).appendChild(script);
        script.parentNode.removeChild(script);
    }

    function removeHighlight() {
        if (newHighlightingImplementation) {
            $(".sanity-element-highlighted").remove();
            $(".sanity-context-highlighted").remove();
            $(".sanity-expect-highlighted").remove();
        }
        else {   // OLD IMPLEMENTATION BELOW
            $("*").removeClass("sanity-element-highlighted");
            $("*").removeClass("sanity-context-highlighted");
            $("*").removeClass("sanity-expect-highlighted");
        }
    }

    var newHighlightingImplementation = false;

    $.fn.highlight = function (what) {
        return this.each(function () {

            if (newHighlightingImplementation) {
                $("<div/>")
                    .addClass("sanity-" + what + "-highlighted")
                    .css("position", "absolute")
                    .css("top", $(this).offset().top)
                    .css("left", $(this).offset().left)
                    .css("width", $(this).outerWidth())
                    .css("height", $(this).outerHeight())
                    .appendTo("body");
            }
            else { // OLD IMPLEMENTATION BELOW
                if ($(this).css("display") == "inline" && $(this).width() == 0 && $(this).height() == 0)
                    $(this).css("display", "inline-block");
                $(this).addClass("sanity-" + what + "-highlighted");
            }
        });
    };

    this.run = function (timeout) {

        var result = $.Deferred();

        // check and exit if the target website is NOT in TDD mode, otherwise sanity script will modify the data in a live enviroment!
        if (!window.isTDD()) {

            // in case it is due to an error, undecorated error message is in the comments
            if ($("h1:contains('Server Error in '/' Application.')").length == 1) {
                var errorDetails = extractComments();
            }

            result.reject(new sanityResponse().generateFailure("Unable to run the script. The target test website is not in TDD mode.", errorDetails));
            return result.promise();
        }

        //if ($(window.top.document.body).find('#sanityAlert').val() == "alert is native") {
        //    result.reject(new sanityResponse().generateFailure("Unable to run the script. 'alert' function is native. Use alertify or a similar library.", //errorDetails));
        //    return result.promise();
        //}

        removeHighlight();

        var command = line.execute || line.preview;
        var preview = !!line.preview; // execute or preview?

        console.log('command;preview', command, preview);

        if (command.indexOf("skip") == 0) result.resolve(new sanityResponse().generateSkip());
        else if (command.indexOf("restored") == 0) result.resolve(new sanityResponse().generateRestored());
        else if (command.indexOf("logout") == 0) executeLogOut(command, result, preview);
        else if (command.indexOf("go to") == 0) executeGoTo(command, result, preview);
        else if (command.indexOf("wait") == 0) executeWait(command, result, preview);
        else if (command.indexOf("check mailbox") == 0) executeCheckMailbox(command, result, preview);
        else if (command.indexOf("refresh page") == 0) executeRefreshPage(command, result, preview);
        else if (command.indexOf("switch to new window") == 0) executeSwitchWindow(command, result, preview, 1);
        else if (command.indexOf("return to previous window") == 0) executeSwitchWindow(command, result, preview, -1);
        else if (command.indexOf("assume date") == 0) executeAssumeDateTime(command, result, preview);
        else if (command.indexOf("assume time") == 0) executeAssumeDateTime(command, result, preview);
        else if (command.indexOf("click") == 0) executeClick(command, result, undefined, undefined, preview);
        else if (command.indexOf("set") == 0) executeSet(command, result, undefined, undefined, preview);

        else if (command.indexOf("near") == 0 ||
                 command.indexOf("above") == 0 ||
                 command.indexOf("below") == 0 ||
                 command.indexOf("at row") == 0) {
            executeSearch(command, result, undefined, undefined, preview);
        }

        else if (command.indexOf("expect url") == 0) executeExpectUrl(command, result, preview);
        else if (command.indexOf("expect") == 0) executeExpect(command, result, undefined, undefined, preview);
        else if (command.indexOf("javascript:") == 0) executeJavaScript(command, result, preview);

            // continue processing 
        else if (preview) result.resolve((new sanityResponse(command)).generatePreview());
        else
            result.reject((new sanityResponse(command)).generateFailure("Unrecognised command: " + command));

        if (result.state() == "pending") { // not resolved or rejected yet

            if (command.indexOf("wait") != 0) {
                setTimeout(function () {
                    console.error('Sanity: timeout on ' + command);
                    //result.reject((new sanityResponse(command)).generateFailure("Timeout: " + command));

                }, timeout);
            }

        }

        return result.promise();
    };
}

