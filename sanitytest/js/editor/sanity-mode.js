/// <reference path="sanity-language.js" />


(function sanityMode() {

    CodeMirror.defineMode("sanity", function () {

        var commands = sanityLanguage.commands;

        CodeMirror.defineMIME("text/x-sanity", {
            name: "sanity",
            commands: commands,
        });

        return {
            token: function (stream) {

                ////////// SKIP WHITESPACES
                while (stream.eatSpace()); // { return "space"; }

                ////////// COMMENTS //////////
                if (stream.match(/\s*\/\/.*/)) {
                    stream.skipToEnd();
                    return "comment";
                }

                ////////// STRINGS //////////
                if (stream.match(/"[^"]*"\s*/)) {
                    return "string";
                }
                if (stream.match(/'[^']*'\s*/)) {
                    return "string";
                }

                ////////// NUMBERS //////////
                if (stream.match(/(^|\s+?)(\d+)(\s+?|$)/)) {
                    return "number"; 
                }

                ////////// COMMANDS //////////
                for (var i in commands) {
                    var regex = new RegExp(commands[i].name + "(\\s+|$)");
                    if (stream.match(regex)) {
                        if (commands[i].snippet)
                            return "snippet";
                        else
                            return "keyword";
                    }
                }
     
                ////////// CHECKED/UNCHECKED //////////
                if (stream.match(/(^|\s+?)(checked|unchecked)(\s+?|$)/))
                    return "keyword";

                ////////// -> OPERATOR //////////
                if (stream.match(/\s*->\s*/))
                    return "operator";

                // jquery syntax $(blah blah)
                if (stream.match(/\$\(/))
                    return "text";

                ////////// set operand (e.g. First name in set First name -> "hamid") //////////
                if (stream.match(/(.*(?=->))/))
                    return "text";

                stream.skipToEnd();
                return "text";
            }
        };
    });
})();