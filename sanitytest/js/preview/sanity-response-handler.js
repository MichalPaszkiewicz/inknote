(function sanityResponseHandler() {

    var sanityResponseTextBoxType = "hidden";

    if (window === window.top) {

        if ($('#sanityBeforeUnload').length == 0)
            $("body").prepend("<input type='" + sanityResponseTextBoxType + "' id='sanityBeforeUnload' />");

        if ($('#sanityUnload').length == 0)
            $("body").prepend("<input type='" + sanityResponseTextBoxType + "' id='sanityUnload' />");

        if ($('#sanityPostBack').length == 0)
            $("body").prepend("<input type='" + sanityResponseTextBoxType + "' id='sanityPostBack' />");

        if ($('#sanityModal').length == 0)
            $("body").prepend("<input type='" + sanityResponseTextBoxType + "' id='sanityModal' />");

        if ($('#sanityAutocomplete').length == 0)
            $("body").prepend("<input type='" + sanityResponseTextBoxType + "' id='sanityAutocomplete' />");

        if ($('#sanityAlert').length == 0)
            $("body").prepend("<input type='" + sanityResponseTextBoxType + "' id='sanityAlert' />");

        if ($('#sanityError').length == 0)
            $("body").prepend("<input type='" + sanityResponseTextBoxType + "' id='sanityError' />");

        window.clearResponses = function () {
            $("#sanityBeforeUnload").val("");
            $("#sanityUnload").val("");
            $("#sanityModal").val("");
            $('#sanityPostBack').val("");
            $('#sanityAutocomplete').val("");
            $('#sanityError').val("");
        };

        window.sendDelayedResponse = function (command, result, milliseconds) {

            setTimeout(function () {

                var unloadValue = $("#sanityUnload").val();
                var beforeUnloadValue = $("#sanityBeforeUnload").val();
                var postBackValue = $("#sanityPostBack").val();
                var modalValue = $("#sanityModal").val();
                var autocompleteValue = $("#sanityAutocomplete").val();

                window.clearResponses();

                // ?
                if (!unloadValue && beforeUnloadValue && !postBackValue && !modalValue) { return; }

                // buttons inside updatepanel
                if (!unloadValue && beforeUnloadValue && postBackValue && !modalValue) { return; }

                //
                if (autocompleteValue == 'autocomplete') { setupAutocompleteInterval(result, command); return; }

                //
                if (postBackValue == 'postback autocomplete') { setupAutocompleteInterval(result, command); return; }

                // a failed validation (?) a close modal in an update panel (?)
                if (!unloadValue && !beforeUnloadValue && !modalValue && postBackValue && postBackValue != "postback ajax") { return; }

                // open modal should exit as modal form load will signal sanity.
                if (modalValue == "open modal") { return; }

                // open modal should exit as modal form load will signal sanity.
                if (modalValue == "close modal") { setupCloseModalInterval(result, command); return; }

                // close modal refresh parent should exit as refresh parent will signal sanity.
                if (modalValue == "close modal refresh parent") { return; }

                // no need to wait for page refresh, send the response right away
      
                result.resolve(new sanityResponse(command).generateSuccess());

            }, milliseconds);
        }
    }

    function setupAutocompleteInterval(result, command) {

        var interval = setInterval(function () {

            var autocompleteValue = $("#sanityAutocomplete").val();

            if (autocompleteValue.length > 0) {
                clearInterval(interval);
                $("#sanityAutocomplete").val("");

                if (autocompleteValue == "success") {
                    result.resolve(new sanityResponse(command).generateSuccess());
                }
                else {
                    result.resolve(new sanityResponse(command).generateFailure(autocompleteValue));
                }
            }

        }, 10);
    }

    function setupCloseModalInterval(result, command) {

        var retries = 0;
        var interval = setTimeout(function () {

            if (retries == 5) {
                clearInterval(interval);
                result.resolve(new sanityResponse(command).generateFailure("Unable to close modal."));
                return;
            }

            var $modalIframe = $(window.top).find("div#defaultModal iframe");

            if ($modalIframe.length == 0) {
                clearInterval(interval);
                result.resolve(new sanityResponse(command).generateSuccess());
            }

            retries++;

        }, 500);
    }

    function postBackHandler() {

        injectAndRunJavaScript(__doPostBackToInject.toString());

        function __doPostBackToInject() {

            window.original__doPostBack = window.__doPostBack;
            window.__doPostBack = function (target, arguments) {
                if (Sys && Sys.WebForms && Sys.WebForms.PageRequestManager) {
                    Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(function () {
                        $(window.top.document.body).find('#sanityPostBack').val('postback ajax');
                    });
                }
                if (typeof Page_ClientValidate === 'function') {
                    if (true || window.Page_ClientValidate('')) {
                        $(window.top.document.body).find('#sanityPostBack').val('postback');
                    }
                    else {
                        return;
                    }
                }
                return window.original__doPostBack(target, arguments);
            };

            window.originalWebForm_OnSubmit = window.WebForm_OnSubmit;
            window.WebForm_OnSubmit = function () {
                if (typeof Page_ClientValidate === 'function') {
                    if (true || window.Page_ClientValidate('')) {
                        $(window.top.document.body).find('#sanityPostBack').val('postback');
                    }
                    else {
                        return;
                    }
                }
                return window.originalWebForm_OnSubmit();
            };

            window.originalWebForm_DoPostBackWithOptions = window.WebForm_DoPostBackWithOptions;
            window.WebForm_DoPostBackWithOptions = function (target, arguments) {
                if (typeof Page_ClientValidate === 'function') {
                    if (true || window.Page_ClientValidate(''))
                        $(window.top.document.body).find('#sanityPostBack').val('postback');
                    else
                        return;
                }

                return window.originalWebForm_DoPostBackWithOptions(target, arguments);
            };
        }
    }

    function unloadHandler() {

        injectAndRunJavaScript(unloadHandlersToInject.toString());

        function unloadHandlersToInject() {

            window.addEventListener('unload', function () {
                if (typeof jQuery !== 'undefined') {
                    jQuery(window.top.document.body).find('#sanityUnload').val('unload');
                }
            });

            window.addEventListener('beforeunload', function () {
                if (typeof jQuery !== 'undefined') {
                    jQuery(window.top.document.body).find('#sanityBeforeUnload').val('beforeunload');
                }
            });
        }
    }

    function modalHandler() {

        injectAndRunJavaScript(modalHandlerToInject.toString());

        function modalHandlerToInject() {
            window.originalOpenModal = window.OpenModal;
            window.OpenModal = function (url, openEffect, width, height) {
                if ($(window.top.document.body).find('#sanityModal').val() == '') {
                    $(window.top.document.body).find('#sanityModal').val('open modal');
                }
                originalOpenModal(url, openEffect, width, height);
            };

            window.originalCloseModal = window.CloseModal;
            window.CloseModal = function (refreshParent, closeEffect) {
                if ($(window.top.document.body).find('#sanityModal').val() == '') {
                    $(window.top.document.body).find('#sanityModal').val('close modal' + (refreshParent ? ' refresh parent' : ''));
                }
                originalCloseModal(refreshParent, closeEffect);
            };
        }
    }

    function alertHander() {
        injectAndRunJavaScript(alertHandlerToInject.toString());

        function alertHandlerToInject() {
            if (alert.toString().indexOf('[native code]') > -1) {
                $(window.top.document.body).find('#sanityAlert').val('alert is native');
            }
        }
    }

    function pageLoadHandler() {
        // avoid sending message if the current frame is not in the same domain as the parent frame.
        window.top.clearResponses();

        if (window.isMain() || window.isModal()) {
            if ($("h1:contains('Server Error in '/' Application.')").length == 1) {

                // undecorated error message is in the comments
                var errorDetails = extractComments();

                chrome.runtime.sendMessage((new sanityResponse("window load ('click' or 'go to' command)")).generateFailure("Server Error in '/' Application.", errorDetails));
            }
            else {
                chrome.runtime.sendMessage((new sanityResponse("window load ('click' or 'go to' command)")).generateSuccess());
            }
        }
    }

    function submitButtonsHandler() {
        // to cover for ASP.NET bug (buttons and image buttons inside UpdatePanels)
        injectAndRunJavaScript(submitButtonHandlerToInject.toString());

        function submitButtonHandlerToInject() {
            if (typeof jQuery !== 'undefined') {
                jQuery('form').on('submit', function () {
                    jQuery(window.top.document.body).find('#sanityPostBack').val('postback');
                });
            } else {
                console.log('sanity: no jquery');
            }
        }
    }

    window.addEventListener('load', function () {
        postBackHandler();
        submitButtonsHandler();
        unloadHandler();
        modalHandler();
        alertHander();

        // this must be last
        pageLoadHandler();
    });

})();