/// <reference path="utils.js" />

function sanityFinder($context) {

    $context = $context || $("body");

    function clean(text) {

        if (text) {
            // autocomplete
            var endsWith$txt = /\$txt$/.test(text);
            if (endsWith$txt) {
                text = text.substr(0, text.length - 4);
            }

            if (text.trim())
                return text
                    .trim() // remove leading and trailing spaces and carriage returns
                    .replace(/[\n\r]/g, '') // remove any carriage returns (<br/>s) between words
                    .replace(/\s+/g, ' ') // replace multiple spaces with one.
                    .replace(/\s*:?$/, ""); // remove (:) from the end

            //return /\s*(.*[^:?$])\s*/.exec(text.trim())[1]; // trimstart, trimend & remove (:)
        }
        else
            return "";
    }

    function getFieldOptions($control) {
        var options = [];
        if ($control.is("input[type=checkbox], input[type=radio]")) {
            options = ["checked", "unchecked"];
        }
        else if ($control.is("select")) {
            options = $control.find("option")
                .map(function (index, item) { return $(item).text(); })
                .get();
        }
        else if ($control.is("table[id*=_lst]")) {
            options = $control.find("input[type=radio] ~ label, input[type=checkbox] ~ label")
                .map(function (index, item) { return item.textContent; })
                .get();
        }
        return options;
    }

    function getFieldText($field) {

        var text = "";
        var fieldId = $field.attr("id");
        var fieldName = $field.attr("name");
        if($field.is("input"))
            var fieldPlaceholder = $field.attr("placeholder");

        if (fieldId) {

            // support for Autocomplete control:
            var endsWith_txt = /_txt$/.test(fieldId);
            if (endsWith_txt) {
                // remove the ending _txt to allow fieldId point to the root SPAN
                fieldId = fieldId.substr(0, fieldId.length - 4);
            }

            var $label = $("label[for=" + fieldId + "]");
            if ($label.length == 1 && $label.text().trim()) {
                text = $label.clone().children().remove().end().text();

                // this is a special situation where the control is checkboxlist and the name of contol is the name of checkboxlist + name of checkbox
                var $checkboxList = $field.closest("table[id*=_lst]");

                if ($field.is("input[type=checkbox]") && $checkboxList.length == 1) {
                    text = getFieldText($checkboxList) + "." + text;
                }
            }
            else {
                $label = $field.closest(".item").find(".label").not(":has(label)"); // handling M# list search panels - They dont use <label>
                if ($label.length == 1 && $label.text().trim())
                    text = $label.clone().children().remove().end().text();
                else if (fieldPlaceholder) {
                    text = fieldPlaceholder;
                }
                else if (fieldName) {
                    var capturedName = /(?:(?:.*?)(?:\$txt|\$lst|\$ddl|\$dp|\$fu))?(.*)/.exec(fieldName);
                    if (capturedName && capturedName[1])
                        text = capturedName[1];
                }
                else {
                    var capturedId = /(?:(?:.*?)(?:_txt|_lst|_ddl|_dp|_fu))?(.*)/.exec(fieldId);
                    if (capturedId && capturedId[1]) {
                        text = capturedId[1];
                    }
                }
            }
        }
        else if (fieldPlaceholder) {
            text = fieldPlaceholder;
        }
        else if (fieldName) {
            var capturedName = /(?:(?:.*?)(?:\$txt|\$lst|\$ddl|\$dp|\$fu))?(.*)/.exec(fieldName);
            if (capturedName && capturedName[1])
                text = capturedName[1];
        }

        return clean(text);
    }

    function getButtonText($button) {

        var text = "";
        var buttonId = /(?:.*?)(?:_btn|_img)(.*?)(?:_|$)/.exec($button.attr("id") || "");
        buttonId = (buttonId && buttonId[1]) ? buttonId[1] : "";

        if ($button.is("a"))
            text = $button.text().trim() || $button.find("img").attr("alt") || $button.attr("title") || buttonId || $button.attr("name") || $button.attr("class") || "UNKNOWN 'A' LINK";
        else if ($button.is("button"))
            text = $button.text();
        else if ($button.is("input[type=submit], input[type=button]"))
            text = $button.val();
        else if ($button.is("input[type=image]"))
            text = $button.attr("alt") || $button.attr("title") || buttonId || $button.attr("class") || "UNKNOWN INPUT[TYPE=IMAGE]";
        return clean(text);
    }

    function getRowText($row) {
        return $row.text();
    }

    function getElementText($element) {
        var $refinedElement = $element.clone().children().remove().end();
        return ($refinedElement.text().trim() || $refinedElement.val() || "").toString();
    }

    function getText($element, type) {
        if (type == "button")
            return getButtonText($element);
        else if (type == "field")
            return getFieldText($element);
        else if (type == "row")
            return getRowText($element);
        else if (type == "header" || type == "any")
            return getElementText($element);
    }

    function getAllElements() {
        return $("*:visible");
    }

    function getAllHeaders() {
        return $("h1:visible")
            .add("h2:visible")
            .add("h3:visible")
            .add("h4:visible")
            .add("h5:visible")
            .add("h6:visible");
    }

    function getAllButtons() {
        var $buttons = $("a")
            .add("button")
            .add("input[type=submit]")
            .add("input[type=button]")
            .add("input[type=image]");

        return $buttons.filter(function () {      // custom filters
            if ($(this).is("a")) {
                if ($(this).is(":hidden") && $(this).find("img").is(":hidden"))
                    return false;
            }
            else if ($(this).is(":hidden")) // remove hidden buttons (except hidden image links <a><img></a> )
                return false;

            if ($(this).is("input[type=image]") && $(this).hasClass("calendar-icon"))
                return false;
            return true;
        });
    }

    function getAllFields() {
        var $fields = $("input[type=text]")
           .add("input[type=password]")
           .add("input[type=email]")
           .add("input[type=number]")
           .add("input[type=search]")
           .add("input[type=tel]")
           .add("input[type=date]")
           .add("input[type=time]")
           .add("input[type=datetime]")
           .add("input[type=week]")
           .add("input[type=month]")
           .add("input[type=url]")
           .add("input[type=range]")
           .add("input[type=color]")
           .add("input[type=file]")
           .add("textarea")
           .add("select")
           .add("input[type=radio]")    // individual radio buttons
           .add("input[type=checkbox]") // individual check boxes
           .add("table[id*=_lst]");     // checkbox list or radiobutton list

        var validFields = $fields
            .filter(":visible, .items-list input[type=checkbox]")    // only capture visible controls + Collapsible Check Box List checkboxes
            .filter(function () { return !$(this).is("input[type=radio]") || $(this).closest("table[id*=_lst]").length == 0; })  // filter radiobuttons which are part of a radiobuttonlist
            .filter(function () { return !$(this).is("table[id*=_lst]") || $(this).find("input[type=checkbox]").length == 0; })  // filter table (checkboxlist)
            .filter(function () { return !$(this).is('.multiselect-dropdown input[type=text].text-box'); }); // search box in collapsible checkbox list

        // CKE editor creates a span with id of cke_IdOfOriginalTextArea
        var ckeHiddenTextAreas = $fields
            .filter("textarea:hidden")
            .filter(function () { return $('#cke_' + $(this).attr('id') + ':visible').length > 0; });

        validFields = validFields.add(ckeHiddenTextAreas);

        return validFields;
    }

    function getAllRows() {
        return $rows = $("table tr:visible");
    }

    this.collectElements = function (type, operator, onlyHints) {

        type == (type || "any").trim();
        operator = (operator || "in").trim();

        var $elements;
        if (type.indexOf("any") == 0) $elements = getAllElements();
        else if (type.indexOf("header") == 0) $elements = getAllHeaders();
        else if (type.indexOf("button") == 0) $elements = getAllButtons();
        else if (type.indexOf("field") == 0) $elements = getAllFields();
        else if (type.indexOf("row") == 0) $elements = getAllRows();

        if (type.indexOf("+hidden") >= 0) $elements = $elements.add("input[type=hidden]");

        $elements = $elements.filter(function () {  // operator filterer
            if (operator == "in" || operator == "at") {
                return $context.find($(this)).length == 1;
            }
            else if (operator == "above") {
                return $(this).offset().top < $context.offset().top;
            }
            else if (operator == "below") {
                return $(this).offset().top > $context.offset().top;
            }

            return true;
        });

        var elements = $elements.map(function () {
            return {
                $element: onlyHints ? null : $(this),
                $context: onlyHints ? null : $context,
                text: getText($(this), type),
                options: type == "field" ? getFieldOptions($(this)) : [],
                distance: getDistance($context.offset(), $(this).offset())
            };
        }).get();

        if ($context && (operator == "in" || operator == "at") && elements.length == 0) {
            // Leaf elements: when $context is an element with some text in it but no other element (ex. TD) the previous methods
            // won't pick it so we add the $context as an element. This allows its text to be accessible
            elements.push({
                $element: onlyHints ? null : $context,
                $context: onlyHints ? null : $context,
                text: getText($context, type),
                options: type == "field" ? getFieldOptions($(this)) : [],
                distance: 0
            });
        }

        elements.sort(distanceSorter);

        return elements;
    };

    this.findElement = function (text, selector, operator) {
        var exactMatch = !(/\".*\"/.test(text)); // if text is inside "" then text search will use "contains" operator otherwise it will use exact match (==)
        var jq = /\$\(.*\)/.test(text)
        if (jq) text = text.replace(/^\$\(/, "").replace(/\)$/, "");
        text = text.removeQuotes();
        selector = (selector || "any").trim();
        operator = (operator || "in").trim();

        if (jq) selector += "+hidden";

        var elements = this.collectElements(selector, operator).filter(function (element) {

            // jquery selectors
            if (jq) {
                var found = false;
                try {
                    $(text).each(function () {
                        if ($(this)[0] === element.$element[0])
                            found = true;
                    });
                }
                catch (err) { /* jquery selector syntax error, ignore it */ }
                return found;
            }

            // non-jquery (sanity) 
            if (selector == "row") { // matches row index or contains text
                if (exactMatch && $.isNumeric(text)) {
                    var index = parseInt(text);

                    // handling header
                    if (index == 0) {
                        // only accept row index 0 if there is any TH in it
                        return element.$element.children("th").length != 0;
                    }

                    // do not accept other rows if they contain TH
                    if (element.$element.children("th").length > 0)
                        return false;

                    var rowIndex = element.$element.prevAll("tr").has("td").length + 1;
                    return rowIndex == parseInt(text);
                }
                else {
                    return element.text.toLowerCase().containsAll(text.toLowerCase());
                }
            }

            if (exactMatch) // exact text match
                return element.text == text.trim();
            else // contains text
                return element.text.toLowerCase().containsAll(text.toLowerCase());
        });

        if (operator == "near" && elements.length > 1)
            elements = elements.slice(0, 1);

        return elements;
    };
};