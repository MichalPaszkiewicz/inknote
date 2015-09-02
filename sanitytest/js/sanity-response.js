/// <reference path="utils.js" />
/// <reference path="sanity-finder.js" />

// NOTE: this file is currently used only in preview, but when changed to ts, should be referenced on both sides.

function sanityResponse(command) {

    this.generatePreview = function ($context, operator) {
        return {
            from: "preview-tab",
            preview: true,
            command: command,
            hints: collectHints($context, operator)
        };
    };

    this.generateSuccess = function ($context, operator) {
        return {
            from: "preview-tab",
            success: true,
            message: "Passed.",
            command: command,
            url: window.location.pathname, // window can be null when modal form is closed.
            hints: collectHints($context, operator)
        };
    };

    this.generateFailure = function (error, details) {
        return {
            from: "preview-tab",
            success: false,
            message: error,
            details: details,
            command: command,
            url: window.location.pathname,
            hints: collectHints()
        };
    };

    this.generateSkip = function ($context, operator) {
        return {
            from: "preview-tab",
            skipped: true,
            success: true,
            message: "Skipped.",
            command: command,
            url: window.location.pathname,
            hints: collectHints($context, operator)
        };
    };

    this.generateRestored = function ($context, operator) {
        return {
            from: "preview-tab",
            restored: true,
            success: true,
            message: "Restored.",
            command: command,
            url: window.location.pathname, 
            hints: collectHints($context, operator)
        };
    };

    function collectHints($context, operator) {

        var fields = new sanityFinder($context).collectElements("field", operator, true);
        fields = fields.union(fields, textComparer); // remove duplications by text

        var buttons = new sanityFinder($context).collectElements("button", operator, true);
        buttons = buttons.union(buttons, textComparer); // remove duplications by text

        // remove Restart Temp Database if exists
        buttons = buttons.filter(function (item) { return item.text != "Restart Temp Database"; });

        var hints = {
            "set": fields,
            "click": buttons
        };

        return hints;
    }
}