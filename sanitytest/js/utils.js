
function getDistance(point1, point2) {
    return Math.sqrt(
        Math.pow(point1.left - point2.left, 2) +
        Math.pow(point1.top - point2.top, 2)
    );
}

function distanceSorter(item1, item2) {
    return item1.distance - item2.distance;
}

function textSorter(a, b) {
    if (a.text > b.text) return 1;
    if (a.text < b.text) return -1;
    return 0;
}

function occuranceSorter(a, b, occurance) {
    if (a.text.indexOf(occurance) > b.text.indexOf(occurance)) return 1;
    if (a.text.indexOf(occurance) < b.text.indexOf(occurance)) return -1;
    return textSorter(a, b);
}

function textComparer(a, b) {
    return a.text == b.text;
}

function SanityGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    return guid();
}

function extractComments() {
    return $("body")
                .contents()
                .filter(function () { return this.nodeType == 8; })
                .map(function () { return this.textContent })
                .toArray()
                .join();
}

function injectAndRunJavaScript(func) {
    var script = document.createElement('script');
    script.textContent = "(" + func + ")();";
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}


function injectAndRunJavaScriptInTryCatch(code) {
    var script = document.createElement('script');
    script.textContent = "(function() {"
    + "try {"
    + code
    + "}"
    + "catch(err){"
    + "$('#sanityError').val(err);"
    + "}"
    + "})();";
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}


String.prototype.containsAll = function (text) {
    var words = text.trim().split(" ");
    for (var i = 0; i < words.length; i++) {
        if (words[i].trim().length == 0)
            continue;
        if (this.indexOf(words[i]) == -1)
            return false;
    }
    return true;
}

String.prototype.containsAny = function (text) {
    var words = text.trim().split(" ");
    for (var i = 0; i < words.length; i++) {
        if (words[i].trim().length == 0)
            continue;
        if (this.indexOf(words[i]) >= 0)
            return true;
    }
    return false;
}

String.prototype.removeQuotes = function () {
    return this.trim().replace(/^"/, "").replace(/"$/, "").replace(/^'/, "").replace(/'$/, "");
}

Array.prototype.union = function (otherArray, equalityComparer) {

    var result = [];

    for (var i = 0; i < this.length; i++) {
        var itemToAdd = this[i];
        var duplicatedItem = false;
        for (var j = 0; j < otherArray.length; j++) {
            var itemToCompare = otherArray[j];
            if (equalityComparer(itemToAdd, itemToCompare)) {
                duplicatedItem = true;
                break;
            }
        }

        if (!duplicatedItem) {
            result.push(itemToAdd);
        }
    }

    for (var i = 0; i < otherArray.length; i++) {
        var itemToAdd = otherArray[i];
        var duplicatedItem = false;
        for (var j = 0; j < result.length; j++) {
            var itemToCompare = result[j];
            if (equalityComparer(itemToAdd, itemToCompare)) {
                duplicatedItem = true;
                break;
            }
        }

        if (!duplicatedItem) {
            result.push(itemToAdd);
        }
    }

    return result;
}

Window.prototype.isMain = function () {
    return this === this.top;
};

Window.prototype.isModal = function () {

    return !this.isMain() && this.frameElement != null && $(this.frameElement).closest("div.defaultModal").length > 0;

    //if (typeof jQuery !== 'undefined') {
    //    return jQuery(this.frameElement).closest("div.defaultModal").length > 0;
    //}

    //console.log('sanity: jQuery not found. Cannot determine if isModal');
    //return false;
};

Window.prototype.hasModal = function () {

    if (!this.isMain())
        return false;

    return $(this.document).find("div.defaultModal iframe").length > 0;
};

Window.prototype.isTDD = function () {
    return $('a').filter(function (i, a) { return (a.href || "").toLowerCase().indexOf("web.test.command=restart") != -1; }).length != 0;
    //return $("a:contains(Restart Temp Database)").length != 0;
};

$.fn.getSelector = function () {
    var el = this[0];
    if (!el.tagName) {
        return '';
    }

    // If we have an ID, we're done; that uniquely identifies this element
    var el$ = $(el);
    var id = el$.attr('id');
    if (id) {
        return '#' + id;
    }

    var classNames = el$.attr('class');
    var classSelector;
    if (classNames) {
        classSelector = '.' + $.trim(classNames).replace(/\s/gi, '.');
    }

    var selector;
    var parent$ = el$.parent();
    var siblings$ = parent$.children();
    var needParent = false;
    if (classSelector && siblings$.filter(classSelector).length == 1) {
        // Classes are unique among siblings; use that
        selector = classSelector;
    } else if (siblings$.filter(el.tagName).length == 1) {
        // Tag name is unique among siblings; use that
        selector = el.tagName;
    } else {
        // Default to saying "nth child"
        selector = ':nth(' + $(this).index() + ')';
        needParent = true;
    }

    // Bypass ancestors that don't matter
    if (!needParent) {
        for (ancestor$ = parent$.parent() ;
             ancestor$.length == 1 && ancestor$.find(selector).length == 1;
             parent$ = ancestor$, ancestor$ = ancestor$.parent());
        if (ancestor$.length == 0) {
            return selector;
        }
    }

    return parent$.getSelector() + ' > ' + selector;
};

function CalculateScrriptHash(lines) {

    function SHA1(s) { function U(a, b, c) { while (0 < c--) a.push(b) } function L(a, b) { return (a << b) | (a >>> (32 - b)) } function P(a, b, c) { return a ^ b ^ c } function A(a, b) { var c = (b & 0xFFFF) + (a & 0xFFFF), d = (b >>> 16) + (a >>> 16) + (c >>> 16); return ((d & 0xFFFF) << 16) | (c & 0xFFFF) } var B = "0123456789abcdef"; return (function (a) { var c = [], d = a.length * 4, e; for (var i = 0; i < d; i++) { e = a[i >> 2] >> ((3 - (i % 4)) * 8); c.push(B.charAt((e >> 4) & 0xF) + B.charAt(e & 0xF)) } return c.join('') }((function (a, b) { var c, d, e, f, g, h = a.length, v = 0x67452301, w = 0xefcdab89, x = 0x98badcfe, y = 0x10325476, z = 0xc3d2e1f0, M = []; U(M, 0x5a827999, 20); U(M, 0x6ed9eba1, 20); U(M, 0x8f1bbcdc, 20); U(M, 0xca62c1d6, 20); a[b >> 5] |= 0x80 << (24 - (b % 32)); a[(((b + 65) >> 9) << 4) + 15] = b; for (var i = 0; i < h; i += 16) { c = v; d = w; e = x; f = y; g = z; for (var j = 0, O = []; j < 80; j++) { O[j] = j < 16 ? a[j + i] : L(O[j - 3] ^ O[j - 8] ^ O[j - 14] ^ O[j - 16], 1); var k = (function (a, b, c, d, e) { var f = (e & 0xFFFF) + (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF), g = (e >>> 16) + (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (f >>> 16); return ((g & 0xFFFF) << 16) | (f & 0xFFFF) })(j < 20 ? (function (t, a, b) { return (t & a) ^ (~t & b) }(d, e, f)) : j < 40 ? P(d, e, f) : j < 60 ? (function (t, a, b) { return (t & a) ^ (t & b) ^ (a & b) }(d, e, f)) : P(d, e, f), g, M[j], O[j], L(c, 5)); g = f; f = e; e = L(d, 30); d = c; c = k } v = A(v, c); w = A(w, d); x = A(x, e); y = A(y, f); z = A(z, g) } return [v, w, x, y, z] }((function (t) { var a = [], b = 255, c = t.length * 8; for (var i = 0; i < c; i += 8) { a[i >> 5] |= (t.charCodeAt(i / 8) & b) << (24 - (i % 32)) } return a }(s)).slice(), s.length * 8)))) }

    return SHA1(lines
        .map(function (line) { return line.trim(); })
        .filter(function (line) { return line.length > 0 && line.indexOf("//") != 0; })
        .join('\n'));
}